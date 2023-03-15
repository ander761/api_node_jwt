const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const routerProdutos = require('./routes/produtos');
const routerPedidos = require('./routes/pedidos');
const routerUsuarios = require('./routes/usuarios');

const { use } = require('./routes/produtos');

app.use(morgan('dev')); //A biblioteca morgan monitora a execução e gera um log no terminal
app.use(bodyParser.urlencoded({extended: false })); //apenas aceitar dadios simples
app.use(bodyParser.json()); //aceitar somente json no body

app.use((req, res, next) => { // CORS
    res.header('Access-Control-Allow-Origin', '*');
    res.header(
        'Access-Control-Allow-Header',
        'Orgin, X-Requrested-Wit, Content-type, Accept, Authorization'
    );

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }

    next();

});

app.use('/produtos', routerProdutos);
app.use('/pedidos', routerPedidos);
app.use('/usuarios', routerUsuarios);

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