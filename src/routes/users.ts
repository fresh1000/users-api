import { Router } from 'express'
import UsersController from '../controllers/UsersController'

const router = Router()
const usersController = new UsersController()

router.get('/api/users', usersController.allUsers)
router.put('/api/users/:userId', usersController.updateUser)
router.delete('/api/users/:userId', usersController.deleteUser)
router.post('/api/users/login', usersController.loginUser)
router.get('/api/users/generate', usersController.generate)

export default router
