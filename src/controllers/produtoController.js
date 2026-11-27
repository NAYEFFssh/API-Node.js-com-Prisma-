const produtoModel = require('../models/produtoModel');

const produtoController = {
  criarProduto: async (req, res) => {
    try {
      const { codigo, nome, quantidade, preco } = req.body;
      if (codigo === undefined || !nome || quantidade === undefined || preco === undefined) {
        return res.status(400).json({ sucesso: false, mensagem: 'codigo, nome, quantidade e preco são obrigatórios.' });
      }

      const codigoNumero = Number(codigo);
      const quantidadeNumero = Number(quantidade);
      const precoNumero = Number(preco);
      if (!Number.isInteger(codigoNumero) || !Number.isInteger(quantidadeNumero) || quantidadeNumero < 0 || !Number.isFinite(precoNumero) || precoNumero < 0) {
        return res.status(400).json({ sucesso: false, mensagem: 'codigo e quantidade devem ser inteiros; preco deve ser um número não negativo.' });
      }

      const produto = await produtoModel.criar({
        codigo: codigoNumero,
        nome: String(nome).trim().toUpperCase(),
        quantidade: quantidadeNumero,
        preco: precoNumero,
        total: quantidadeNumero * precoNumero,
      });
      return res.status(201).json({ sucesso: true, mensagem: 'Produto cadastrado com sucesso!', produto });
    } catch (erro) {
      if (erro.code === 'P2002') return res.status(409).json({ sucesso: false, mensagem: 'Já existe um produto com esse código.' });
      console.error(erro);
      return res.status(500).json({ sucesso: false, mensagem: 'Erro ao cadastrar produto.' });
    }
  },

  listarProdutos: async (req, res) => {
    try {
      const produtos = await produtoModel.buscarTodos();
      return res.json({ sucesso: true, total: produtos.length, produtos });
    } catch (erro) {
      console.error(erro);
      return res.status(500).json({ sucesso: false, mensagem: 'Erro ao listar produtos.' });
    }
  },

  atualizarProduto: async (req, res) => {
    try {
      const id = Number(req.params.id);
      if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ sucesso: false, mensagem: 'ID inválido.' });
      const dados = {};
      const { codigo, nome, quantidade, preco } = req.body;
      if (codigo !== undefined) {
        dados.codigo = Number(codigo);
        if (!Number.isInteger(dados.codigo)) return res.status(400).json({ sucesso: false, mensagem: 'codigo deve ser inteiro.' });
      }
      if (nome !== undefined) {
        if (!String(nome).trim()) return res.status(400).json({ sucesso: false, mensagem: 'nome não pode ficar vazio.' });
        dados.nome = String(nome).trim().toUpperCase();
      }
      if (quantidade !== undefined) {
        dados.quantidade = Number(quantidade);
        if (!Number.isInteger(dados.quantidade) || dados.quantidade < 0) return res.status(400).json({ sucesso: false, mensagem: 'quantidade deve ser um inteiro não negativo.' });
      }
      if (preco !== undefined) {
        dados.preco = Number(preco);
        if (!Number.isFinite(dados.preco) || dados.preco < 0) return res.status(400).json({ sucesso: false, mensagem: 'preco deve ser um número não negativo.' });
      }
      if (Object.keys(dados).length === 0) return res.status(400).json({ sucesso: false, mensagem: 'Informe ao menos um campo para atualizar.' });

      const atual = await produtoModel.buscarPorId(id);
      if (!atual) return res.status(404).json({ sucesso: false, mensagem: 'Produto não encontrado.' });
      const novaQuantidade = dados.quantidade ?? atual.quantidade;
      const novoPreco = dados.preco ?? Number(atual.preco);
      dados.total = novaQuantidade * novoPreco;

      const produto = await produtoModel.atualizar(id, dados);
      return res.json({ sucesso: true, mensagem: 'Produto atualizado com sucesso!', produto });
    } catch (erro) {
      if (erro.code === 'P2002') return res.status(409).json({ sucesso: false, mensagem: 'Já existe um produto com esse código.' });
      console.error(erro);
      return res.status(500).json({ sucesso: false, mensagem: 'Erro ao atualizar produto.' });
    }
  },

  excluirProduto: async (req, res) => {
    try {
      const id = Number(req.params.id);
      if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ sucesso: false, mensagem: 'ID inválido.' });
      const existente = await produtoModel.buscarPorId(id);
      if (!existente) return res.status(404).json({ sucesso: false, mensagem: 'Produto não encontrado.' });
      await produtoModel.excluir(id);
      return res.json({ sucesso: true, mensagem: 'Produto excluído com sucesso.' });
    } catch (erro) {
      console.error(erro);
      return res.status(500).json({ sucesso: false, mensagem: 'Erro ao excluir produto.' });
    }
  },
};

module.exports = produtoController;
