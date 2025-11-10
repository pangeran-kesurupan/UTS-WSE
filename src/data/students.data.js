const { v4: uuid } = require("uuid");

let students = [
  {
    id: uuid(),
    name: "Muhammad Riduwan",
    nim: "230104040080",
    major: "Teknologi Informasi",
  },
  {
    id: uuid(),
    name: "Budi Santoso",
    nim: "230104040002",
    major: "Sistem Informasi",
  },
];

module.exports = { students };
