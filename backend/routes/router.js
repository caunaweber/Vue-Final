const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const produtoController = require('../controllers/produtoController'); 
const authMiddleware = require('../middleware/authMiddleware');
const upload = require('../config/multer');

router.post('/auth/registrar', usuarioController.createUsuario);
router.post('/auth/login', usuarioController.login);

router.use('/produtos', authMiddleware);

router.post('/produtos', upload.single('imagem'), produtoController.createProduto);
router.get('/produtos', produtoController.getAllProdutos);
router.get('/produtos/:id', produtoController.getProdutoById);
router.put('/produtos/:id', upload.single('imagem'), produtoController.updateProduto);
router.delete('/produtos/:id', produtoController.deleteProduto);

module.exports = router;