const Sequelize = require("sequelize");
const dbConfig = require("../config/database");

const User = require("../models/User");
const Department = require("../models/Department");
const Team = require("../models/Team");
const Service = require("../models/Service");
const Order = require("../models/Order");
const Customer = require("../models/Customer");
const Booking = require("../models/Booking");

const connection = new Sequelize(dbConfig);

User.init(connection);
Department.init(connection);
Team.init(connection);
Service.init(connection);
Order.init(connection);
Customer.init(connection);
Booking.init(connection);

Team.associate(connection.models);
Service.associate(connection.models);
Order.associate(connection.models);
Booking.associate(connection.models);

module.exports = connection;
