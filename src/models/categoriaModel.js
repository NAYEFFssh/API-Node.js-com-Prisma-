const prisma = require('../../database/prisma');

const categoriaModel = {
  criar: (dados) => prisma.categoria.create({ data: dados }),
  buscarTodos: () => prisma.categoria.findMany({ orderBy: { id: 'asc' } }),
  buscarPorId: (id) => prisma.categoria.findUnique({ where: { id } }),
  atualizar: (id, dados) => prisma.categoria.update({ where: { id }, data: dados }),
  excluir: (id) => prisma.categoria.delete({ where: { id } }),
};

module.exports = categoriaModel;
