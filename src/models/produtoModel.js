const prisma = require('../../database/prisma');

const produtoModel = {
  criar: (dados) => prisma.produto.create({ data: dados }),
  buscarTodos: () => prisma.produto.findMany({ orderBy: { id: 'asc' } }),
  buscarPorId: (id) => prisma.produto.findUnique({ where: { id } }),
  atualizar: (id, dados) => prisma.produto.update({ where: { id }, data: dados }),
  excluir: (id) => prisma.produto.delete({ where: { id } }),
};

module.exports = produtoModel;
