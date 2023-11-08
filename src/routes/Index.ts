import express, { Router } from 'express'

const INDEX_STATIC = `${ __dirname }/../../home/`

const Index: Router = Router()
Index.use( '/', express.static( INDEX_STATIC ) )

export default Index