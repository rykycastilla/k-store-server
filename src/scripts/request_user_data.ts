import { Response } from 'express'
import sendError, { Status } from '../scripts/send_error'
import sessions from '../interfaces/sessions'
import users, { User } from '../interfaces/users'

type Authorization = string | undefined

interface UserAccess {
  user: User,
  nextToken: string,
}

type UserAccessResponse = Promise<UserAccess|null>

// Get user data (Mnging all possible invalid responses)
async function requestUserData( authorization:Authorization, res:Response, updateAccess?:boolean ): UserAccessResponse {
  if( !authorization ) {
    sendError( Status.FORBIDDEN, res )
    return null
  }
  const { id, nextToken } = await sessions.who( authorization, updateAccess )
  nextToken
  if( !id ) {
    sendError( Status.FORBIDDEN, res )
    return null
  }
  const user = await users.get( id )
  if( !user ) {
    sendError( Status.FORBIDDEN, res )
    return null
  }
  return { user, nextToken }
}

export default requestUserData