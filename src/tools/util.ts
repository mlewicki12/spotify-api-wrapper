
import Axios from 'axios';
import { SpotifyRequestParams } from '../types';

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

  /**
   * wrapper around axios get, so I don't have to include the promise functions every time
   * 
   * @param url - url to make the request to
   * @param config - request params
   */
  static get = (url: string, access_token: string, params?: SpotifyRequestParams) : Promise<any> => {
    const config = {
      params: params,
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    };

    return Axios.get(url, config).then(response => {
      return response.data;}).catch(error => {
      return error.response.data;});
  }
}