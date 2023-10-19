import express, { Express } from 'express'
import Time from './routes/Time'

const PORT: number = 8000

const app: Express = express()
app.use( '/time', Time )
app.listen( PORT, () => console.log( `Server on port: ${ PORT }` ) )