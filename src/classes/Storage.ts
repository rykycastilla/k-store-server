import db from '../interfaces/db'

export default class Storage<T> {
  
  protected readonly storageKey: string
  protected readonly storage: Promise<T>
  private defaultStructure: string
  
  constructor( key:string, defaultStructure:string ) {
    this.defaultStructure = defaultStructure
    this.storageKey = key
    this.storage = new Promise( ( resolve ) => {
      db.get<T>( this.storageKey )
        .then( ( result ) => {
          const defaultStructureParsed = JSON.parse( this.defaultStructure )
          const resultStorage: T = !result
            ? defaultStructureParsed
            : result
          resolve( resultStorage )
        } )
    } )
  }

  // Saving persistent data with database
  protected async saveStorage() {
    const storage = await this.storage
    // Saving in persistent memory
    db.set( this.storageKey, storage )
  }

}