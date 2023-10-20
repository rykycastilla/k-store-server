import express, { Express } from 'express'
import Privacy from './routes/Privacy'
import Time from './routes/Time'

const PORT: number = 8000

const app: Express = express()
app.use( '/time', Time )
app.use( '/privacy', Privacy )
app.listen( PORT, () => console.log( `Server on port: ${ PORT }` ) )