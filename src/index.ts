
// this is still here as a leftover from the tutorial I did on setting up packages
// leaving it here for now, bc I want to keep the test as a reference
export const Greeter = (name:string) : string => `Hello ${name}`;

import Auth from './auth/auth-code-flow';
import { AlbumsEndpoint } from './endpoints/albums';
import { Album, Artist, AuthError, AuthObject, Error, Paging, SimpleAlbum, SimpleTrack, SpotifyRequestParams, Track } from './types';

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

  getAuthLink = (redirect: string, scopes: Array<string>) : string => {
    if(!this._auth) {
      this._auth = new Auth(redirect);
    }

    return this._auth.beginAuthorize(this._clientId, scopes);
  }

  getAccessToken = async (code: string, state: string) : Promise<AuthObject | AuthError> => {
    if(!this._auth) {
      return {error: 'data_error', error_description: 'no existing authorization object found, did you mean to call getAuthLink?'};
    }

    try {
      const data = await this._auth.requestTokens(this._clientId, this._clientSecret, code, state);
      if((data as AuthObject).access_token) {
        this._access_data = data as AuthObject;
      }

      return data;
    } catch(error) {
      return {error: error.type, error_description: error.message};
    }
  }

  setAccessToken = (token: AuthObject) : SpotifyAPI => {
    this._access_data = token;
    return this;
  }

  getAlbum = async (id: string) : Promise<Album | Error> => {
    if(this._access_data) {
      return AlbumsEndpoint.getAlbum(id, this._access_data.access_token);
    }
    
    return {status: 0, message: 'access_data not defined'};
  }

  getAlbums = async (ids: Array<string>) : Promise<Array<Album> | Error> => {
    if(this._access_data) {
      return AlbumsEndpoint.getAlbums(ids, this._access_data.access_token);
    }
    
    return {status: 0, message: 'access_data not defined'};
  }

  getAlbumTracks = async (id: string, params?: SpotifyRequestParams) : Promise<Paging<SimpleTrack> | Error> => {
    if(this._access_data) {
      return AlbumsEndpoint.getTracks(id, this._access_data.access_token, params);
    }
    
    return {status: 0, message: 'access_data not defined'};
  }
}