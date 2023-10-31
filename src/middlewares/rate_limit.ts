import expressRateLimit, { RateLimitRequestHandler } from 'express-rate-limit'

function rateLimit( windowMs:number, max:number ): RateLimitRequestHandler {
  return expressRateLimit( {
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
  } )
}

export default rateLimit