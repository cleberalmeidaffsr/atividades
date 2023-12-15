const express = require('express');
const router = express.Router();

const lojaController = require('./controllers/lojaController');

router.get('/produtos', lojaController.buscarProdutos);

router.get('/produto/:codigo', lojaController.buscarProduto);

router.post('/produto', lojaController.inserir);

router.put('/produto/:codigo', lojaController.alterar);

router.delete('/produto/:codigo', lojaController.excluir);

module.exports = router;