const express = require('express');
const router = express.Router();

const produtoRoutes = require('./produtoRoutes');
const categoriaRoutes = require('./categoriaRoutes');
const usuarioRoutes = require('./usuarioRoutes');

router.use('/produtos', produtoRoutes);
router.use('/categorias', categoriaRoutes);
router.use('/usuario', usuarioRoutes);

module.exports = router;
