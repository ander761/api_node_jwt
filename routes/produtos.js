const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.status(200).send({
        message: "Rota de produtos"
    });
});

router.post('/', (req, res, next) => {
    res.status(201).send({
        message: "Prouto criado com sucesso"
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