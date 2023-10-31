import ExpressEndpointFunction from '../types/express_endpoint_function'
import { NextFunction, Request, Response } from 'express'
import sendError, { Status } from '../scripts/send_error'

enum DataUnits {
  B = 1,
  KB = DataUnits.B * 1024,
  MB = DataUnits.KB * 1024,
}

function payloadSizeLimit( dataAmount:number, unit:DataUnits ): ExpressEndpointFunction {
  return (req:Request, res:Response, next:NextFunction) => {
    // Setting size limit
    const maxPayloadSize = dataAmount * unit
    // Getting content length
    const contentLengthString: string | undefined = req.headers[ 'content-length' ],
      contentLength: number = contentLengthString
        ? parseInt( contentLengthString )
        : 0
    // Analyzing and setting error message
    if ( contentLength > maxPayloadSize) {
      sendError( Status.PAYLOAD_TOO_LARGE, res )
      return
    }
    next()
  }
}

export default payloadSizeLimit
export { DataUnits }