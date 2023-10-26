import { Request, Response, Router } from 'express'

async function time( req:Request, res:Response ) {
  req
  const currentTime: number = Date.now()
  res.send( { currentTime } ) 
}

const Time: Router = Router()
Time.get( '/', time )

export default Time