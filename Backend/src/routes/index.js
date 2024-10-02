const express = require("express");
const usuarios = require("./usuariosRoute");
const auth = require("./authRoute");
const role = require("./role");
const permissao = require("./permissao");
const seguranca = require("./seguranca");
const cliente = require("./ClienteRoute.js")
const atividade = require("./AtividadeRoute.js")
module.exports = (app) => {
    app.use(
        express.json(),
        atividade,
        cliente,
        auth,
        usuarios,
        role,
        permissao,
        seguranca,
    );
};
