// src/middlewares/limitter.js
const rateLimit = require('express-rate-limit');

// Ambil konfigurasi dari file .env (fallback default)
const windowMinutes = Number(process.env.RATE_WINDOW_MINUTES) || 15;
const maxRequests = Number(process.env.RATE_MAX_REQUEST) || 100;

const limiter = rateLimit({
  windowMs: windowMinutes * 60 * 1000, // default: 15 menit
  max: maxRequests,                    // default: 100 request per IP
  message: {
    status: "fail",
    message: "Terlalu banyak request, coba lagi nanti."
  },
  standardHeaders: true,  // Mengirim RateLimit info dalam header
  legacyHeaders: false    // Nonaktifkan X-RateLimit-* lama
});

module.exports = limiter;
