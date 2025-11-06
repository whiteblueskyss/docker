import express from "express"
import cors from "cors"
import bodyParser from "body-parser"
import mysql from "mysql2/promise"

const app = express()
const port = 4000

app.use(cors())
app.use(bodyParser.json())

// MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || "db",
  user: process.env.DB_USER || "appuser",
  password: process.env.DB_PASSWORD || "appsecret",
  database: process.env.DB_NAME || "appdb"
})

// ---- Routes ----

// GET all users
app.get("/users", async (req, res) => {
  const [rows] = await pool.query("SELECT * FROM user")
  res.json(rows)
})

// POST new user
app.post("/users", async (req, res) => {
  const { name, role } = req.body
  if (!name || !role) return res.status(400).json({ error: "Missing fields" })
  const [result] = await pool.query("INSERT INTO user (name, role) VALUES (?, ?)", [name, role])
  res.json({ id: result.insertId, name, role })
})

// ---- Start server ----
app.listen(port, () => console.log(`✅ API running on port ${port}`))
