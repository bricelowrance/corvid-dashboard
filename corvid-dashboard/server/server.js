const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const app = express();

app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

const secretKey = process.env.JWT_SECRET;

app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        const userQuery = await pool.query("SELECT * FROM financial_data.users WHERE username = $1", [username]);
        if (userQuery.rows.length === 0) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        const user = userQuery.rows[0];

        if (password !== user.password) {
            return res.status(401).json({ error: "Invalid username or password" });
        }

        const token = jwt.sign(
            { id: user.id, username: user.username, first_name: user.first_name, last_name: user.last_name },
            secretKey,
            { expiresIn: "1h" }
        );

        res.json({
            message: "Login successful",
            token,
            user: { first_name: user.first_name, last_name: user.last_name },
        });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: "An error occurred during login. Please try again later." });
    }
});

app.get("/data", async (req, res) => {
    try {
        const { year, category, entity } = req.query;

        let query = `
            SELECT * 
            FROM financial_data.income_data
            WHERE 1=1
        `;
        const values = [];
        let index = 1;

        if (year) {
            query += ` AND year = $${index++}`;
            values.push(year);
        }
        if (category) {
            query += ` AND category = $${index++}`;
            values.push(category);
        }
        if (entity) {
            query += ` AND entity = $${index++}`;
            values.push(entity);
        }

        const result = await pool.query(query, values);
        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching data:", err.message);
        res.status(500).send("Server Error");
    }
});

app.get("/income", async (req, res) => {
    try {
        const { entity } = req.query;

        let query = `
            SELECT category, period, SUM(amount) AS amount
            FROM financial_data.consolidated_income
        `;
        const values = [];

        if (entity && entity !== "Consolidated") {
            query += ` WHERE entity = $1`;
            values.push(entity);
        }

        query += ` GROUP BY category, period ORDER BY category, period`;

        const result = await pool.query(query, values);

        const incomeData = result.rows.map(({ category, period, amount }) => ({
            category,
            period,
            amount: parseFloat(amount),
        }));

        res.json(incomeData);
    } catch (err) {
        console.error("Error fetching consolidated income data:", err.message);
        res.status(500).send("Server Error");
    }
});

app.get("/balance", async (req, res) => {
    try {
        const { entity } = req.query;

        let query = `
            SELECT category, period, SUM(amount) AS amount
            FROM financial_data.consolidated_balance
        `;
        const values = [];

        if (entity && entity !== "Consolidated") {
            query += ` WHERE entity = $1`;
            values.push(entity);
        }

        query += ` GROUP BY category, period ORDER BY category, period`;

        const result = await pool.query(query, values);

        const incomeData = result.rows.map(({ category, period, amount }) => ({
            category,
            period,
            amount: parseFloat(amount),
        }));

        res.json(incomeData);
    } catch (err) {
        console.error("Error fetching consolidated balance data:", err.message);
        res.status(500).send("Server Error");
    }
});

app.get("/net_income", async (req, res) => {
    try {
        const { entity, period } = req.query;

        console.log("Fetching Net Income with params:", { entity, period });

        let query = `
            SELECT period, SUM(amount) AS amount
            FROM financial_data.consolidated_income
            WHERE UPPER(category) = 'NET INCOME'
        `;
        const values = [];

        if (entity && entity !== "Consolidated") {
            query += ` AND entity = $1`;
            values.push(entity);
        }

        if (period) {
            query += ` AND period = $${values.length + 1}`;
            values.push(period);
        }

        query += ` GROUP BY period ORDER BY period`;

        console.log("Constructed Query:", query);
        console.log("Query Values:", values);

        const result = await pool.query(query, values);

        console.log("Query Result:", result.rows);

        res.json(result.rows.map(({ period, amount }) => ({
            period,
            amount: parseFloat(amount),
        })));
    } catch (err) {
        console.error("Error fetching Net Income data:", err.message);
        res.status(500).json({ error: err.message });
    }
});

app.get("/financial-summary", async (req, res) => {
    try {
        const { year, period, entity } = req.query;

        if (!year || !period || !entity) {
            return res.status(400).json({ error: "Year, period, and entity are required parameters" });
        }

        const query = `
            SELECT category, subcategory, SUM(amount) AS total_amount
            FROM financial_data.balance_sheets
            WHERE year = $1 AND period = $2 AND entity = $3
            GROUP BY category, subcategory
            ORDER BY category, subcategory
        `;
        const values = [year, period, entity];

        const result = await pool.query(query, values);
        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching financial summary:", err.message);
        res.status(500).json({ error: "Server error" });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
