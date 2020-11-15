
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
   * wrapper around axios get, attaches access token to request
   * 
   * @param url - url to make the request to
   * @param access_token - spotify access token
   * @param params - (optional) parameters to add onto the request
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

  /**
   * wrapper around axios put, attaches access token to request
   * 
   * @param url - url to make the request to
   * @param access_token - spotify access token
   * @param params - (optional) parameters to add onto the request
   */
  static put = (url: string, access_token: string, params?: SpotifyRequestParams) : Promise<any> => {
    return Axios.put(url, params, {
      headers: {
        Authorization: `Bearer ${access_token}`
      }
    }).then(data => {
      return {status: data.status};
    }).catch(error => {
      return error.response.data;
    });
  }

  /**
   * wrapper around axios delete, attaches access token to request
   * 
   * @param url - url to make the request to 
   * @param access_token - spotify access token
   * @param params - (optional) parameters to add onto the request
   */
  static delete = (url: string, access_token: string, params?: SpotifyRequestParams) : Promise<any> => {
    return Axios.delete(url, {
      headers: {
        Authorization: `Bearer ${access_token}`
      },
      data: params
    }).then(data => {
      return {status: data.status};
    }).catch(error => {
      return error.response.data;
    });
  }
}