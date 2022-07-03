const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authConfig = require("../config/auth");

class AuthController {
  async store(req, res) {
    try {
      const { email, password } = req.body;

      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).send({ error: "Usuário não encontrado" });
      }

      if (!(await user.checkPassword(password))) {
        return res.status(401).send({ error: "Senha Incorreta" });
      }

      const { id, name, module, avatar } = user;
      return res.json({
        user: {
          id,
          avatar,
          name,
          email,
          module,
        },
        token: jwt.sign({ id }, authConfig.secret, {
          expiresIn: authConfig.expiresIn,
        }),
      });
    } catch (err) {
      return res.status(400).send({ error: "Falha na requisição" });
    }
  }
}
module.exports = new AuthController();
