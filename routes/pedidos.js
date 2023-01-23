const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).send({
        message: "Retorna os pedidos"
    });
});

router.post('/', (req, res, next) => {
    res.status(201).send({
        message: "pedidos criado com sucesso"
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
        message: "Atualiza o pedidos"
    });    
});

router.delete('/:id', (req, res, next) => {
    res.status(201).send({
        message: "deleta o pedidos"
    });    
});

module.exports = router;