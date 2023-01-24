const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;

router.get('/', (req, res, next) => {
    mysql.getConnection((error, conn) => {

        if (error) {
            return res.status(500).send({
                error: error
            });
        }

        conn.query(
        'SELECT * FROM produtos',
        (error, resultado, field) => {
            conn.release(); //Libera a conexão

            if (error) {
                res.status(500).send({
                    error: error,
                    response: null
                });
            } 

            res.status(201).send({
                data: resultado,
            });
        }
    )
}); 
});

router.post('/', (req, res, next) => {

    mysql.getConnection((error, conn) => {

            if (error) {
                return res.status(500).send({
                    error: error
                });
            }

            conn.query(
            'INSERT INTO produtos (nome, preco) VALUES (?,?)',
            [req.body.nome, req.body.preco],
            (error, resultado, field) => {
                conn.release(); //Libera a conexão

                if (error) {
                    res.status(500).send({
                        error: error,
                        response: null
                    });
                } 

                res.status(201).send({
                    message: 'Produto inserido com sucesso',
                    id_produto: resultado.insertId
                });
            }
        )
    });   
});

router.get('/:id', (req, res, next) => {
    const id = req.params.id

    if (id == '1'){
        res.status(200).send({
            message: 'ESPECIAL',
            id: id
        });
    }
    else{
        res.status(200).send({
            message: 'Single',
            id: id
        });
    }
});

router.patch('/:id', (req, res, next) => {
    res.status(201).send({
        message: "Atualiza o produto"
    });    
});

router.delete('/:id', (req, res, next) => {
    res.status(201).send({
        message: "deleta o produto"
    });    
});

module.exports = router;