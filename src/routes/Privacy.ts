import express, { Router } from 'express'

const PRIVACY_STATIC = `${ __dirname }/../../privacy/`

const Privacy: Router = Router()
Privacy.use( '/', express.static( PRIVACY_STATIC ) )

export default Privacy