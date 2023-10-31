import { ENCRYPTION_KEY, ENCRYPTION_INCREASE } from '../env'

class Cryptography {
  
  private readonly key: string
  private readonly increase: number

  constructor( key:string, increase:number ) {
    this.key = key
    this.increase = increase
  }

  private toCode( char:string ): number {
    return char.charCodeAt( 0 )
  }

  private toChar( code:number ): string {
    return String.fromCharCode( code )
  }
  
  public encrypt( text:string ): string {
    const chars: string[] = text.split( '' )
    // Increasing char codes
    const keyLength: number = this.key.length
    let encryptedChars: string[] = [],
      _this = 0
    for( const char of chars ) {
      const charCode: number = this.toCode( char ),
        keyChar = this.key[ _this % keyLength ] as string,
        keyCharCode: number = this.toCode( keyChar ),
        newCharCode: number = charCode + keyCharCode + this.increase,
        newChar: string = this.toChar( newCharCode )      
      encryptedChars.push( newChar )
      _this++
    }
    // Rotate
    const lastCharsIndex: number = encryptedChars.length - ( keyLength - 1 ),
      lastChars: string[] = encryptedChars.splice( lastCharsIndex, keyLength )
    encryptedChars = lastChars.concat( encryptedChars )
    // Reversing
    encryptedChars.reverse()
    return encryptedChars.join( '' )
  }

  public decrypt( encryptedText:string ): string {
    // Reversing
    let decryptedChars: string[] = encryptedText.split( '' )
    decryptedChars.reverse()
    // Rotate
    const keyLength: number = this.key.length,
      lastChars: string[] = decryptedChars.splice( 0, keyLength - 1 )
    decryptedChars = decryptedChars.concat( lastChars )
    // Decreasing char codes
    let _this = 0
    for( const char of decryptedChars ) {
      const charCode: number = this.toCode( char ),
        keyChar = this.key[ _this % keyLength ] as string,
        keyCharCode: number = this.toCode( keyChar ),
        decryptedCharCode: number = charCode - keyCharCode - this.increase,
        decryptedChar: string = this.toChar( decryptedCharCode )
      decryptedChars[ _this ] = decryptedChar
      _this++
    }
    return decryptedChars.join( '' )
  }

}

const cryptography = new Cryptography( ENCRYPTION_KEY, ENCRYPTION_INCREASE )

export default cryptography