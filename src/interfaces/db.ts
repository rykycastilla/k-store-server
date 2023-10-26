import { createClient, RedisClientType } from 'redis'
import { REDIS_STORE } from '../env'

class DB {

  private readonly client: RedisClientType
  private readonly conection: Promise<RedisClientType>

  constructor( url:string ) {
    this.client = createClient( { url: url } )
    this.conection = this.client.connect()
  }

  public async set<T>( key:string, value:T ) {
    await this.conection
    const encodeValue: string = JSON.stringify( value )
    await this.client.set( key, encodeValue )
  }

  public async get<T>( key:string ): Promise<T|null> {
    await this.conection
    const encodeValue: string | null = await this.client.get( key )
    const value: T | null = encodeValue
      ? JSON.parse( encodeValue )
      : null
    return value
  }

  public async delete( key:string ) {
    await this.conection
    await this.client.del( key )
  }

}

const db = new DB( REDIS_STORE )

export default db