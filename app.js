const express = require('express');
const app = express();

const routerProdutos = require('./routes/produtos');
const routerPedidos = require('./routes/pedidos');

app.use('/produtos', routerProdutos);
app.use('/pedidos', routerPedidos);


module.exports = app;