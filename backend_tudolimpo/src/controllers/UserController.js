const User = require("../models/User");
const bcrypt = require("bcryptjs");
const yup = require("yup");
module.exports = {
  async index(req, res) {
    try {
      const users = await User.findAll();
      return res.json(users);
    } catch (error) {
      return res.status(400).json({ error: "Falha na requisição" });
    }
  },
  async store(req, res) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      avatar: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required().min(6),
      module: yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Erro de validação" });
    }
    const { name, avatar, email, password, module } = req.body;

    const userExists = await User.findOne({ where: { email: email } });
    if (userExists) {
      return res
        .status(400)
        .json({ error: "Usuário já cadastrado com esse e-mail" });
    }

    const user = await User.create({
      name,
      avatar,
      email,
      password,
      module,
    });
    return res.json({
      id: user.id,
      avatar: user.avatar,
      name: user.name,
      email: user.email,
      module: user.module,
    });
  },
  async update(req, res) {
    try {
      console.log(req.body);
      console.log(req.userId);
      const { name, email, oldPassword, password } = req.body;
      const user = await User.findByPk(req.userId);

      if (email !== user.email) {
        const userExists = await User.findOne({ where: { email: email } });
        if (userExists) {
          return res
            .status(400)
            .json({ error: "Usuário já cadastrado com esse e-mail" });
        }
      }

      if (oldPassword && password) {
        if (await user.checkPassword(oldPassword)) {
          const n = await bcrypt.hash(password, 8);
          const newuser = await User.update(
            { password_hash: n, name, email },
            { where: { id: req.userId } }
          );
          return res.json(newuser);
        }
        return res.status(401).json({ error: "Senhas não conferem" });
      }

      const userUpdate = await User.update(
        { name, email },
        { where: { id: req.userId } }
      );
      return res.json(userUpdate);
    } catch (error) {
      return res.status(400).json({ error: "Falha na requisição" });
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
      return res.status(400).json({ error: "Falha na requisição" });
    }
  },
};
