import { Profile } from 'passport-google-oauth'
import { User } from '../interfaces/users'

interface Data { value:string }

type GoogleData = Data[] | undefined 

// Get the current value of a Google profile's property
function getGoogleData( googleData:GoogleData, defaultValue:string ): string {
  if( !googleData ) { googleData = [] }
  let [ data ] = googleData
  if( !data ) { data = { value: defaultValue } }
  return data.value 
}

// Build an object compatible with the "User" structure
function profileDataBuilder( profile:Profile ): User {
  const { displayName:name, emails, photos } = profile
  const email: string = getGoogleData( emails, '---' ),
    picture: string = getGoogleData( photos, '' )
  return { name, email, picture }
}

export default profileDataBuilder