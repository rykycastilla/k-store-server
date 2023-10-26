import sessions from './sessions'
import Storage from '../classes/Storage'

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
    this.saveStorage()
  }

}

const users = new Users()

export default users
export { User }