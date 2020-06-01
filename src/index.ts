import * as express from 'express'
import * as cors from 'cors'
import * as bodyParser from 'body-parser'
import userActions from './routes/users'

const app: express.Application = express()

app.use(cors({ origin: '*' }))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(userActions)

export default app
