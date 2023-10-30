import { Response } from 'express'

const messages = {
  502: 'Unable to request partner\'s data',
  400: 'Unexpected Request Syntax',
  403: 'Invalid Authorization Token',
  500: 'Unexpected Issue',
  404: 'The information you are requesting does not exists'
}

enum Status {
  BAD_GETAWAY = 502,
  BAD_REQUEST = 400,
  FORBIDDEN = 403,
  INTERNAL_SERVER_ERROR = 500,
  NOT_FOUND = 404,
}

function sendError( status:Status, res:Response ) {
  const message = messages[ status ]
  res.status( status ).send( { error: message } )
  res.errored
}

export default sendError
export { Status }