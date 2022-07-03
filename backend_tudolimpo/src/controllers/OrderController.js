const Order = require("../models/Order");

module.exports = {
  async index(req, res) {
    try {
      const orders = await Order.findAll({
        include: { association: "service" },
        where: {
          is_approved: false,
          is_rejected: false,
        },
      });
      return res.json(orders);
    } catch (error) {
      return res.status(400).json({ error: "Falha na requisição" });
    }
  },
  async store(req, res) {
    try {
      const {
        name,
        reference,
        city,
        street,
        number,
        email,
        phone,
        date,
        service_id,
      } = req.body;
      const order = await Order.create({
        name,
        reference,
        city,
        street,
        number,
        email: email.toLowerCase(),
        phone,
        date,
        is_approved: false,
        is_rejected: false,
        service_id,
      });

      req.io.emit("orders");
      req.io.emit("orders", {
        message: "new",
      });
      return res.json(order);
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: "Falha na requisição" });
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params;
      const { is_approved, is_rejected } = req.body;

      const order = await Order.findByPk(id);

      if (!order) {
        return res.status(400).json({ error: "Pedido não encontrado" });
      }

      if (is_rejected) {
        const updatedOrder = await Order.update(
          { is_rejected: true },
          { where: { id } }
        );
        return res.json(updatedOrder);
      }

      if (is_approved) {
        const updatedOrder = await Order.update(
          { is_approved: true },
          { where: { id } }
        );
        return res.json(updatedOrder);
      }
    } catch (error) {}
  },
};
