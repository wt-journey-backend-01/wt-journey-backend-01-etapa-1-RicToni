import { Router } from 'express';
import fs from 'fs/promises';
import path from 'path';
import { validationResult } from 'express-validator';
import { sugestaoSchema } from '../utils/schemas/sugestaoSchema.js';
import { HttpStatusCodes } from '../utils/http.js';

const router = Router();
const filePath = path.resolve('public/data/sugestoes.json');
const paginaAgradecimento = path.resolve('views/sugestao.html');

router.post('/', sugestaoSchema, async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(HttpStatusCodes.BAD_REQUEST).json({ error: errors.array()}); 
  }

  const { nome, ingredientes } = req.body;

  try {
    let sugestoes = [];

    try {
      const data = await fs.readFile(filePath, 'utf-8');
      sugestoes = JSON.parse(data);
      } catch {
        sugestoes = []; 
      }

      const newId = Math.max(...sugestoes.map(s => s.id || 0), 0) + 1;
      const novaSugestao = { id: newId, nome, ingredientes };

      sugestoes.push(novaSugestao);

      await fs.writeFile(filePath, JSON.stringify(sugestoes, null, 2), 'utf-8');

      res.status(HttpStatusCodes.CREATED).json({ message: 'Sugestão enviada com sucesso' });
  } catch (err) {
      console.error(err);
      res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Erro ao salvar sugestão' });
  }
});

router.get('/', (req, res) => {
  res.sendFile(paginaAgradecimento);
});

export default router;