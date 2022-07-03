const Service = require("../models/Service");
const Department = require("../models/Department");

module.exports = {
  async index(req, res) {
    try {
      const services = await Service.findAll({
        include: { association: "department" },
      });
      return res.json(services);
    } catch (error) {
      return res.status(400).json({ error: "Falha na requisição" });
    }
  },
  async show(req, res) {
    try {
      const { department_id } = req.params;
      const services = await Service.findAll({ where: { department_id } });
      return res.json(services);
    } catch (error) {
      return res.status(400).json({ error: "Falha na requisição" });
    }
  },
  async store(req, res) {
    try {
      const { department_id } = req.params;
      const { name } = req.body;

      const department = await Department.findByPk(department_id);
      if (!department) {
        return res.status(400).json({ error: "Departmento não encontrado" });
      }

      const serviceExists = await Service.findOne({
        where: { name: name.toLowerCase(), department_id },
      });
      if (serviceExists) {
        return res.status(400).json({ error: "Serviço já cadastrado" });
      }
      const service = await Service.create({
        name: name.toLowerCase(),
        department_id,
      });
      return res.json(service);
    } catch (error) {
      return res.status(400).json({ error: "Falha na requisição" });
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const serviceActual = await Service.findByPk(id);

      const serviceExists = await Service.findOne({
        where: {
          name: name.toLowerCase(),
          department_id: serviceActual.department_id,
        },
      });
      if (serviceExists) {
        return res.status(400).json({ error: "Serviço já cadastrado" });
      }
      const service = await Service.update(
        { name: name.toLowerCase() },
        { where: { id } }
      );

      return res.json(service);
    } catch (error) {
      return res.status(400).json({ error: "Falha na requisição" });
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.params;

      const service = await Service.destroy({ where: { id } });

      if (service) {
        return res.json({});
      }
      return res.status(400).json({ error: "Usuário não encontrado" });
    } catch (error) {
      return res.status(400).json({ error: "Falha na Requisição" });
    }
  },
};
