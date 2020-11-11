
export default class Util {
  private static _characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  /**
   * generate a random string, used to generate state
   * 
   * @param length - desired length of string
   * @returns string of length <length>
   */
  static generateRandomString = (length: number) : string => {
    let text = '';

    for (let i = 0; i < length; i++) {
      text += Util._characters.charAt(Math.floor(Math.random() * Util._characters.length));
    }

    return text;
  };
}