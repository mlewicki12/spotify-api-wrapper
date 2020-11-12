
import Axios from 'axios';
import { Album, Error, Paging, PagingParams, SimpleTrack } from '../types';

// need to implement market once I get a grasp on how track relinking works
export class AlbumsEndpoint {
  static getAlbum = async (id: string, access_token: string) : Promise<Album | Error> => {
    return await Axios.get('https://api.spotify.com/v1/albums/' + id, {
      headers: {
        Authorization: 'Bearer ' + access_token
      }
    }).then(response => {
      return response.data;
    }).catch(error => {
      return error.response.data;
    });
  }

  static getAlbumTracks = async (id: string, access_token: string, limit?: number, offset = 0) : Promise<Paging<SimpleTrack> | Error> => {
    const params = new PagingParams();
    let useParams = false;

    if(limit) {
      params.limit = limit;
      params.offset = offset;

      useParams = true;
    }

    return await Axios.get('https://api.spotify.com/v1/albums/' + id + '/tracks', {
      params: useParams && params,
      headers: {
        Authorization: 'Bearer ' + access_token
      }
    }).then(response => {
      return response.data;
    }).catch(error => {
      return error.response.data;
    });
  }

  static getAlbums = async (ids: Array<string>, access_token: string) : Promise<Array<Album>> => {
    const idsString = ids.join(',');
    return await Axios.get('https://api.spotify.com/v1/albums', {
      params: {
        ids: idsString
      },
      headers: {
        Authorization: 'Bearer ' + access_token
      }
    }).then(response => {
      return response.data;
    }).catch(error => {
      return error.response.data;
    });
  }
}