const AuthService = require("../services/authService");

const authService = new AuthService();

class AuthController {
  static async login(req, res) {
    const { email, senha } = req.body;

    try {
      const login = await authService.login({ email, senha });

      return res.status(200).send(login);
    } catch (error) {
      return res.status(401).send({ message: error.message });
    }
  }
}

module.exports = AuthController;
