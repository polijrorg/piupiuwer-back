import { body } from 'express-validator';

const createPiuSchema = [
  body('text').isString().isLength({ min: 1 }).withMessage('You can not send empty pius')
    .isLength({ max: 140 })
    .withMessage('You can not send pius with more than 140 characters'),
];

export default createPiuSchema;
