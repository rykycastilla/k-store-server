import Backup from './routes/Backup'
import express, { Express } from 'express'
import Index from './routes/Index'
import Login from './routes/Login'
import passport from 'passport'
import payloadSizeLimit, { DataUnits } from './middlewares/payload_size_limit'
import Privacy from './routes/Privacy'
import rateLimit from './middlewares/rate_limit'
import Time from './routes/Time'
import timeout from './middlewares/timeout'
import User from './routes/User'

const PORT: number = 8000

const app: Express = express()

// Middlewares
app.use( express.json() )
app.use( passport.initialize() )
app.use( rateLimit( 60_000, 100 ) )
app.use( timeout( 10_000 ) )
app.use( payloadSizeLimit( 1, DataUnits.MB ) )

// Routes
app.use( '/', Index )
app.use( '/time', Time )
app.use( '/privacy', Privacy )
app.use( '/login', Login )
app.use( '/user', User )
app.use( '/backup', Backup )

app.listen( PORT, () => console.log( `Server on port: ${ PORT }` ) )