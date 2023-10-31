import { createClient, RedisClientType } from 'redis'
import cryptography from './cryptography'
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
    const encodeValue: string = JSON.stringify( value ),
      encryptedKey: string = cryptography.encrypt( key ),
      encryptedValue: string = cryptography.encrypt( encodeValue )
    await this.client.set( encryptedKey, encryptedValue )
  }

  public async get<T>( key:string ): Promise<T|null> {
    await this.conection
    // Loading encrypted values from DB
    const encryptedKey: string = cryptography.encrypt( key ),
      encryptedValue: string | null = await this.client.get( encryptedKey )
    // Decrypting
    if( !encryptedValue ) { return null }
    const encodeValue: string = cryptography.decrypt( encryptedValue ),
      value: T = JSON.parse( encodeValue )
    return value
  }

  public async delete( key:string ) {
    await this.conection
    const encryptedKey: string = cryptography.encrypt( key )
    await this.client.del( encryptedKey )
  }

}

const db = new DB( REDIS_STORE )

export default db