const mysql = require('../mysql').pool;


exports.getProdutos =  (req, res, next) => {
    try {
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
    } catch (error) {
        if (error) {
            return res.status(500).send({
                error: error
            });
        }
    }
     
}

exports.postProdutos = (req, res, next) => {

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
}

exports.singleProdutos = (req, res, next) => {
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
}

exports.atualizaProdutos = (req, res, next) => {
    res.status(201).send({
        message: "Atualiza o produto"
    });    
}

exports.deleteProduto = (req, res, next) => {
    res.status(201).send({
        message: "deleta o produto"
    });    
}