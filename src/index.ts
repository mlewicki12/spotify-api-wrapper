
export const Greeter = (name:string) : string => `Hello ${name}`;

import Auth from './auth/auth-code-flow';
import AuthObject from './auth/auth-object';

export enum AuthType {
  AuthorizationCodeFlow
}

export class SpotifyAPI {
  private _clientId       : string;
  private _clientSecret   : string;

  private _auth?          : Auth;

  constructor(id:string, secret:string) {
    this._clientId = id;
    this._clientSecret = secret;
  }

  getAuthLink(redirect: string, scopes: Array<string>) : string {
    if(!this._auth) {
      this._auth = new Auth(redirect);
    }

    return this._auth.beginAuthorize(this._clientId, scopes);
  }

  async getAccessToken(code: string, state: string) : Promise<AuthObject> {
    if(!this._auth) {
      return {error: 'no existing authorization object found, did you mean to call getAuthLink?'};
    }

    try {
      const response = await this._auth.requestTokens(this._clientId, this._clientSecret, code, state);
      if(response.data.error) {
        return {
          error: response.data.error
        };
      }

      return {
        access_token: response.data.access_token,
        refresh_token: response.data.refresh_token
      };
    } catch(error) {
      return {error: error.message};
    }
  }
}