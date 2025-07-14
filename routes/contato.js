import { Router } from 'express';
import fs from 'fs/promises';
import path from 'path';
import { contatoValidator } from '../utils/schemas/contactSchema.js';
import { validationResult } from 'express-validator';
import { HttpStatusCodes } from '../utils/http.js';

const router = Router();

const filePath = path.resolve('public/data/contatos.json');
const paginaContato = path.resolve('views/contato.html');

router.post('/', contatoValidator, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HttpStatusCodes.BAD_REQUEST).json({ errors: errors.array() });
  }

  try {
    const contato = req.body;

    let contatos = [];
    try {
      const data = await fs.readFile(filePath, 'utf-8');
      contatos = JSON.parse(data);
    } catch {
      
    }

    contatos.push(contato);

    await fs.writeFile(filePath, JSON.stringify(contatos, null, 2), 'utf-8');

    res.status(HttpStatusCodes.CREATED).json({ message: 'Contato salvo com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Erro ao salvar contato' });
  }

});













router.get('/', (req, res) => {
    res.sendFile(paginaContato)
})

export default router