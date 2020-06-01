import axios from 'axios'
import * as bcrypt from 'bcryptjs'
import { IUser } from '../models/User'

class UserApiService {
  async getUser(): Promise<IUser> {
    const userData = await axios.get('https://randomuser.me/api/')

    const password = await bcrypt.hash(userData.data.results[0].login.password, 12)
    const userMongo = {
      gender: userData.data.results[0].gender,
      name: userData.data.results[0].name,
      email: userData.data.results[0].email,
      password,
      picture: userData.data.results[0].picture,
    } as IUser

    return userMongo
  }
}

export default UserApiService
