const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Pool Configuration
// Update these credentials to match your local Postgres setup
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "minicourse_db",
  password: "Passwordgmaill",
  port: 5432,
});

// GET: Fetch all courses
app.get("/api/courses", async (req, res) => {
  try {
    const allCourses = await pool.query(
      "SELECT * FROM courses ORDER BY created_at DESC",
    );
    res.json(allCourses.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error while fetching courses" });
  }
});

// POST: Add a new course
app.post("/api/courses", async (req, res) => {
  try {
    const { title, description } = req.body;

    // Basic validation
    if (!title || !description) {
      return res
        .status(400)
        .json({ error: "Title and description are required" });
    }

    const newCourse = await pool.query(
      "INSERT INTO courses (title, description) VALUES ($1, $2) RETURNING *",
      [title, description],
    );

    res.status(201).json(newCourse.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error while creating course" });
  }
});

// PUT: Update an existing course
app.put("/api/courses/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;

    const updateCourse = await pool.query(
      "UPDATE courses SET title = $1, description = $2 WHERE id = $3 RETURNING *",
      [title, description, id],
    );

    if (updateCourse.rows.length === 0) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json(updateCourse.rows[0]);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error while updating course" });
  }
});

// DELETE: Remove a course
app.delete("/api/courses/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const deleteCourse = await pool.query(
      "DELETE FROM courses WHERE id = $1 RETURNING *",
      [id],
    );

    if (deleteCourse.rows.length === 0) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Server error while deleting course" });
  }
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});
