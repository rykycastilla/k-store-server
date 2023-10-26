import buildRedirect from '../scripts/build_redirect'
import { Request, Response, Router } from 'express'
import { SESSION_CALLBACK } from '../env'
import users, { User } from '../interfaces/users'
import { useStrategy, VerifyParams } from '../middlewares/auth_google'
import profileDataBuilder from '../scripts/profile_data_builder'

async function verify( params:VerifyParams ) {
  const { profile, done } = params
  const { id } = profile
  const userData: User = profileDataBuilder( profile )
  const accessToken: string = await users.login( id, userData )
  done( null, accessToken )
}

async function login( req:Request, res:Response ) {
  const accessToken = req.user as string
  const script: string = buildRedirect( SESSION_CALLBACK, accessToken )
  res.send( script )
}

async function message( req:Request, res:Response ) {
  const { message } = req.params
  res.send( message )
}

const Login: Router = Router()
Login.get( '/', useStrategy( verify ), login )
Login.get( '/message/:message', message )

export default Login