import React, { useState, useEffect } from "react";

function App() {
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingId, setEditingId] = useState(null); // Tracks which course we are editing

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/courses");
      const data = await response.json();
      setCourses(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const method = editingId ? "PUT" : "POST";
      const url = editingId
        ? `http://localhost:5000/api/courses/${editingId}`
        : "http://localhost:5000/api/courses";

      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });

      if (response.ok) {
        setTitle("");
        setDescription("");
        setEditingId(null);
        fetchCourses();
      }
    } catch (error) {
      console.error("Error saving course:", error);
    }
  };

  const handleEditClick = (course) => {
    setTitle(course.title);
    setDescription(course.description);
    setEditingId(course.id);
    window.scrollTo({ top: 0, behavior: "smooth" }); // Scroll up to the form
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this course?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/courses/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchCourses();
      }
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const handleCancelEdit = () => {
    setTitle("");
    setDescription("");
    setEditingId(null);
  };

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "0 auto",
        padding: "20px",
        fontFamily: "sans-serif",
      }}
    >
      <h1>Mini Course Manager</h1>

      {/* Form handles both Add and Edit */}
      <form
        onSubmit={handleSubmit}
        style={{
          marginBottom: "30px",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <input
          type="text"
          placeholder="Course Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ padding: "8px", fontSize: "16px" }}
        />
        <textarea
          placeholder="Course Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          style={{ padding: "8px", fontSize: "16px", minHeight: "80px" }}
        />
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            type="submit"
            style={{
              padding: "10px",
              background: editingId ? "#28a745" : "#007BFF",
              color: "white",
              border: "none",
              cursor: "pointer",
              flex: 1,
            }}
          >
            {editingId ? "Update Course" : "Add Course"}
          </button>
          {editingId && (
            <button
              type="button"
              onClick={handleCancelEdit}
              style={{
                padding: "10px",
                background: "#dc3545",
                color: "white",
                border: "none",
                cursor: "pointer",
              }}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* List of courses with action buttons */}
      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        {courses.map((course) => (
          <div
            key={course.id}
            style={{
              border: "1px solid #ddd",
              padding: "15px",
              borderRadius: "5px",
            }}
          >
            <h2 style={{ margin: "0 0 10px 0" }}>{course.title}</h2>
            <p style={{ margin: "0 0 15px 0", color: "#555" }}>
              {course.description}
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => handleEditClick(course)}
                style={{
                  padding: "5px 10px",
                  background: "#ffc107",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(course.id)}
                style={{
                  padding: "5px 10px",
                  background: "#dc3545",
                  color: "white",
                  border: "none",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {courses.length === 0 && <p>No courses found. Add one above!</p>}
      </div>
    </div>
  );
}

export default App;
