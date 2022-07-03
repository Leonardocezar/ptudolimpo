const express = require("express");
const {
  Auth,
  Admin,
  Automotive,
  Cleaning,
  Dedetization,
} = require("../middlewares/CheckMiddlewares");
const AdminUserController = require("../controllers/admin/UserController");
const UserController = require("../controllers/UserController");
const DepartmentController = require("../controllers/DepartmentController");
const TeamController = require("../controllers/TeamController");
const ServiceController = require("../controllers/ServiceController");
const OrderController = require("../controllers/OrderController");
const CustomerController = require("../controllers/CustomerController");
const BookingController = require("../controllers/BookingController");

const routes = express.Router();

routes.get("/users", Auth, Admin, AdminUserController.index);
routes.post("/users", Auth, Admin, AdminUserController.store);
routes.put("/admin/users/:id", Auth, Admin, AdminUserController.update);
routes.delete("/users/:id", Auth, Admin, AdminUserController.delete);

routes.put("/users/:id", Auth, Admin, UserController.update);

routes.post("/departments", Auth, Admin, DepartmentController.store);
routes.delete("/departments/:id", Auth, Admin, DepartmentController.delete);
routes.put("/departments/:id", Auth, Admin, DepartmentController.update);

routes.get("/teams", Auth, Admin, TeamController.index);
routes.get(
  "/departments/:department_id/teams",
  Auth,
  Admin,
  TeamController.show
);
routes.post(
  "/departments/:department_id/teams",
  Auth,
  Admin,
  TeamController.store
);
routes.put("/teams/:id", Auth, Admin, TeamController.update);
routes.delete("/teams/:id", Auth, Admin, TeamController.delete);
//
routes.get("/services", Auth, Admin, ServiceController.index);

routes.post(
  "/departments/:department_id/services",
  Auth,
  Admin,
  ServiceController.store
);
routes.put("/services/:id", Auth, Admin, ServiceController.update);
routes.delete("/services/:id", Auth, Admin, ServiceController.delete);

routes.get("/orders", Auth, Admin, OrderController.index);
routes.put("/orders/:id", Auth, OrderController.update);

routes.post("/customers", Auth, Admin, CustomerController.store);
routes.get("/customers", Auth, Admin, CustomerController.index);
routes.put("/customers/:id", Auth, Admin, CustomerController.update);
routes.delete("/customers/:id", Auth, Admin, CustomerController.delete);

routes.post("/bookings", Auth, BookingController.store);
routes.get("/bookings", Auth, BookingController.index);
routes.get("/bookings/:id", Auth, BookingController.show);
routes.put("/bookings/:id", Auth, Admin, BookingController.update);
routes.delete("/bookings/:id", Auth, Admin, BookingController.delete);
module.exports = routes;
