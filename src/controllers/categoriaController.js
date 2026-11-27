const categoriaModel = require('../models/categoriaModel');

const categoriaController = {
  criarCategoria: async (req, res) => {
    try {
      const { nome } = req.body;
      if (!nome || !String(nome).trim()) return res.status(400).json({ sucesso: false, mensagem: 'O campo nome é obrigatório.' });
      const categoria = await categoriaModel.criar({ nome: String(nome).trim().toUpperCase() });
      return res.status(201).json({ sucesso: true, mensagem: 'Categoria cadastrada com sucesso!', categoria });
    } catch (erro) {
      if (erro.code === 'P2002') return res.status(409).json({ sucesso: false, mensagem: 'Já existe uma categoria com esse nome.' });
      console.error(erro);
      return res.status(500).json({ sucesso: false, mensagem: 'Erro ao cadastrar categoria.' });
    }
  },

  listarCategorias: async (req, res) => {
    try {
      const categorias = await categoriaModel.buscarTodos();
      return res.json({ sucesso: true, total: categorias.length, categorias });
    } catch (erro) {
      console.error(erro);
      return res.status(500).json({ sucesso: false, mensagem: 'Erro ao listar categorias.' });
    }
  },

  atualizarCategoria: async (req, res) => {
    try {
      const id = Number(req.params.id);
      const { nome } = req.body;
      if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ sucesso: false, mensagem: 'ID inválido.' });
      if (!nome || !String(nome).trim()) return res.status(400).json({ sucesso: false, mensagem: 'Informe um nome válido.' });
      if (!await categoriaModel.buscarPorId(id)) return res.status(404).json({ sucesso: false, mensagem: 'Categoria não encontrada.' });
      const categoria = await categoriaModel.atualizar(id, { nome: String(nome).trim().toUpperCase() });
      return res.json({ sucesso: true, mensagem: 'Categoria atualizada com sucesso!', categoria });
    } catch (erro) {
      if (erro.code === 'P2002') return res.status(409).json({ sucesso: false, mensagem: 'Já existe uma categoria com esse nome.' });
      console.error(erro);
      return res.status(500).json({ sucesso: false, mensagem: 'Erro ao atualizar categoria.' });
    }
  },

  excluirCategoria: async (req, res) => {
    try {
      const id = Number(req.params.id);
      if (!Number.isInteger(id) || id <= 0) return res.status(400).json({ sucesso: false, mensagem: 'ID inválido.' });
      if (!await categoriaModel.buscarPorId(id)) return res.status(404).json({ sucesso: false, mensagem: 'Categoria não encontrada.' });
      await categoriaModel.excluir(id);
      return res.json({ sucesso: true, mensagem: 'Categoria excluída com sucesso.' });
    } catch (erro) {
      console.error(erro);
      return res.status(500).json({ sucesso: false, mensagem: 'Erro ao excluir categoria.' });
    }
  },
};

module.exports = categoriaController;
