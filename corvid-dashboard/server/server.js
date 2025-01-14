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
            { id: user.id, username: user.username },
            secretKey,
            { expiresIn: "1h" } 
            
        );

        res.json({ message: "Login successful", token });
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

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
