const User = require("../../models/User");
const yup = require("yup");
module.exports = {
  async index(req, res) {
    try {
      const users = await User.findAll();
      return res.json(users);
    } catch (error) {
      return res.status(400).json({ error: "Falha na Requisição" });
    }
  },
  async store(req, res) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required().min(6),
      module: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Erro de Validação" });
    }
    const { name, avatar, email, password, module } = req.body;

    const userExists = await User.findOne({ where: { email: email } });
    if (userExists) {
      return res
        .status(400)
        .json({ error: "Usuário existente com o mesmo email" });
    }

    const user = await User.create(req.body);
    return res.json(user);
  },
  async update(req, res) {
    try {
      const { email, oldPassword } = req.body;
      const userId = req.params.id;
      const user = await User.findByPk(userId);

      if (email !== user.email) {
        const userExists = await User.findOne({ where: { email: email } });
        if (userExists) {
          return res
            .status(400)
            .json({ error: "Usuário existente com o mesmo email" });
        }
      }

      if (oldPassword && !(await user.checkPassword(oldPassword))) {
        return res.status(401).json({ error: "As senhas não combinam" });
      }

      const { id, avatar, name, module } = await user.update(req.body);

      return res.json({
        id,
        avatar,
        name,
        email,
        module,
      });
    } catch (error) {
      return res.status(400).json({ error: "Falha na Requisição" });
    }
  },
  async delete(req, res) {
    try {
      const { id } = req.params;

      const user = await User.destroy({ where: { id } });

      if (user) {
        return res.json({});
      }
      return res.status(400).json({ error: "Usuário não encontrado" });
    } catch (error) {
      return res.status(400).json({ error: "Falha na Requisição" });
    }
  },
};
