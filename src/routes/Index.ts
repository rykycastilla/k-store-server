import { Request, Response, Router } from 'express'
import { META_GOOGLE_ID } from '../env'

async function index( req:Request, res:Response ) {
  req
  res.send( META_GOOGLE_ID )
}

const Index: Router = Router()
Index.get( '/', index )

export default Index