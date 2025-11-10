const { fail } = require("../helpers/response");

function errorHandler(err, req, res, next) {
  console.error(err);
  const status = err.status || 500;
  return res.status(status).json(fail(err.message || "Internal Server Error"));
}

module.exports = errorHandler;
