
// this is still here as a leftover from the tutorial I did on setting up packages
// leaving it here for now, bc I want to keep the test as a reference
export const Greeter = (name:string) : string => `Hello ${name}`;

import Auth from './auth/auth-code-flow';
import { AuthObject, AuthError } from './types';

export enum AuthType {
  AuthorizationCodeFlow
}

export class SpotifyAPI {
  private _clientId       : string;
  private _clientSecret   : string;

  private _auth?          : Auth;
  private _access_data?   : AuthObject;

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

      this._access_data = {
        access_token: response.data.access_token,
        refresh_token: response.data.refresh_token
      };

      return this._access_data;
    } catch(error) {
      return {error: error.message};
    }
  }
}