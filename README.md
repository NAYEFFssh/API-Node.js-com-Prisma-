# API Produtos e Categorias

## Configuração

1. Instale as dependências: `npm install`.
2. Crie um arquivo `.env` na raiz e configure `DATABASE_URL` com os dados do seu MySQL. Não compartilhe esse arquivo.
3. Gere o Prisma Client: `npx prisma generate`.
4. Aplique as migrations no banco: `npx prisma migrate deploy`.
5. Inicie a API: `npm run dev`.

## Rotas de produtos

- `POST /produtos/novo` — body: `{ "codigo": 10, "nome": "Teclado", "quantidade": 2, "preco": 80.5 }`
- `GET /produtos/listar`
- `PUT /produtos/:id` — body com um ou mais campos: `codigo`, `nome`, `quantidade`, `preco`.
- `DELETE /produtos/:id`

O campo `total` é calculado pela API como `quantidade * preco`.

## Rotas de categorias

- `POST /categorias/novo` — body: `{ "nome": "Periféricos" }`
- `GET /categorias/listar`
- `PUT /categorias/:id` — body: `{ "nome": "Acessórios" }`
- `DELETE /categorias/:id`

Os nomes são armazenados em letras maiúsculas. O nome da categoria é único.

## Observações

- A API utiliza Prisma com MySQL e o adapter MariaDB já configurado no projeto.
- Foi adicionada uma migration separada para `categorias`, preservando a migration inicial de `produtos`.
