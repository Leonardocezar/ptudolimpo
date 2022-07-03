require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const routes = require("./routes");
const AdminRoutes = require("./routes/Admin");

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
  }
  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(express.urlencoded({ extended: true }));
    this.server.use(morgan("dev"));
  }
  routes() {
    this.server.use(routes);
    this.server.use(AdminRoutes);
  }
}

module.exports = new App().server;
