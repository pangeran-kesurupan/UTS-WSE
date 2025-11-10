const { students } = require("../data/students.data");
const { ok, fail } = require("../helpers/response");
const { v4: uuid } = require("uuid");

// GET /api/students
const listStudents = (req, res) => {
  return res.status(200).json(ok(students));
};

// GET /api/students/:id
const getStudentById = (req, res) => {
  const { id } = req.params;
  const found = students.find((s) => s.id === id);
  if (!found) return res.status(404).json(fail("Student not found"));
  return res.status(200).json(ok(found));
};

// POST /api/students
const createStudent = (req, res) => {
  const { name, nim, major } = req.body;
  const newStudent = { id: uuid(), name, nim, major };
  students.push(newStudent);
  return res.status(201).json(ok(newStudent, "Student created"));
};

// PUT /api/students/:id
const updateStudent = (req, res) => {
  const { id } = req.params;
  const idx = students.findIndex((s) => s.id === id);
  if (idx === -1) return res.status(404).json(fail("Student not found"));

  const { name, nim, major } = req.body;
  students[idx] = { ...students[idx], name, nim, major };
  return res.status(200).json(ok(students[idx], "Student updated"));
};

// DELETE /api/students/:id
const deleteStudent = (req, res) => {
  const { id } = req.params;
  const idx = students.findIndex((s) => s.id === id);
  if (idx === -1) return res.status(404).json(fail("Student not found"));
  students.splice(idx, 1);
  return res.status(204).send(); // No Content
};

module.exports = {
  listStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
