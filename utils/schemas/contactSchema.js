import { body } from 'express-validator';


export const contatoValidator = [
    body('nome')
      .notEmpty().withMessage('O nome é obrigatório.')
      .isLength({ min: 2 }).withMessage('O nome deve ter pelo menos 2 caracteres.'),
  
    body('email')
      .notEmpty().withMessage('O e-mail é obrigatório.')
      .isEmail().withMessage('Formato de e-mail inválido.'),
  
    body('assunto')
      .notEmpty().withMessage('O assunto é obrigatório.')
      .isLength({ min: 3 }).withMessage('O assunto deve ter pelo menos 3 caracteres.'),
  
    body('mensagem')
      .notEmpty().withMessage('A mensagem é obrigatória.')
      .isLength({ min: 10 }).withMessage('A mensagem deve ter pelo menos 10 caracteres.')
  ];