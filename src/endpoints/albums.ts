
import Util from '../tools/util';
import { Album, SpotifyError, Paging, SimpleTrack, SpotifyRequestParams } from '../types';

// need to implement market once I get a grasp on how track relinking works
export class AlbumsEndpoint {
  static getAlbum = async (id: string, access_token: string) : Promise<Album | SpotifyError> => {
    return await Util.get(`https://api.spotify.com/v1/albums/${id}`, access_token);
  }

  static getAlbums = async (ids: Array<string>, access_token: string) : Promise<Array<Album> | SpotifyError> => {
    return await Util.get('https://api.spotify.com/v1/albums', access_token, {ids: ids.join(',')}).then(data => {
      if(data.error) {
        return data;
      } else return data.albums;
    });
  }

  static getTracks = async (id: string, access_token: string, params?: SpotifyRequestParams) : Promise<Paging<SimpleTrack> | SpotifyError> => {
    return await Util.get(`https://api.spotify.com/v1/albums/${id}/tracks`, access_token, params);
  }
}