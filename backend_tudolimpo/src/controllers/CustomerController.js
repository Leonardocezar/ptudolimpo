const Customer = require("../models/Customer");

module.exports = {
  async index(req, res) {
    try {
      const customers = await Customer.findAll();
      return res.json(customers);
    } catch (error) {
      return res.status(400).json({ error: "Falha na Requisição" });
    }
  },
  async store(req, res) {
    try {
      const { name, reference, city, street, number, email, phone } = req.body;

      const customerExists = await Customer.findOne({ where: { email } });

      if (customerExists) {
        return res.status(400).json({ error: "Cliente já está cadastrado" });
      }

      const customer = await Customer.create({
        name,
        reference,
        city,
        street,
        number,
        email: email.toLowerCase(),
        phone,
      });
      return res.json(customer);
    } catch (error) {
      return res.status(400).json({ error: "Falha na Requisição" });
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params;

      const customer = await Customer.findByPk(id);

      if (!customer) {
        return res.status(400).json({ error: "Cliente não encontrado" });
      }

      if (customer.email !== req.body.email) {
        const customerExists = await Customer.findOne({
          where: { email: req.body.email },
        });
        if (customerExists) {
          return res
            .status(400)
            .json({ error: "Cliente já cadastrado com o mesmo email" });
        }
      }

      const customerUpdated = await Customer.update(req.body, {
        where: { id },
      });
      return res.json(customerUpdated);
    } catch (error) {
      return res.status(400).json({ error: "Falha na requisição" });
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.params;
      const customer = await Customer.destroy({ where: { id } });

      if (customer) {
        return res.json({});
      }
      return res.status(400).json({ error: "Departamento não encontrado" });
    } catch (error) {
      return res.status(400).json({ error: "Falha na Requisição" });
    }
  },
};
