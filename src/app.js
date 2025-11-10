const express = require("express");
const morgan = require("morgan");
const studentsRouter = require("./routes/students.routes");
const errorHandler = require("./middlewares/errorHandler");

const app = express();
const PORT = 3000;

// Middlewares
app.use(morgan("dev"));
app.use(express.json());

// Discoverability: /api/info
app.get("/api/info", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "UTS WSE — RESTful API Info",
    data: {
      service: "students API",
      owner: {
        name: "Nama Kamu",
        nim: "NIM Kamu"
      },
      principles: [
        "Resource-Oriented URI (/api/students)",
        "HTTP Methods (GET, POST, PUT, DELETE)",
        "Stateless (tidak ada session di server)",
        "Status Codes konsisten (200, 201, 204, 400, 404, 500)",
        "JSON representation",
        "Validation & Error Handling",
        "Discoverability (/api/info)"
      ]
    }
  });
});

// Routes
app.use("/api/students", studentsRouter);

// Root
app.get("/", (req, res) => {
  res.json({ message: "API Ready 🚀" });
});

// Error Handler (global)
app.use(errorHandler);

// Start
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
