import BackupPostRequest from '../types/backup_post_request'
import db from './db'
import sessions from './sessions'
import Storage from '../classes/Storage'

interface Backup extends BackupPostRequest { date:number }

interface User {
  name: string,
  email: string,
  picture: string,
}

interface UsersIndex {
  [ id: string ]: User
}

class Users extends Storage<UsersIndex> {

  constructor() {
    super( 'users', '{}' )
  }

  // Create or update users
  public async login( id:string, data:User ): Promise<string> {
    const storage = await this.storage
    storage[ id ] = data
    const token: string = await sessions.get( id )
    this.saveStorage()
    return token
  }

  // Get the user data (null if it does not exist)
  public async get( id:string ): Promise<User|null> {
    const storage = await this.storage
    const data = storage[ id ]
    const result: User | null = !data
      ? null
      : data
    return result
  }

  // Destroy users (and current sessions)
  public async logout( id:string ) {
    const storage = await this.storage
    delete storage[ id ]
    sessions.clean( id )
    await db.delete( `${ id }_backup` )
    this.saveStorage()
  }

  // Save the user information in the database
  public async saveBackup( id:string, data:Backup ): Promise<boolean> {
    const storage = await this.storage
    const userExist = Boolean( storage[ id ] )
    if( userExist ) {
      const dbKey = `${ id }_backup`
      await db.set( dbKey, data )
    }
    return userExist
  }

  // Load the user backup from the database
  public async loadBackup( id:string ): Promise<Backup|null> {
    const backup = await db.get<Backup>( `${ id }_backup` )
    return backup
  }

}

const users = new Users()

export default users
export { Backup, User }