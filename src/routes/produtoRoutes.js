const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

router.post('/novo', produtoController.criarProduto);
router.get('/listar', produtoController.listarProdutos);
router.put('/:id', produtoController.atualizarProduto);
router.delete('/:id', produtoController.excluirProduto);

module.exports = router;
