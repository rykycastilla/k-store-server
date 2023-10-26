import { Response } from 'express'

const messages = {
  403: 'Invalid Authorization Token',
  502: 'Unable to request partner\'s data'
}

enum Status {
  FORBIDDEN = 403,
  BAD_GETAWAY = 502,
}

function sendError( status:Status, res:Response ) {
  const message = messages[ status ]
  res.status( status ).send( { error: message } )
  res.errored
}

export default sendError
export { Status }