// src/app.js
require('dotenv').config();

const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const studentRoutes = require('./routes/students.routes');
const errorHandler = require('./middlewares/errorHandler');
const logger = require('./middlewares/logger');
const limiter = require('./middlewares/limitter');

const app = express();

// =========================
// Basic Setup
// =========================
app.use(express.json());

// =========================
// Security Middlewares
// =========================

// 1. Helmet -> HTTP security headers
app.use(helmet());

// 2. CORS -> batasi origin yang boleh akses API
const allowedOrigin = process.env.CORS_ORIGIN || 'http://localhost:5173';
app.use(
  cors({
    origin: allowedOrigin,
  })
);

// 3. Rate Limiter (middleware terpisah di limitter.js)
app.use(limiter);

// =========================
// Logging Middleware
// =========================
app.use(logger);

// =========================
// Routes Resource Students
// =========================
app.use('/api/students', studentRoutes);

// =========================
// Monitoring Endpoints
// =========================

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    env: process.env.NODE_ENV || "development"
  });
});

// Metrics sederhana (opsional)
app.get('/api/metrics', (req, res) => {
  res.json({
    status: "ok",
    pid: process.pid,
    memoryUsage: process.memoryUsage(),
    uptime: process.uptime()
  });
});

// =========================
// Endpoint untuk uji ERROR 500
// =========================
app.get('/api/force-error', (req, res, next) => {
  const err = new Error("Simulasi internal server error");
  err.status = 500;
  next(err); // dilempar ke global error handler
});

// =========================
// Discoverability Endpoint
// =========================
app.get('/api/info', (req, res) => {
  res.status(200).json({
    status: "success",
    message: "UTS + Praktikum 7 WSE — RESTful API Info",
    data: {
      service: "students API",
      owner: {
        name: "Muhammad Riduwan",
        nim: "230104040080"
      },
      principles: [
        "Resource-Oriented URI (/api/students)",
        "HTTP Methods (GET, POST, PUT, DELETE)",
        "Stateless",
        "Status Codes konsisten (200, 201, 204, 400, 404, 500)",
        "JSON Representation",
        "Validation & Error Handling",
        "Discoverability (/api/info)"
      ],
      security: [
        "Helmet untuk HTTP security headers",
        "CORS origin: " + allowedOrigin,
        "Rate Limiting via limitter.js"
      ],
      monitoring: [
        "/api/health untuk health check",
        "/api/metrics untuk metrics sederhana"
      ]
    }
  });
});

// =========================
// Root Default Route
// =========================
app.get('/', (req, res) => {
  res.json({ message: 'API Ready 🚀' });
});

// =========================
// Handler 404 Global (ANY)
// =========================
app.use((req, res, next) => {
  res.status(404).json({
    status: "fail",
    message: "Endpoint tidak ditemukan"
  });
});

// =========================
// Global Error Handler
// =========================
app.use(errorHandler);

// =========================
// Start Server
// =========================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
