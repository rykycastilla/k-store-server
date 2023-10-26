import createToken from 'create-token'
import { SESSION_LIFETIME } from '../env'
import Storage from '../classes/Storage'

type FunctionVoid = () => void
type SearchInstructions = ( session:Session, userSessions:Session[], userID:string, stop:FunctionVoid ) => void

interface Access {
  id: string | null,
  nextToken: string,
}

class Session {
  readonly token: string
  readonly dueDate: number 
  readonly safeDate: number
  constructor( lifeTime:number ) {
    this.token = createToken( 7 )
    const now: number = Date.now()
    this.dueDate = now + lifeTime
    this.safeDate = now + ( lifeTime / 2 )
  }
}

interface SessionsIndex {
  [ userID: string ]: Session[],
}

class Sessions extends Storage<SessionsIndex> {

  private readonly lifeTime: number

  constructor( lifeTime:number ) {
    super( 'sessions', '{}' )
    this.lifeTime = lifeTime
    // Activating Garbage Collector
    setInterval( this.garbageCollector, 86_400_000 )  // Every Day
  }

  // Iterate for each user session an apply to it these "instructions"
  private searchSessions( storage:SessionsIndex, instructions:SearchInstructions ) {
    const userIDs: string[] = Object.keys( storage )
    for( const userID of userIDs ) {
      const userSessions = storage[ userID ] as Session[]
      let stopSearch = false
      // stop: is used to break iteration (in both cicles)
      const stop = () => stopSearch = true
      for( const session of userSessions ) {
        instructions( session, userSessions, userID, stop )
        if( stopSearch ) { break }
      }
      if( stopSearch ) { break }
    }
  }
  
  // Destroy invalid sessions
  private async garbageCollector() {
    const storage = await this.storage
    this.searchSessions( storage, ( session:Session, userSessions:Session[] ) => {
      if( session.dueDate < Date.now() ) {
        const index: number = userSessions.indexOf( session )
        userSessions.splice( index, 1 )
      }
    } )
    this.saveStorage()
  }

  // Update the user session if the date is not safe
  private update( userSessions:Session[] ): Session {
    const latestIndex: number = userSessions.length - 1
    let latestSession = userSessions[ latestIndex ] as Session
    if( ( latestSession?.safeDate < Date.now() ) || !latestSession ) {
      latestSession = new Session( this.lifeTime )
      userSessions.push( latestSession )
    }
    return latestSession
  }

  // Using the "userID" return a valid session
  public async get( userID:string ): Promise<string> {
    const storage = await this.storage
    let userSessions = storage[ userID ]
    // Setting a user session by default
    if( !userSessions ) {
      const newSession = new Session( this.lifeTime )
      userSessions = [ newSession ]
    }
    // Checking the user session lifetime
    const latestSession: Session = this.update( userSessions )
    // Saving data
    storage[ userID ] = userSessions
    this.saveStorage()
    return latestSession.token
    
  }

  public async who( token:string, update?:boolean ): Promise<Access> {    
    const storage = await this.storage
    let nextToken: string = token
    let id: string | null = null
    // Searhing the token
    this.searchSessions( storage, ( session:Session, userSessions:Session[], userID:string, stop:FunctionVoid ) => {
      if( session.token !== token ) { return }  // Filtering invalid tokens
      if( session.dueDate > Date.now() ) {  // Authorized
        id = userID
        if( update ) {
          const latestSession = this.update( userSessions )
          nextToken = latestSession.token
        }
      }
      stop()
    } )
    this.saveStorage()
    return { id, nextToken }
  }

  public async clean( userID:string ) {
    const storage = await this.storage
    delete storage[ userID ]
    this.saveStorage()
  }

}

const sessions = new Sessions( SESSION_LIFETIME )

export default sessions
export { Access, Session }