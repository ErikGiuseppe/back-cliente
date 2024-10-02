const { Router } = require("express");
const ClienteController = require("../controllers/ClienteController");
// const roles = require('../middleware/roles.js')

const clienteController = new ClienteController();
const router = Router();

router.get("/cliente", (req, res) => clienteController.pegaTodos(req, res));
router.get("/cliente/todos", (req, res) => clienteController.pegaTudoEscopo(req, res));
// router.get('/note/:id', roles(["desenvolvedor"]),(req,res) => noteController.pegaUmPorId(req, res))
router.get("/cliente/id/:id", (req, res) => clienteController.pegaUmPorId(req, res));
router.get("/cliente/nome/:nome", (req, res) =>
  clienteController.pegaUmPorNome(req, res)
);
router.post("/cliente", (req, res) => clienteController.criaNovo(req, res));
router.put("/cliente/id/:id", (req, res) => clienteController.atualiza(req, res));
router.delete("/cliente/id/:id", (req, res) => clienteController.exclui(req, res));

module.exports = router;
