import { body } from 'express-validator';

export const burgerSchema = [
  body('nome')
    .exists().withMessage('O campo nome é obrigatório')
    .isString().withMessage('O nome deve ser uma string')
    .isLength({ min: 3 }).withMessage('O nome deve ter pelo menos 3 caracteres'),

  body('ingredientes')
    .exists().withMessage('O campo ingredientes é obrigatório')
    .isString().withMessage('Ingredientes deve ser uma string')
    .isLength({ min: 3 }).withMessage('Ingredientes deve ter pelo menos 3 caracteres'),
];