import { db_connection } from "../DB/connection.js"
import { handlingGlobalError } from "./middlewares/global-response.middleware.js"
import UserRouter from "./modules/Auth/auth.routes.js"
import cors from 'cors'

export const initiateApp = (app, express) => {

const port = process.env.PORT
app.use(cors());

db_connection()
app.use(express.json())

app.use('/user', UserRouter)

app.use('*', (req, res, next) => {
    res.status(404).json({ message: 'Not Found' })
})
app.use(handlingGlobalError)

const server =  app.listen(port, () => console.log(`Example app listening on port ${port}!`))}
