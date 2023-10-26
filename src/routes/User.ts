import { Request, Response, Router } from 'express'
import requestUserData from '../scripts/request_user_data'
import sendError, { Status } from '../scripts/send_error'
import sessions from '../interfaces/sessions'
import users from '../interfaces/users'

async function name( req:Request, res:Response ) {
  // Accessing to user data
  const { authorization } = req.headers
  const userAccess = await requestUserData( authorization, res, true )
  if( !userAccess ) { return }
  // Unpacking User Access
  const { user, nextToken } = userAccess
  const { name } = user
  res.send( { name, nextToken } )
}

async function email( req:Request, res:Response ) {
  // Accessing to user data
  const { authorization } = req.headers
  const userAccess = await requestUserData( authorization, res, true )
  if( !userAccess ) { return }
  // Unpacking User Access
  const { user, nextToken } = userAccess
  const { email } = user
  res.send( { email, nextToken } )
}

async function picture( req:Request, res:Response ) {
  // Accessing to user data
  const { authorization } = req.headers
  const userAccess = await requestUserData( authorization, res )
  if( !userAccess ) { return }
  // Unpacking User Access
  const { user } = userAccess
  const { picture } = user
  // Requesting picture from Google Servers
  try {
    const imageRes = await fetch( picture ),
      image = await imageRes.blob(),
      binaryImage = await image.arrayBuffer(),
      imageBuffer = Buffer.from( binaryImage )
    res.type( image.type )
    res.send( imageBuffer )
  }
  catch {
    console.log( 'Google servers request failure' )
    sendError( Status.BAD_GETAWAY, res )
  }
  
}

async function deleteIndex( req:Request, res:Response ) {
  // Verifying user access
  const { authorization } = req.headers
  if( !authorization ) {
    sendError( Status.FORBIDDEN, res )
    return
  }
  const { id } = await sessions.who( authorization )
  if( !id ) {
    sendError( Status.FORBIDDEN, res )
    return
  }
  // Deleting user
  users.logout( id )
  res.send( { success: true } )
}

const User: Router = Router()

// GET
User.get( '/name', name )
User.get( '/email', email )
User.get( '/picture', picture )

// DELETE
User.delete( '/', deleteIndex )

export default User