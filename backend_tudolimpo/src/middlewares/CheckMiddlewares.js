const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const authConfig = require("../config/auth");

async function Auth(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ error: "Token não fornecido" });
  }

  const [, token] = authHeader.split(" ");

  try {
    const decoded = await promisify(jwt.verify)(token, authConfig.secret);
    req.userId = decoded.id;
    return next();
  } catch (err) {
    return res.status(404).json({ error: err });
  }
}

async function Admin(req, res, next) {
  const id = req.userId;
  try {
    const user = await User.findOne({ where: { id } });
    if (!user) return res.status(401).json({ error: "Usuário não Existe" });

    const { module } = user;
    if (!module === "admin") {
      return res.status(401).json({ error: "Você não tem autorização" });
    }

    next();
  } catch (err) {
    return res.status(401).json({ error: "Token não fornecido" });
  }
}
async function Automotive(req, res, next) {
  const id = req.userId;
  try {
    const user = await User.findOne({ where: { id } });
    if (!user) return res.status(401).json({ error: "Usuário não Existe" });

    const { module } = user;
    if (!module === "automotive") {
      return res.status(401).json({ error: "Você não tem autorização" });
    }

    next();
  } catch (err) {
    return res.status(401).json({ error: "Token não fornecido" });
  }
}
async function Cleaning(req, res, next) {
  const id = req.userId;
  try {
    const user = await User.findOne({ where: { id } });
    if (!user) return res.status(401).json({ error: "Usuário não Existe" });

    const { module } = user;
    if (!module === "cleaning")
      return res.status(401).json({ error: "Você não tem autorização" });

    next();
  } catch (err) {
    return res.status(401).json({ error: "Token não fornecido" });
  }
}
async function Dedetization(req, res, next) {
  const id = req.userId;
  try {
    const user = await User.findOne({ where: { id } });
    if (!user) return res.status(401).json({ error: "Usuário não Existe" });

    const { module } = user;
    if (!module === "dedetization")
      return res.status(401).json({ error: "Você não tem autorização" });

    next();
  } catch (err) {
    return res.status(401).json({ error: "Token não fornecido" });
  }
}
module.exports = { Auth, Admin, Automotive, Cleaning, Dedetization };
