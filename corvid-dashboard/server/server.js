const express = require("express");
const { Pool } = require("pg");
const cors = require("cors");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();
const corsOptions = {
    origin: ["https://finance.corvidtec.com"],
    credentials: true
};
app.use(cors(corsOptions));


app.use(express.json());

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

const secretKey = process.env.JWT_SECRET;

app.post("/api/login", async (req, res) => {
    const { username, password } = req.body;

    try {
        console.log(`Login attempt: ${username}`);

        const userQuery = await pool.query("SELECT * FROM financial_data.users WHERE username = $1", [username]);

        if (userQuery.rows.length === 0) {
            console.log("User not found.");
            return res.status(401).json({ error: "Invalid username or password" });
        }

        const user = userQuery.rows[0];
        console.log(`User found: ${user.username}, Stored Password: ${user.password}`);

        if (password !== user.password) {
            console.log("Password does not match.");
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

app.post("/api/logout", (req, res) => {
    res.json({ message: "Logged out successfully" });
});

app.get("/api/data", async (req, res) => {
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

app.get("/api/income", async (req, res) => {
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

app.get("/api/balance", async (req, res) => {
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

app.get("/api/net_income", async (req, res) => {
    try {
        const { entity, period } = req.query;
        if (!period) {
            return res.status(400).json({ error: "Period is required" });
        }

        const parsedPeriod = parseInt(period); 
        console.log("Fetching Net Income for:", { entity, period: parsedPeriod });

        const values = [parsedPeriod, parsedPeriod - 1]; 
        let query = `
            SELECT period, SUM(amount) AS amount
            FROM financial_data.consolidated_income
            WHERE UPPER(category) = 'NET INCOME'
              AND period IN ($1, $2)
        `;

        if (entity && entity !== "Consolidated") {
            query += ` AND entity = $3`;
            values.push(entity);
        }

        query += ` GROUP BY period ORDER BY period`;

        console.log("Executing Query:", query);
        console.log("Query Values:", values);

        const result = await pool.query(query, values);
        console.log("Query Result:", result.rows);

        let netIncomeData = { current: 0, previous: 0 };

        result.rows.forEach(({ period, amount }) => {
            if (parseInt(period) === parsedPeriod) {
                netIncomeData.current = parseFloat(amount);
            } else if (parseInt(period) === parsedPeriod - 1) {
                netIncomeData.previous = parseFloat(amount);
            }
        });

        console.log("Final Net Income Data:", netIncomeData);
        res.json(netIncomeData);
    } catch (err) {
        console.error("Error fetching Net Income data:", err.message);
        res.status(500).json({ error: err.message });
    }
});

app.get("/api/financial-summary", async (req, res) => {
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

app.get("/api/income-summary", async (req, res) => {
    try {
        const { year, period, entity } = req.query;

        if (!year || !period || !entity) {
            return res.status(400).json({ error: "Year, period, and entity are required parameters" });
        }

        const query = `
            SELECT category, subcategory, SUM(amount) AS total_amount
            FROM financial_data.income_statements
            WHERE year = $1 AND period = $2 AND entity = $3
            GROUP BY category, subcategory
            ORDER BY category, subcategory
        `;
        const values = [year, period, entity];

        const result = await pool.query(query, values);
        
        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching income statement:", err.message);
        res.status(500).json({ error: "Server error" });
    }
});

app.get("/api/income-chart", async (req, res) => {
    try {
        const { year, entity, category } = req.query;

        if (!year || !entity) {
            return res.status(400).json({ error: "Year and entity are required parameters" });
        }

        let query = `
            SELECT period, category, SUM(amount) AS total_amount
            FROM financial_data.income_statements
            WHERE year = $1 AND entity = $2
        `;
        const values = [year, entity];

        if (category) {
            query += " AND category = $3";
            values.push(category);
        }

        query += `
            GROUP BY period, category
            ORDER BY period;
        `;

        const result = await pool.query(query, values);
        res.json(result.rows);
    } catch (err) {
        console.error("Error fetching income statement:", err.message);
        res.status(500).json({ error: "Server error" });
    }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
