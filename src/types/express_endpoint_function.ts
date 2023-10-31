import { NextFunction, Request, Response } from 'express'

type ExpressEndpointFunction = ( re:Request, res:Response, next:NextFunction ) => void

export default ExpressEndpointFunction