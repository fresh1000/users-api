import { body, param } from 'express-validator'

const validateUpdateUser = [
  body('email').isEmail(),
  body('name').notEmpty(),
  body('password').isString(),
  body('picture').notEmpty(),
  body('gender').isString(),
  param('userId', 'Invalid user id').matches('^[0-9a-fA-F]{24}$'),
]

const validateDeleteUser = [
  param('userId', 'Invalid user id').matches('^[0-9a-fA-F]{24}$'),
]

const validateLogin = [
  body('email').isEmail(),
  body('password').isString(),
]

export {
  validateUpdateUser,
  validateDeleteUser,
  validateLogin,
}
