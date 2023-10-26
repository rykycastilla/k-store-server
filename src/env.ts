import { config } from 'dotenv'

config()

interface Env {
  GOOGLE_CALLBACK_URL: string,
  GOOGLE_CLIENT_ID: string,
  GOOGLE_CLIENT_SECRET: string,
  REDIS_STORE: string,
  SESSION_CALLBACK: string,
}

export const {
  GOOGLE_CALLBACK_URL,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  REDIS_STORE,
  SESSION_CALLBACK,
} = process.env as unknown as Env

export const SESSION_LIFETIME = Number( process.env.SESSION_LIFETIME )