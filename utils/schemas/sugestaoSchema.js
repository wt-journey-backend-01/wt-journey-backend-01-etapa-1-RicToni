import { body } from 'express-validator';

export const sugestaoSchema = [
  body('nome')
    .notEmpty().withMessage('O nome é obrigatório')
    .isLength({ min: 2 }).withMessage('O nome deve ter pelo menos 2 caracteres'),

  body('ingredientes')
    .notEmpty().withMessage('Os ingredientes são obrigatórios')
    .isLength({ min: 5 }).withMessage('Os ingredientes devem ter pelo menos 5 caracteres'),
];