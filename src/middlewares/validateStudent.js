const { fail } = require("../helpers/response");

function validateStudent(req, res, next) {
  const { name, nim, major } = req.body || {};
  const missing = [];
  if (!name) missing.push("name");
  if (!nim) missing.push("nim");
  if (!major) missing.push("major");

  if (missing.length) {
    return res.status(400).json(
      fail(`Field wajib: ${missing.join(", ")}`)
    );
  }

  // Validasi ringan (opsional)
  if (typeof name !== "string" || typeof major !== "string") {
    return res.status(400).json(fail("name & major harus string"));
  }
  if (typeof nim !== "string") {
    return res.status(400).json(fail("nim harus string (mis. '2301...')"));
  }

  next();
}

module.exports = validateStudent;
