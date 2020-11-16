
// this is still here as a leftover from the tutorial I did on setting up packages
// leaving it here for now, bc I want to keep the test as a reference
export const Greeter = (name:string) : string => `Hello ${name}`;

import Auth from './auth/auth-code-flow';
import { AlbumsEndpoint } from './endpoints/albums';
import { ArtistsEndpoint } from './endpoints/artists';
import { BrowseEndpoint } from './endpoints/browse';
import { EpisodesEndpoint } from './endpoints/episodes';
import { FollowEndpoint } from './endpoints/follow';
import { LibraryEndpoint } from './endpoints/library';
import { Album, Artist, AuthError, AuthObject, Category, SpotifyError, 
  Paging, SimpleAlbum, SimpleTrack, SpotifyRequestParams, Track, SimplePlaylist, 
  SpotifyRecommendationsObject, Recommendation, Episode, SpotifySuccess, CursorPaging, 
  SavedShow, SavedAlbum, SavedTrack } from './types';

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

  checkUserFollows = async (ids: Array<string>, params: SpotifyRequestParams) : Promise<Array<boolean> | SpotifyError> => {
    if(this._access_data) {
      return FollowEndpoint.checkUserFollows(ids, this._access_data.access_token, params);
    }

    return {status: 0, message: 'access_data not defined'};
  }

  checkUsersFollowPlaylist = async (id: string, params: SpotifyRequestParams) : Promise<Array<boolean> | SpotifyError> => {
    if(this._access_data) {
      return FollowEndpoint.checkUsersFollowPlaylist(id, this._access_data.access_token, params);
    }

    return {status: 0, message: 'access_data not defined'};
  }

  follow = async (ids: Array<string>, params: SpotifyRequestParams) : Promise<SpotifySuccess | SpotifyError> => {
    if(this._access_data) {
      return FollowEndpoint.follow(ids, this._access_data.access_token, params);
    }

    return {status: 0, message: 'access_data not defined'};
  }

  followPlaylist = async (id: string, params?: SpotifyRequestParams) : Promise<SpotifySuccess | SpotifyError> => {
    if(this._access_data) {
      return FollowEndpoint.followPlaylist(id, this._access_data.access_token, params);
    }

    return {status: 0, message: 'access_data not defined'};
  }

  getFollowedArtists = async (params?: SpotifyRequestParams) : Promise<CursorPaging<Artist> | SpotifyError> => {
    if(this._access_data) {
      return FollowEndpoint.getFollowedArtists(this._access_data.access_token, params);
    }

    return {status: 0, message: 'access_data not defined'};
  }

  unfollow = async (ids: Array<string>, params: SpotifyRequestParams) : Promise<SpotifySuccess | SpotifyError> => {
    if(this._access_data) {
      return FollowEndpoint.unfollow(ids, this._access_data.access_token, params);
    }

    return {status: 0, message: 'access_data not defined'};
  }

  unfollowPlaylist = async (id: string) : Promise<SpotifySuccess | SpotifyError> => {
    if(this._access_data) {
      return FollowEndpoint.unfollowPlaylist(id, this._access_data.access_token);
    }

    return {status: 0, message: 'access_data not defined'};
  }

  checkSavedAlbums = async (ids: Array<string>) : Promise<Array<boolean> | SpotifyError> => {
    if(this._access_data) {
      return LibraryEndpoint.checkSavedAlbums(ids, this._access_data.access_token);
    }

    return {status: 0, message: 'access_data not defined'};
  } 

  checkSavedShows = async (ids: Array<string>) : Promise<Array<boolean> | SpotifyError> => {
    if(this._access_data) {
      return LibraryEndpoint.checkSavedShows(ids, this._access_data.access_token);
    }

    return {status: 0, message: 'access_data not defined'};
  } 

  checkSavedTracks = async (ids: Array<string>) : Promise<Array<boolean> | SpotifyError> => {
    if(this._access_data) {
      return LibraryEndpoint.checkSavedTracks(ids, this._access_data.access_token);
    }

    return {status: 0, message: 'access_data not defined'};
  } 

  getSavedAlbums = async (params?: SpotifyRequestParams) : Promise<Paging<SavedAlbum> | SpotifyError> => {
    if(this._access_data) {
      return LibraryEndpoint.getSavedAlbums(this._access_data.access_token, params);
    }

    return {status: 0, message: 'access_data not defined'};
  }

  getSavedShows = async (params?: SpotifyRequestParams) : Promise<Paging<SavedShow> | SpotifyError> => {
    if(this._access_data) {
      return LibraryEndpoint.getSavedShows(this._access_data.access_token, params);
    }

    return {status: 0, message: 'access_data not defined'};
  }

  getSavedTracks = async (params?: SpotifyRequestParams) : Promise<Paging<SavedTrack> | SpotifyError> => {
    if(this._access_data) {
      return LibraryEndpoint.getSavedTracks(this._access_data.access_token, params);
    }

    return {status: 0, message: 'access_data not defined'};
  }

  deleteSavedAlbums = async (ids: Array<string>) : Promise<SpotifySuccess | SpotifyError> => {
    if(this._access_data) {
      return LibraryEndpoint.removeSavedAlbums(ids, this._access_data.access_token);
    }

    return {status: 0, message: 'access_data not defined'};
  }

  deleteSavedShows = async (ids: Array<string>) : Promise<SpotifySuccess | SpotifyError> => {
    if(this._access_data) {
      return LibraryEndpoint.removeSavedShows(ids, this._access_data.access_token);
    }

    return {status: 0, message: 'access_data not defined'};
  }

  deleteSavedTracks = async (ids: Array<string>) : Promise<SpotifySuccess | SpotifyError> => {
    if(this._access_data) {
      return LibraryEndpoint.removeSavedTracks(ids, this._access_data.access_token);
    }

    return {status: 0, message: 'access_data not defined'};
  }

  saveAlbums = async (ids: Array<string>) : Promise<SpotifySuccess | SpotifyError> => {
    if(this._access_data) {
      return LibraryEndpoint.saveAlbums(ids, this._access_data.access_token);
    }

    return {status: 0, message: 'access_data not defined'};
  }

  saveShows = async (ids: Array<string>) : Promise<SpotifySuccess | SpotifyError> => {
    if(this._access_data) {
      return LibraryEndpoint.saveShows(ids, this._access_data.access_token);
    }

    return {status: 0, message: 'access_data not defined'};
  }

  saveTracks = async (ids: Array<string>) : Promise<SpotifySuccess | SpotifyError> => {
    if(this._access_data) {
      return LibraryEndpoint.saveTracks(ids, this._access_data.access_token);
    }

    return {status: 0, message: 'access_data not defined'};
  }
}