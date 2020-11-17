import Util from '../tools/util';
import { CurrentlyPlaying, CurrentlyPlayingContext, CursorPaging, Device, PlayHistory, SpotifyError, SpotifyRequestParams, SpotifySuccess } from '../types';

export class PlayerEndpoint {
  static getAvailableDevices = async (access_token: string) : Promise<Array<Device> | SpotifyError> => {
    return await Util.get('https://api.spotify.com/v1/me/player/devices', access_token).then(data => {
      if(data.error) {
        return data;
      }

      return data.devices;
    });
  }

  static getCurrentPlayback = async (access_token: string, params?: SpotifyRequestParams) : Promise<CurrentlyPlayingContext | SpotifyError> => {
    return await Util.get('https://api.spotify.com/v1/me/player', access_token, params);
  }

  static getRecentlyPlayed = async (access_token: string, params?: SpotifyRequestParams) : Promise<CursorPaging<PlayHistory> | SpotifyError> => {
    return await Util.get('https://api.spotify.com/v1/me/player/recently-played', access_token, params);
  }

  static getCurrentlyPlaying = async (access_token: string, params?: SpotifyRequestParams) : Promise<CurrentlyPlaying | SpotifyError> => {
    return await Util.get('https://api.spotify.com/v1/me/player/currently-playing', access_token, params);
  }

  static pausePlayback = (access_token: string, params?: SpotifyRequestParams) : void => {
    Util.put('https://api.spotify.com/v1/me/player/pause', access_token, params);
  }
}