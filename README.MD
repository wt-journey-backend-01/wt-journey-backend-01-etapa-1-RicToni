# DevBurger 🍔

Aplicação web simples para gerenciamento de sugestões de lanches e envio de mensagens de contato, feita com Node.js e Express.

## 🚀 Funcionalidades

- Cadastro de lanches
- Sugestões de novos lanches
- Formulário de contato
- Exibição de dados a partir de arquivos JSON
- Estilização com TailwindCSS

## 📁 Estrutura de Pastas

```
├── public/             # Arquivos estáticos (CSS, imagens)
│   └── css/            # Estilos (Tailwind + custom)
├── data/               # "Banco de dados" baseado em arquivos JSON
├── scripts/            # Scripts do lado do cliente
├── routes/             # Rotas Express para lanches, sugestões e contato
├── utils/              # Utilitários auxiliares
│   └── schemas/        # Schemas para validação de dados
├── views/              # Páginas HTML servidas pelo backend
├── .env                # Variáveis de ambiente
├── server.js           # Ponto de entrada da aplicação (Express)
```

## 🛠️ Tecnologias Utilizadas

- Node.js
- Express
- HTML5
- CSS3 / Tailwind
- JavaScript Vanilla
- JSON

## ▶️ Como rodar o projeto

### 1. Clone o repositório:

```bash
 git clone https://github.com/wt-journey-backend-01/wt-journey-backend-01-etapa-1-RicToni.git
```

### 2. Instale as dependências:

```bash
npm install
```

### 3. Inicie o servidor:

```bash
npm run start:dev
```

### 4. Acesse o servidor localmente no navegador pela URL a seguir, ou pela porta indicada no terminal no após o passo número 3: 

```bash
http://localhost:3000
```