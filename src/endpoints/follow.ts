import Util from "../tools/util";
import { Artist, CursorPaging, SpotifyError, SpotifyRequestParams, SpotifySuccess } from "../types";

export class FollowEndpoint {
  static checkUserFollows = async (ids: Array<string>, access_token: string, params: SpotifyRequestParams) : Promise<Array<boolean> | SpotifyError> => {
    return await Util.get('https://api.spotify.com/v1/me/following/contains', access_token, Object.assign(params, {ids: ids.join(',')}));
  }

  static checkUsersFollowPlaylist = async (id: string, access_token: string, params: SpotifyRequestParams) : Promise<Array<boolean> | SpotifyError> => {
    return await Util.get(`https://api.spotify.com/v1/playlists/${id}/followers/contains`, access_token, params);
  }

  static follow = async (ids: Array<string>, access_token: string, params: SpotifyRequestParams) : Promise<SpotifySuccess | SpotifyError> => {
    return await Util.put(`https://api.spotify.com/v1/me/following?type=${params.type}&ids=${ids.join(',')}`, access_token);
  }

  static followPlaylist = async (id: string, access_token: string, params?: SpotifyRequestParams) : Promise<SpotifySuccess | SpotifyError> => {
    return await Util.put(`https://api.spotify.com/v1/playlists/${id}/followers`, access_token, params);
  }

  static getFollowedArtists = async (access_token: string, params?: SpotifyRequestParams) : Promise<CursorPaging<Artist> | SpotifyError> => {
    return await Util.get('https://api.spotify.com/v1/me/following?type=artist', access_token, params);
  }

  static unfollow = async (ids: Array<string>, access_token: string, params: SpotifyRequestParams) : Promise<SpotifySuccess | SpotifyError> => {
    return await Util.delete(`https://api.spotify.com/v1/me/following?type=${params.type}&ids=${ids.join(',')}`, access_token);
  }

  static unfollowPlaylist = async (id: string, access_token: string) : Promise<SpotifySuccess | SpotifyError> => {
    return await Util.delete(`https://api.spotify.com/v1/playlists/${id}/followers`, access_token);
  }
}