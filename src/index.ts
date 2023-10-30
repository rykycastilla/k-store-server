import Backup from './routes/Backup'
import express, { Express } from 'express'
import Login from './routes/Login'
import passport from 'passport'
import Privacy from './routes/Privacy'
import Time from './routes/Time'
import User from './routes/User'

const PORT: number = 8000

const app: Express = express()

// Middlewares
app.use( express.json() )
app.use( passport.initialize() )

// Routes
app.use( '/time', Time )
app.use( '/privacy', Privacy )
app.use( '/login', Login )
app.use( '/user', User )
app.use( '/backup', Backup )

app.listen( PORT, () => console.log( `Server on port: ${ PORT }` ) )