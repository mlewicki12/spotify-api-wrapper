
import Util from '../tools/util';
import { Episode, Image, Paging, Playlist, PlaylistDetails, SimplePlaylist, SpotifyError, SpotifyRequestParams, SpotifySuccess, Track } from '../types';

export class PlaylistsEndpoint {
  static addItems = async (playlist_id: string, access_token: string, uris: Array<string>, params?: SpotifyRequestParams) : Promise<SpotifySuccess | SpotifyError> => {
    return Util.post(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, access_token, Object.assign({uris: uris}, params || {}));
  }

  static changeDetails = async (playlist_id: string, access_token: string, details: PlaylistDetails) : Promise<SpotifySuccess | SpotifyError> => {
    return Util.put(`https://api.spotify.com/v1/playlists/${playlist_id}`, access_token, details);
  }

  static create = async (user_id: string, access_token: string, details: PlaylistDetails) : Promise<Playlist | SpotifyError> => {
    return Util.post(`https://api.spotify.com/v1/users/${user_id}/playlists`, access_token, details);
  }

  static getUserPlaylist = async (access_token: string, paramsOrId?: SpotifyRequestParams | string, params?: SpotifyRequestParams) : Promise<Paging<SimplePlaylist> | SpotifyError> => {
    if(typeof paramsOrId === 'string') {
      return Util.get(`https://api.spotify.com/v1/users/${paramsOrId}/playlists`, access_token, params);
    }

    return Util.get('https://api.spotify.com/v1/me/playlists', access_token, paramsOrId as SpotifyRequestParams);
  }

  static get = async (playlist_id: string, access_token: string, params?: SpotifyRequestParams) : Promise<Playlist | SpotifyError> => {
    return Util.get(`https://api.spotify.com/v1/playlists/${playlist_id}`, access_token, params);
  }

  static getCoverImage = async (playlist_id: string, access_token: string) : Promise<Array<Image> | SpotifyError> => {
    return Util.get(`https://api.spotify.com/v1/playlists/${playlist_id}/images`, access_token);
  }

  static getTracks = async (playlist_id: string, access_token: string, params?: SpotifyRequestParams) : Promise<Paging<Track | Episode>  | SpotifyError> => {
    return Util.get(`https://api.spotify.com/v1/playlists/${playlist_id}/tracks`, access_token, params);
  }
}