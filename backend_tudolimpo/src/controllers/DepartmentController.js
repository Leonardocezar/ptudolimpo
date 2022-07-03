const Department = require("../models/Department");

module.exports = {
  async index(req, res) {
    try {
      const departments = await Department.findAll();
      return res.json(departments);
    } catch (error) {
      return res.status(400).json({ error: "Falha na requisição" });
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const departmentExists = await Department.findByPk(id);
      if (!departmentExists) {
        return res.status(400).json({ error: "Departamento não encontrado" });
      }

      const departmentsAlready = await Department.findOne({
        where: {
          name: name.toLowerCase(),
        },
      });

      if (departmentsAlready) {
        return res.status(400).json({ error: "Departamento já cadastrado" });
      }

      const department = await Department.update(
        { name: name.toLowerCase() },
        { where: { id } }
      );
      return res.json(department);
    } catch (error) {
      return res.status(400).json({ error: "Falha na requisição" });
    }
  },
  async store(req, res) {
    try {
      const id = req.userId;
      const { name } = req.body;

      const departmentExists = await Department.findOne({
        where: { name: name.toLowerCase() },
      });
      if (departmentExists) {
        return res.status(400).json({ error: "Departamento já cadastrado" });
      }
      const department = await Department.create({ name: name.toLowerCase() });
      return res.json(department);
    } catch (error) {
      return res.status(400).json({ error: "Falha na requisição" });
    }
  },
  async show(req, res) {
    try {
    } catch (error) {
      return res.status(400).json({ error: "Falha na requisição" });
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.params;
      const department = await Department.destroy({ where: { id } });

      if (department) {
        return res.json({});
      }
      return res.status(400).json({ error: "Departmento não encontrado" });
    } catch (error) {
      return res.status(400).json({ error: "Falha na requisição" });
    }
  },
};
