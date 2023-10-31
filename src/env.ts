import { config } from 'dotenv'

config()

interface Env {
  ENCRYPTION_KEY: string,
  GOOGLE_CALLBACK_URL: string,
  GOOGLE_CLIENT_ID: string,
  GOOGLE_CLIENT_SECRET: string,
  REDIS_STORE: string,
  SESSION_CALLBACK: string,
}

export const {
  ENCRYPTION_KEY,
  GOOGLE_CALLBACK_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  REDIS_STORE,
  SESSION_CALLBACK,
} = process.env as unknown as Env

// Numbers
export const ENCRYPTION_INCREASE = Number( process.env.ENCRYPTION_INCREASE )
export const SESSION_LIFETIME = Number( process.env.SESSION_LIFETIME )