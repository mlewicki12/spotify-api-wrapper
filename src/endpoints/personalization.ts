
import Util from '../tools/util';
import { Artist, Paging, SpotifyError, SpotifyRequestParams, Track } from '../types';

export class PersonalizationEndpoint {
  static getTopArtists = async (access_token: string, params?: SpotifyRequestParams) : Promise<Paging<Artist> | SpotifyError> => {
    return await Util.get('https://api.spotify.com/v1/me/top/artists', access_token, params);
  } 

  static getTopTracks = async (access_token: string, params?: SpotifyRequestParams) : Promise<Paging<Track> | SpotifyError> => {
    return await Util.get('https://api.spotify.com/v1/me/top/tracks', access_token, params);
  } 
}