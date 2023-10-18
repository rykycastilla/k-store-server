import express, { Express } from 'express'
import Index from './routes/Index'

const PORT: number = 8000

const app: Express = express()
app.use( '/', Index )
app.listen( PORT, () => console.log( `Server on port: ${ PORT }` ) )