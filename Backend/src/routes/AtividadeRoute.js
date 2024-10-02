const { Router } = require("express");
const AtividadeController = require("../controllers/AtividadeController");
// const roles = require('../middleware/roles.js')

const atividadeController = new AtividadeController();
const router = Router();

router.get("/atividade", (req, res) => atividadeController.pegaTodos(req, res));
// router.get('/note/:id', roles(["desenvolvedor"]),(req,res) => noteController.pegaUmPorId(req, res))
router.get("/atividade/id/:id", (req, res) => atividadeController.pegaUmPorId(req, res));
router.post("/atividade", (req, res) => atividadeController.criaNovo(req, res));
router.put("/atividade/id/:id", (req, res) => atividadeController.atualiza(req, res));
router.delete("/atividade/id/:id", (req, res) => atividadeController.exclui(req, res));

module.exports = router;
