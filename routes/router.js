const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const produtoController = require('../controllers/produtoController'); 
const authMiddleware = require('../middleware/authMiddleware');

router.post('/registrar', usuarioController.createUsuario);
router.post('/login', usuarioController.login);

router.use('/produtos', authMiddleware);

router.post('/produtos', produtoController.createProduto);
router.get('/produtos', produtoController.getAllProdutos);
router.get('/produtos/:id', produtoController.getProdutoById);
router.put('/produtos/:id', produtoController.updateProduto);
router.delete('/produtos/:id', produtoController.deleteProduto);

module.exports = router;