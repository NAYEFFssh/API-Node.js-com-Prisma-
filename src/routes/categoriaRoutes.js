const express = require('express');
const router = express.Router();
const categoriaController = require('../controllers/categoriaController');

router.post('/novo', categoriaController.criarCategoria);
router.get('/listar', categoriaController.listarCategorias);
router.put('/:id', categoriaController.atualizarCategoria);
router.delete('/:id', categoriaController.excluirCategoria);

module.exports = router;
