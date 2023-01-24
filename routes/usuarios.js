const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt')

router.post('/cadastro', (req, res) => {

    mysql.getConnection((err, conn) => {
        if (err) { return res.status(500).send({error: err})}
        bcrypt.hash(req.body.senha, 10, (errBcrypt, hash) => {
            if (errBcrypt) { return res.status(500).send({ error1: errBcrypt})}
            conn.query('INSERT INTO usuarios (email, senha) VALUES (?,?)', 
            [req.body.email, hash], (error, results) => {
                if (error) {
                    conn.release();
                    return res.status(500).send({
                        message: error
                    });
                }

                return res.status(201).send({
                    message: "Usuário criado com sucesso",
                    id_usuario: results.insertId
                });
            });
        });

    });  
});

module.exports = router;