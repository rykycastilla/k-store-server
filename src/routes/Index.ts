import { Request, Response, Router } from 'express'

function home( req:Request, res:Response ) {
  req ; res.send( 'K-Store Server' )
}

const Index: Router = Router()
Index.get( '/', home )

export default Index