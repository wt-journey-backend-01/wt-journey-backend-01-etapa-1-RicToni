import { Router } from "express";
import { HttpStatusCodes } from "../utils/http.js";
import { burgerSchema } from "../utils/schemas/burgerSchema.js";
import { validationResult } from 'express-validator';
import fs from 'fs/promises';
import path from 'path';


const filePath = path.resolve('public/data/lanches.json');
const router = Router();

router.get('/', async(req, res) => {
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        const lanches = JSON.parse(data);
        res.status(HttpStatusCodes.OK).json(lanches);
    } catch (error) {
        console.error(error);
        res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Erro ao carregar os lanches.' });
    };
});

router.post('/',burgerSchema, async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(HttpStatusCodes.BAD_REQUEST).json({ errors: errors.array() });
    }
  
    try {
        const burgersData = await fs.readFile(filePath, 'utf-8');
        const burgers = JSON.parse(burgersData);
  
        const newId = Math.max(...burgers.map(b => b.id), 0) + 1;
        const { nome, ingredientes } = req.body;
  
        const novoBurger = { id: newId, nome, ingredientes };
        burgers.push(novoBurger);
  
        await fs.writeFile(filePath, JSON.stringify(burgers, null, 2), 'utf-8');
  
        return res.status(HttpStatusCodes.CREATED).json({
        message: 'Burger criado com sucesso!',
        data: novoBurger,
      });
    } catch (err) {
        console.error('Erro ao processar arquivo JSON:', err);
        return res.status(HttpStatusCodes.INTERNAL_SERVER_ERROR).json({
          message: 'Erro interno no servidor',
          error: err.message,
      });
    }
  });

export default router;