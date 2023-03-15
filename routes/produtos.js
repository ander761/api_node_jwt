const express = require('express');
const router = express.Router();
const mysql = require('../mysql').pool;
const login = require('../middelware/login');

const ProdutosController = require('../controllers/produtosController')

//'login' para proteger a rota, so deixar passar com o token
router.get('/', login, ProdutosController.getProdutos);

router.post('/', login, ProdutosController.postProdutos);

router.get('/:id',login, ProdutosController.singleProdutos);

router.patch('/:id', login, ProdutosController.atualizaProdutos);

router.delete('/:id', login, ProdutosController.deleteProduto);

module.exports = router;