
import Util from '../tools/util';
import { Artist, SpotifyRequestParams, SpotifyError, Paging, SimpleAlbum, Track } from '../types';

export class ArtistsEndpoint {
  static getArtist = async (id: string, access_token: string) : Promise<Artist | SpotifyError> => {
    return await Util.get(`https://api.spotify.com/v1/artists/${id}`, access_token);
  }

  static getArtists = async (ids: Array<string>, access_token: string) : Promise<Array<Artist> | SpotifyError> => {
    return await Util.get('https://api.spotify.com/v1/artists', access_token, {ids: ids.join(',')}).then(data => {
      if(data.error) {
        return data;
      } else return data.artists;
    });
  }

  static getAlbums = async (id: string, access_token: string, params?: SpotifyRequestParams) : Promise<Paging<SimpleAlbum> | SpotifyError> => {
    return await Util.get(`https://api.spotify.com/v1/artists/${id}/albums`, access_token, params);
  }

  static getTopTracks = async (id: string, access_token: string, country: string) : Promise<Array<Track> | SpotifyError> => {
    return await Util.get(`https://api.spotify.com/v1/artists/${id}/top-tracks`, access_token, {country: country}).then(data => {
      if(data.error) {
        return data;
      } else return data.tracks;
    });
  }

  static getRelatedArtists = async (id: string, access_token: string) : Promise<Array<Track> | SpotifyError> => {
    return await Util.get(`https://api.spotify.com/v1/artists/${id}/related-artists`, access_token).then(data => {
      if(data.error) {
        return data;
      } else return data.artists;
    });
  }
}