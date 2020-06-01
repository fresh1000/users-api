import { Router } from 'express'
import UsersController from '../controllers/UsersController'
import { validateDeleteUser, validateUpdateUser, validateLogin } from '../validation'

const router = Router()
const usersController = new UsersController()

router.get('/api/users', usersController.allUsers)
router.put('/api/users/:userId', validateUpdateUser, usersController.updateUser)
router.delete('/api/users/:userId', validateDeleteUser, usersController.deleteUser)
router.post('/api/users/login', validateLogin, usersController.loginUser)
router.get('/api/users/generate', usersController.generate)

export default router
