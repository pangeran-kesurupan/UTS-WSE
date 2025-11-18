// src/middlewares/logger.js
const morgan = require('morgan');

// Gunakan format log sesuai environment
// - development → lebih detail
// - production → ringkas
const format =
  process.env.NODE_ENV === "production"
    ? "combined"
    : "dev";

const logger = morgan(format);

module.exports = logger;
