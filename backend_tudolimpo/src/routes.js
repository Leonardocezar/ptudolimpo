const express = require("express");
const AuthController = require("./controllers/AuthController");
const OrderController = require("./controllers/OrderController");
const DepartmentController = require("./controllers/DepartmentController");
const ServiceController = require("./controllers/ServiceController");
const BookingController = require("./controllers/customer/BookingController");
const routes = express.Router();

routes.post("/auth", AuthController.store);
routes.post("/orders", OrderController.store);

routes.get("/departments", DepartmentController.index);
routes.get("/departments/:department_id/services", ServiceController.show);
routes.get("/customers/bookings", BookingController.index);
module.exports = routes;
