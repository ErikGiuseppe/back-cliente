const express = require("express");
const usuarios = require("./usuariosRoute");
const auth = require("./authRoute");
const role = require("./role");
const permissao = require("./permissao");
const seguranca = require("./seguranca");
const cliente = require("./ClienteRoute.js")
module.exports = (app) => {
  app.use(
    express.json(),
    cliente,
    auth,
    usuarios,
    role,
    permissao,
    seguranca
  );
};
