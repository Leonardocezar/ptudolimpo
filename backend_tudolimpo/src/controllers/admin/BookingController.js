const Sequelize = require("sequelize");
const Booking = require("../models/Booking");
const Team = require("../models/Team");
const Service = require("../models/Service");
const Customer = require("../models/Customer");
const User = require("../models/User");
module.exports = {
  async store(req, res) {
    try {
      const { userId } = req;
      const {
        team_id,
        service_id,
        customer_id,
        description,
        start,
        end,
      } = req.body;
      const op = Sequelize.Op;

      const bookingExists = await Booking.findAll({
        where: {
          team_id,
          start: { [op.between]: [start, end] },
          end: { [op.between]: [start, end] },
        },
      });
      if (bookingExists.length > 0) {
        return res.status(400).json({
          error: "Horário indisponivel para essa Equipe",
        });
      }

      const booking = await Booking.create({
        team_id,
        service_id,
        customer_id,
        description,
        status: "scheduled",
        start,
        end,
        created_by: userId,
        updated_by: userId,
      });
      return res.json(booking);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: "Falha na Requisição" });
    }
  },
  async index(req, res) {
    try {
      const bookings = await Booking.findAll();
      return res.json(bookings);
    } catch (error) {
      return res.status(400).json({ error: "Falha na Requisição" });
    }
  },
  async show(req, res) {
    try {
      const { id } = req.params;
      const booking = await Booking.findByPk(id, {
        include: [
          { model: Team, as: "team" },
          { model: Service, as: "service" },
          { model: Customer, as: "customer" },
          { model: User, as: "created" },
          { model: User, as: "updated" },
        ],
      });

      if (!booking) {
        return res.status(400).json({ error: "Agendamento não encontrado" });
      }
      return res.json(booking);
    } catch (error) {
      return res.status(400).json({ error: "Falha na Requisição" });
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params;
      const { userId } = req;
      const { team_id, service_id, description, start, end, status } = req.body;
      console.log(req.body);
      const booking = await Booking.findByPk(id);

      if (!booking) {
        return res.status(400).json({ error: "Agendamento não encontrado" });
      }

      const op = Sequelize.Op;

      const bookingExists = await Booking.findOne({
        where: {
          team_id,
          start: { [op.between]: [start, end] },
          end: { [op.between]: [start, end] },
        },
      });
      if (bookingExists && bookingExists.id !== booking.id) {
        return res.status(400).json({
          error: "Horário indisponivel para essa Equipe",
        });
      }

      const bookingUpdated = await Booking.update(
        {
          team_id,
          service_id,
          description,
          start,
          end,
          status,
          updated_by: userId,
        },
        { where: { id } }
      );
      return res.json(bookingUpdated);
    } catch (error) {
      return res.status(400).json({ error: "Falha na Requisição" });
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.params;
      const booking = await Booking.destroy({ where: { id } });

      if (booking) {
        return res.json({});
      }
      return res.status(400).json({ error: "Agendamento não encontrado" });
    } catch (error) {
      return res.status(400).json({ error: "Falha na Requisição" });
    }
  },
};
