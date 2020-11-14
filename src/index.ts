
// this is still here as a leftover from the tutorial I did on setting up packages
// leaving it here for now, bc I want to keep the test as a reference
export const Greeter = (name:string) : string => `Hello ${name}`;

import Auth from './auth/auth-code-flow';
import { AlbumsEndpoint } from './endpoints/albums';
import { ArtistsEndpoint } from './endpoints/artists';
import { BrowseEndpoint } from './endpoints/browse';
import { EpisodesEndpoint } from './endpoints/episodes';
import { Album, Artist, AuthError, AuthObject, Category, SpotifyError, Paging, SimpleAlbum, SimpleTrack, SpotifyRequestParams, Track, SimplePlaylist, SpotifyRecommendationsObject, Recommendation, Episode } from './types';

export enum AuthType {
  AuthorizationCodeFlow
}

export class Spotify {
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

  setAccessToken = (token: AuthObject) : Spotify => {
    this._access_data = token;
    return this;
  }

  getAlbum = async (id: string) : Promise<Album | SpotifyError> => {
    if(this._access_data) {
      return AlbumsEndpoint.getAlbum(id, this._access_data.access_token);
    }
    
    return {status: 0, message: 'access_data not defined'};
  }

  getAlbums = async (ids: Array<string>) : Promise<Array<Album> | SpotifyError> => {
    if(this._access_data) {
      return AlbumsEndpoint.getAlbums(ids, this._access_data.access_token);
    }
    
    return {status: 0, message: 'access_data not defined'};
  }

  getAlbumTracks = async (id: string, params?: SpotifyRequestParams) : Promise<Paging<SimpleTrack> | SpotifyError> => {
    if(this._access_data) {
      return AlbumsEndpoint.getTracks(id, this._access_data.access_token, params);
    }
    
    return {status: 0, message: 'access_data not defined'};
  }

  getArtist = async (id: string) : Promise<Artist | SpotifyError> => {
    if(this._access_data) {
      return ArtistsEndpoint.getArtist(id, this._access_data.access_token);
    }

    return {status: 0, message: 'access_data not defined'};
  }

  getArtists = async (ids: Array<string>) : Promise<Array<Artist> | SpotifyError> => {
    if(this._access_data) {
      return ArtistsEndpoint.getArtists(ids, this._access_data.access_token);
    }

    return {status: 0, message: 'access_data not defined'};
  }

  getArtistAlbums = async (id: string, params?: SpotifyRequestParams) : Promise<Paging<SimpleAlbum> | SpotifyError> => {
    if(this._access_data) {
      return ArtistsEndpoint.getAlbums(id, this._access_data.access_token, params);
    }

    return {status: 0, message: 'access_data not defined'};
  }

  getArtistTopTracks = async (id: string, country: string) : Promise<Array<Track> | SpotifyError> => {
    if(this._access_data) {
      return ArtistsEndpoint.getTopTracks(id, this._access_data.access_token, country);
    }

    return {status: 0, message: 'access_data not defined'};
  }

  getRelatedArtists = async (id: string) : Promise<Array<Track> | SpotifyError> => {
    if(this._access_data) {
      return ArtistsEndpoint.getRelatedArtists(id, this._access_data.access_token);
    }

    return {status: 0, message: 'access_data not defined'};
  }

  getCategory = async (id: string) : Promise<Category | SpotifyError> => {
    if(this._access_data) {
      return BrowseEndpoint.getCategory(id, this._access_data.access_token);
    }

    return {status: 0, message: 'access_data not defined'};
  }

  getCategoryPlaylists = async (id: string, params?: SpotifyRequestParams) : Promise<Paging<SimplePlaylist> | SpotifyError> => {
    if(this._access_data) {
      return BrowseEndpoint.getCategoryPlaylists(id, this._access_data.access_token, params);
    }

    return {status: 0, message: 'access_data not defined'};
  }

  getCategoryList = async (params?: SpotifyRequestParams) : Promise<Paging<Category> | SpotifyError> => {
    if(this._access_data) {
      return BrowseEndpoint.getCategoryList(this._access_data.access_token, params);
    }

    return {status: 0, message: 'access_data not defined'};
  }

  getFeaturedPlaylists = async (params?: SpotifyRequestParams) : Promise<Paging<SimplePlaylist> | SpotifyError> => {
    if(this._access_data) {
      return BrowseEndpoint.getFeaturedPlaylists(this._access_data.access_token, params);
    }

    return {status: 0, message: 'access_data not defined'};
  }

  getNewReleases = async (params?: SpotifyRequestParams) : Promise<Paging<SimpleAlbum> | SpotifyError> => {
    if(this._access_data) {
      return BrowseEndpoint.getNewReleases(this._access_data.access_token, params);
    }

    return {status: 0, message: 'access_data not defined'};
  }

  getRecommendations = async (attributes: SpotifyRecommendationsObject, params?: SpotifyRequestParams) : Promise<Recommendation | SpotifyError> => {
    if(this._access_data) {
      return BrowseEndpoint.getRecommendations(attributes, this._access_data.access_token, params);
    }

    return {status: 0, message: 'access_data not defined'};
  }

  getEpisode = async (id: string, params?: SpotifyRequestParams) : Promise<Episode | SpotifyError> => {
    if(this._access_data) {
      return EpisodesEndpoint.getEpisode(id, this._access_data.access_token, params);
    }

    return {status: 0, message: 'access_data not defined'};
  }

  getEpisodes = async (ids: Array<string>, params?: SpotifyRequestParams) : Promise<Array<Episode> | SpotifyError> => {
    if(this._access_data) {
      return EpisodesEndpoint.getEpisodes(ids, this._access_data.access_token, params);
    }

    return {status: 0, message: 'access_data not defined'};
  }
}