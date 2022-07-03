require("dotenv").config();
module.exports = {
  dialect: "postgres",
  host: process.env.AWS_DB_HOST,
  username: process.env.AWS_DB_USER,
  password: process.env.AWS_DB_PASS,
  database: "databasetudolimpo",
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
};
