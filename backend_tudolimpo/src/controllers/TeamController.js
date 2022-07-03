const Team = require("../models/Team");
const Department = require("../models/Department");

module.exports = {
  async index(req, res) {
    try {
      const teams = await Team.findAll({
        include: { association: "department" },
      });
      return res.json(teams);
    } catch (error) {
      return res.status(400).json({ error: "Falha na requisição" });
    }
  },
  async show(req, res) {
    try {
      const { department_id } = req.params;
      const teams = await Team.findAll({ where: { department_id } });
      return res.json(teams);
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

      const teamExists = await Team.findOne({
        where: { name: name.toLowerCase(), department_id },
      });
      if (teamExists) {
        return res.status(400).json({ error: "Equipe já cadastrada" });
      }
      const team = await Team.create({
        name: name.toLowerCase(),
        department_id,
      });
      return res.json(team);
    } catch (error) {
      return res.status(400).json({ error: "Falha na requisição" });
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const teamActual = await Team.findByPk(id);

      const teamExists = await Team.findOne({
        where: {
          name: name.toLowerCase(),
          department_id: teamActual.department_id,
        },
      });
      if (teamExists) {
        return res.status(400).json({ error: "Equipe já cadastrada" });
      }
      const team = await Team.update(
        { name: name.toLowerCase() },
        { where: { id } }
      );

      return res.json(team);
    } catch (error) {
      return res.status(400).json({ error: "Falha na requisição" });
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.params;
      const teams = await Team.destroy({ where: { id: id } });
      return res.json(teams);
    } catch (error) {
      return res.status(400).json({ error: "Falha na requisição" });
    }
  },
};
