import BackupPostRequest from '../types/backup_post_request'
import backupSchema from '../schemas/backup_schema'
import { indexSchema } from '../schemas/backup'
import { Request, Response, Router } from 'express'
import sendError, { Status } from '../scripts/send_error'
import sessions from '../interfaces/sessions'
import users, { Backup } from '../interfaces/users'

async function get_index( req:Request, res:Response ) {
  // Checking user permissions
  const { authorization } = req.headers
  if( !authorization ) {
    sendError( Status.FORBIDDEN, res )
    return
  }
  const { id, nextToken } = await sessions.who( authorization, true )
  if( !id ) {
    sendError( Status.FORBIDDEN, res )
    return
  }
  // Loading backup
  const backup: Backup | null = await users.loadBackup( id )
  if( !backup ) {
    sendError( Status.NOT_FOUND, res )
    return
  }
  const { error } = backupSchema.validate( backup )
  if( error ) {
    sendError( Status.INTERNAL_SERVER_ERROR, res )
    return
  }
  res.send( { backup, nextToken } )
}

async function exist( req:Request, res:Response ) {
  const { authorization } = req.headers
  if( !authorization ) {
    sendError( Status.FORBIDDEN, res )
    return
  }
  const { id, nextToken } = await sessions.who( authorization, true )
  if( !id ) {
    sendError( Status.FORBIDDEN, res )
    return
  }
  const backup: Backup | null = await users.loadBackup( id )
  const { error } = backupSchema.validate( backup )
  if( error ) {
    sendError( Status.INTERNAL_SERVER_ERROR, res )
    return
  }
  const date: number | null = backup ? backup.date : null
  res.send( { date, nextToken } )
}

async function post_index( req:Request, res:Response ) {
  const { body } = req
  // Checking user permissions
  const { authorization } = req.headers
  if( !authorization ) {
    sendError( Status.FORBIDDEN, res )
    return
  }
  const { id, nextToken } = await sessions.who( authorization, true )
  if( !id ) {
    sendError( Status.FORBIDDEN, res )
    return
  }
  // Checking data syntax
  let backupRequest: BackupPostRequest
  const { error } = indexSchema.validate( body )
  if( error ) {
    sendError( Status.BAD_REQUEST, res )
    return
  }
  else { backupRequest = body }
  // Checking Date Order
  const backupDate: number = Date.now()
  let previousMoment = 0,
    wrongDateSyntax = false
  const { history } = backupRequest
  const dateList: string[] = Object.assign( [], history )
  dateList.reverse()  // Reversing to get an ordered date list: to improve frontend rendering the list is served by the most recently date to the first
  for( const date of dateList ) {
    const moment: number = Date.parse( date ),
      correctOrder: boolean = previousMoment < moment,
      unexpectedDate: boolean = backupDate < moment
    if( !correctOrder || unexpectedDate ) {
      wrongDateSyntax = true
      break
    }
    previousMoment = moment
  }
  if( wrongDateSyntax ) {
    sendError( Status.BAD_REQUEST, res )
    return
  }
  // Saving backup in database
  const backup: Backup = Object.assign( { date: backupDate }, backupRequest ),
    userExist: boolean = await users.saveBackup( id, backup )
  if( !userExist ) {
    sendError( Status.FORBIDDEN, res )
    return
  }
  res.send( { nextToken } )
}

const Backup: Router = Router()

// GET
Backup.get( '/', get_index )
Backup.get( '/exist', exist )

// POST
Backup.post( '/', post_index )

export default Backup