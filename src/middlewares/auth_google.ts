import { GOOGLE_CALLBACK_URL, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from '../env'
import { OAuth2Strategy as GoogleStrategy } from 'passport-google-oauth'
import passport from 'passport'
import { Profile, VerifyFunction } from 'passport-google-oauth'

const STRATEGY_NAME = 'auth-google'

const config = {
  clientID: GOOGLE_CLIENT_ID,
  clientSecret: GOOGLE_CLIENT_SECRET,
  callbackURL: GOOGLE_CALLBACK_URL,
}

export interface VerifyParams {
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  done: VerifyFunction,
}

export type VerifyCallback = ( params:VerifyParams ) => void

let verifyCallback: VerifyCallback = () => {}

function verify( accessToken:string, refreshToken:string, profile:Profile, done:VerifyFunction ) {
  const params: VerifyParams = { accessToken, refreshToken, profile, done }
  verifyCallback( params )
}

export function useStrategy( callback:VerifyCallback ) {
  verifyCallback = callback
  const scope: string[] = [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
  ]
  const prompt = 'select_account',
    options = { scope, prompt }
  return passport.authenticate( STRATEGY_NAME, options )
}

type Callback = ( err:null, id:unknown ) => void

function serializingUser( user:Express.User, callback:Callback ) {
  callback( null, user )
}

const strategy = new GoogleStrategy( config, verify )
passport.use( STRATEGY_NAME, strategy  )
passport.serializeUser( serializingUser )
passport.deserializeUser( serializingUser )