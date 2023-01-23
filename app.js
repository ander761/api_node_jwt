const express = require('express');
const app = express();
const morgan = require('morgan');

const routerProdutos = require('./routes/produtos');
const routerPedidos = require('./routes/pedidos');
const { use } = require('./routes/produtos');

app.use(morgan('dev')); //A biblioteca morgan monitora a execução e gera um log no terminal
app.use('/produtos', routerProdutos);
app.use('/pedidos', routerPedidos);

//Rota default para mostrar uma mensagem de erro caso o usuário informe a rota errada
app.use((req, res, next) => {
    const erro = new Error('Rota não encontrada');
    erro.status = 404;
    next(erro)
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    return res.send({
        erro: {
            message: error.message
        }
    });
});


module.exports = app;