const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const produtoController = require('../controllers/produtoController'); 

router.post('/produtos', produtoController.createProduto);
router.get('/produtos', produtoController.getAllProdutos);
router.get('/produtos/:id', produtoController.getProdutoById);
router.put('/produtos/:id', produtoController.updateProduto);
router.delete('/produtos/:id', produtoController.deleteProduto);

router.post('/registrar', usuarioController.createUsuario);

module.exports = router;