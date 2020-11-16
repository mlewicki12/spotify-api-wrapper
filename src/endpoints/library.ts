
import Util from '../tools/util';
import { SavedAlbum, Paging, SpotifyError, SpotifyRequestParams, SavedShow, SavedTrack, SpotifySuccess } from '../types';

export class LibraryEndpoint {
  static checkSavedAlbums = async (ids: Array<string>, access_token: string) : Promise<Array<boolean> | SpotifyError> => {
    return await Util.get('https://api.spotify.com/v1/me/albums/contains', access_token, {ids: ids.join(',')});
  }

  static checkSavedShows = async (ids: Array<string>, access_token: string) : Promise<Array<boolean> | SpotifyError> => {
    return await Util.get('https://api.spotify.com/v1/me/shows/contains', access_token, {ids: ids.join(',')});
  }
  
  static checkSavedTracks = async (ids: Array<string>, access_token: string) : Promise<Array<boolean> | SpotifyError> => {
    return await Util.get('https://api.spotify.com/v1/me/tracks/contains', access_token, {ids: ids.join(',')});
  }
 
  static getSavedAlbums = async (access_token: string, params?: SpotifyRequestParams) : Promise<Paging<SavedAlbum> | SpotifyError> => {
    return await Util.get('https://api.spotify.com/v1/me/albums', access_token, params);
  }

  static getSavedShows = async (access_token: string, params?: SpotifyRequestParams) : Promise<Paging<SavedShow> | SpotifyError> => {
    return await Util.get('https://api.spotify.com/v1/me/shows', access_token, params);
  }

  static getSavedTracks = async (access_token: string, params?: SpotifyRequestParams) : Promise<Paging<SavedTrack> | SpotifyError> => {
    return await Util.get('https://api.spotify.com/v1/me/tracks', access_token, params);
  }

  static removeSavedAlbums = async (ids: Array<string>, access_token: string) : Promise<SpotifySuccess | SpotifyError> => {
    return await Util.delete('https://api.spotify.com/v1/me/albums', access_token, {ids: ids});
  }

  static removeSavedShows = async (ids: Array<string>, access_token: string) : Promise<SpotifySuccess | SpotifyError> => {
    return await Util.delete('https://api.spotify.com/v1/me/shows', access_token, {ids: ids});
  }

  static removeSavedTracks = async (ids: Array<string>, access_token: string) : Promise<SpotifySuccess | SpotifyError> => {
    return await Util.delete('https://api.spotify.com/v1/me/tracks', access_token, {ids: ids});
  }

  static saveAlbums = async (ids: Array<string>, access_token: string) : Promise<SpotifySuccess | SpotifyError> => {
    return await Util.put('https://api.spotify.com/v1/me/albums', access_token, {ids: ids});
  }

  static saveShows = async (ids: Array<string>, access_token: string) : Promise<SpotifySuccess | SpotifyError> => {
    return await Util.put('https://api.spotify.com/v1/me/shows', access_token, {ids: ids});
  }

  static saveTracks = async (ids: Array<string>, access_token: string) : Promise<SpotifySuccess | SpotifyError> => {
    return await Util.put('https://api.spotify.com/v1/me/tracks', access_token, {ids: ids});
  }
}