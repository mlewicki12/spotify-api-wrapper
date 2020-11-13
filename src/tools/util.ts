
import Axios, { AxiosRequestConfig } from 'axios';

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
   * @param config - request config
   */
  static get = (url: string, access_token: string, config?: AxiosRequestConfig) : Promise<any> => {
    if(!config) {
      config = {};
    }

    // this feels kinda dirty, but im not sure how else to do it
    if(config.headers) {
      config.headers.Authorization = `Bearer ${access_token}`;
    } else {
      config.headers = {
        Authorization: `Bearer ${access_token}`
      };
    }

    return Axios.get(url, config).then(response => {
      return response.data;}).catch(error => {
      return error.response.data;});
  }
}