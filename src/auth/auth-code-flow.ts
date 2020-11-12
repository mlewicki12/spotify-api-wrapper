
import Axios, { AxiosResponse } from 'axios';
import {stringify} from 'query-string';

import Util from '../tools/util';
import { AuthError, AuthObject } from '../types';

export default class AuthCodeFlow {
  /* state used for request verification, randomly generated */
  private _state : string;

  /* redirect uri to give spotify */
  private _redirect: string;

  /**
   * @param redirect - the uri to redirect to on completed request
   */
  constructor(redirect: string) {
    this._state = Util.generateRandomString(16);
    this._redirect = redirect;
  }

  /** 
   * Begin Spotify authorization via Authorization Code Flow
   * @param id - the spotify client id
   * @param scopes - an array of requested scopes
   * @returns spotify authorization endpoint url
   */
  beginAuthorize = (id: string, scopes: Array<string>) : string => {
    return 'https://accounts.spotify.com/authorize?' + stringify({
      client_id: id,
      response_type: 'code',
      redirect_uri: this._redirect,
      state: this._state,
      scope: scopes.join(','),
      show_dialog: false
    });
  }

  /**
   * Request access and refresh tokens from spotify
   * @param id - the spotify client id
   * @param secret - the spotify client secret
   * @param code - the code received from spotify after using beginAuthorize
   * @param state - the state received from spotify after using beginAuthorize
   * @returns authobject containing either access_token and refresh_token or error
   */
  requestTokens = async (id: string, secret: string, code: string, state: string) : Promise<AuthObject | AuthError> => {
    if(state != this._state) {
      throw {type: 'data_error', message: 'provided states don\'t match'};
    }

    return await Axios.post('https://accounts.spotify.com/api/token', stringify({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: this._redirect
    }), {
      headers: {
        Authorization: 'Basic ' + Buffer.from(id + ':' + secret, 'utf8').toString('base64'),
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).then(response => {
      return response.data;
    }).catch(error => {
      // UNTESTED
      return error.response.data;
    });
  }
}