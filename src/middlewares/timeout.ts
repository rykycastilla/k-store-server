import ExpressEndpointFunction from '../types/express_endpoint_function'
import { NextFunction, Request, Response } from 'express'

function timeout( duration:number ): ExpressEndpointFunction {
  return ( req:Request, res:Response, next:NextFunction ) => {
    req.setTimeout( duration )
    res.setTimeout( duration )
    next()
  }
}

export default timeout