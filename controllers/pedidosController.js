const mysql = require('../mysql').pool;

exports.getPedidos = (req, res, next) => {
    res.status(200).send({
        message: "Retorna os pedidos - separado"
    });
}
