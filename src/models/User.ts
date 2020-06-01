import * as mongoose from 'mongoose'

export interface IUser extends mongoose.Document {
  email: string,
  gender: string,
  name: Object,
  picture: Object,
  password: string,
  removed: boolean,
}

const userSchema = new mongoose.Schema({
  name: {
    type: Object,
    required: true,
  },
  gender: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  picture: {
    type: Object,
    required: true,
  },
  removed: {
    type: String,
    default: false,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
}, { versionKey: false })

export default mongoose.model<IUser>('User', userSchema)
