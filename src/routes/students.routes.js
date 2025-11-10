const express = require("express");
const router = express.Router();
const {
  listStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
} = require("../controllers/students.controller");

const validateStudent = require("../middlewares/validateStudent");

router.get("/", listStudents);
router.get("/:id", getStudentById);
router.post("/", validateStudent, createStudent);
router.put("/:id", validateStudent, updateStudent);
router.delete("/:id", deleteStudent);

module.exports = router;
