import  express  from "express"
import dotenv from 'dotenv'
import { notFound, errorHandler } from './middleware/errorMiddleware.js';
import db from './config/connection.js'
import userroutes from './routes/userroutes.js';
import cors from "cors";
import cookieParser from 'cookie-parser';




dotenv.config()

db()
const app = express()
app.use(cors())
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/users/',userroutes)

app.get('/', (req,res) => res.send('Server is ready'))

app.use(notFound)
app.use(errorHandler)

app.listen(8000, () => console.log(`Server started on port 8000`))



