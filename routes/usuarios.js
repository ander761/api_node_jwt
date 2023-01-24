const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

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


router.post('/login', (req, res, next) => {
    mysql.getConnection((error, conn) => {
        if (error) {
            return res.status(500).send({
                error: error
            });
        }

        const query = 'SELECT * FROM usuarios WHERE email = ?';
        conn.query(query, [req.body.email],(error, results, fields) => {
            conn.release();
            if (error) {
                return res.status(500).send({
                    error: error
                });
            }
            //Checando se o email ja esta registrado
            if (results.length < 1) {
                return res.status(401).send({
                    message: 'Falha na autenticação'
                });
            }

            //Comparar a senha com o has do banco de dados
            bcrypt.compare(req.body.senha, results[0].senha, (error, result) => {
                if (error) {
                    return res.status(401).send({
                        mensagem: 'Falha na autenticação'
                    });
                }

                if (result) {
                    const token = jwt.sign({
                        id_usuario: results[0].id_usuario,
                        email: results[0].email
                    }, process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    });

                    return res.status(200).send({
                        mensagem: "Autenticação com sucesso",
                        token: token
                    });
                }

                return res.status(401).send({
                    mensagem: 'Falha na autenticação'
                });
            });
        });
    });
});

module.exports = router;