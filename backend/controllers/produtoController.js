const Produto = require('../models/produto');
const fs = require('fs');
const path = require('path');

exports.createProduto = async (req, res) => {
  const { nome, descricao, categoria, preco } = req.body;

  try {
    let dadosProduto = { nome, descricao, categoria, preco };

    if (req.file) {
      dadosProduto.imagem = "uploads/" + req.file.filename;
    }

    const produto = await Produto.create(dadosProduto);

    res.status(201).json(produto);
  } catch (err) {
    console.error('Erro ao cadastrar produto:', err);
    res.status(500).json({ message: 'Erro ao cadastrar produto' });
  }
};

exports.getAllProdutos = async (req, res) => {
  try {
    const produtos = await Produto.findAll();
    res.status(200).json(produtos);
  } catch (err) {
    console.error('Erro ao listar produtos:', err);
    res.status(500).json({ message: 'Erro ao listar produtos' });
  }
};

exports.getProdutoById = async (req, res) => {
  const { id } = req.params;

  try {
    const produto = await Produto.findByPk(id);

    if (produto) {
      res.status(200).json(produto);
    } else {
      res.status(404).json({ message: 'Produto não encontrado' });
    }
  } catch (err) {
    console.error('Erro ao buscar produto:', err);
    res.status(500).json({ message: 'Erro ao buscar produto' });
  }
};

exports.updateProduto = async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, categoria, preco } = req.body;

  try {
    const produto = await Produto.findByPk(id);
    if (!produto) {
      return res.status(404).json({ message: "Produto não encontrado." });
    }

    let dadosParaAtualizar = { nome, descricao, categoria, preco };

    if (req.file) {
      dadosParaAtualizar.imagem = "uploads/" + req.file.filename;

      if (produto.imagem && !produto.imagem.startsWith('imgs/')) {
        const imagemAntigaPath = path.join(__dirname, '..', 'public', produto.imagem);
        fs.unlink(imagemAntigaPath, err => {
          if (err) console.error("Erro ao deletar imagem antiga:", err);
        });
      }
    }

    await produto.update(dadosParaAtualizar);

    return res.status(200).json(produto);

  } catch (err) {
    console.error("Erro ao atualizar produto:", err);
    res.status(500).json({ message: "Erro interno ao atualizar produto." });
  }
}

exports.deleteProduto = async (req, res) => {
  const id = req.params.id;

  try {
    const produto = await Produto.findByPk(id);

    if (!produto) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    if (produto.imagem && !produto.imagem.startsWith('imgs/')) {
      const imagemPath = path.join(__dirname, '..', 'public', produto.imagem);
      fs.unlink(imagemPath, (err) => {
        if (err) {
          console.error('Erro ao deletar imagem:', err);
        }
      });
    }

    await produto.destroy();

    res.status(200).json({ message: 'Produto deletado com sucesso' });
  } catch (err) {
    console.error('Erro ao deletar produto:', err);
    res.status(500).json({ message: 'Erro ao deletar produto' });
  }
}
