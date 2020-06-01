import * as bcrypt from 'bcryptjs'
import { Request, Response } from 'express'
import User from '../models/User'
import UserApiService from '../services/randomUserApiService'

class UsersController {
  async allUsers(req: Request, res: Response) {
    const users = await User.find({ removed: { $ne: true } })
    return res.status(200).send({ users })
  }

  async deleteUser(req: Request, res: Response) {
    const { userId } = req.params
    try {
      const user = await User.findOneAndUpdate({ _id: userId }, { removed: true })
      return res.status(200).send({ user })
    } catch (err) {
      return res.status(500).send({ err })
    }
  }

  async updateUser(req: Request, res: Response) {
    const { userId } = req.params
    const userData = {
      name: req.body.name,
      gender: req.body.gender,
      email: req.body.email,
      picture: req.body.picture,
      password: await bcrypt.hash(req.body.password, 12),
    }

    try {
      await User.findOneAndUpdate({ _id: userId }, userData)
      return res.status(200).send({ userData })
    } catch (err) {
      return res.status(500).send({ err })
    }
  }

  async loginUser(req: Request, res: Response) {
    const user = await User.findOne({ email: req.body.email, removed: { $ne: true } })

    if (!user) {
      return res.status(401).send('User not found')
    }

    try {
      const correct: any = await bcrypt.compare(
        req.body.password,
        user.password,
      )

      if (!correct) {
        return res.status(400).send('Invalid password')
      }
    } catch (error) {
      return res.status(400).send('Invalid password type')
    }

    return res.status(200).send({ success: true })
  }

  async generate(req: Request, res: Response) {
    try {
      const randomUser = new UserApiService()
      const userData = await randomUser.getUser()
      const savedUser = new User(userData)
      savedUser.save()
      return res.status(200).send({ savedUser })
    } catch (err) {
      return res.status(500).send(err)
    }
  }
}

export default UsersController
