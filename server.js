import express from 'express';
import dotenv from 'dotenv';
import lanchRoute from './routes/lanches.js'
import sugestionRoute from './routes/sugestao.js'
import contactRoute from './routes/contato.js'
import path from 'path';

dotenv.config();
const app = express()
const port = process.env.PORT || 3000;


app.use(express.json());
app.use((req, res, next) => {
    console.log(`${new Date().toLocaleString()} | Requisição: ${req.method} ${req.url}` );
    next();
})

app.use(express.static(path.resolve('public')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve('views/index.html'));
});

app.use('/api/lanches', lanchRoute);
app.use('/sugestao', sugestionRoute);
app.use('/contato', contactRoute);



app.listen(port, () => {
  console.log(`Servidor rodando na porta -> ${port}`)
})