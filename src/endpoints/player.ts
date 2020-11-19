
import Util from '../tools/util';
import { CurrentlyPlaying, CurrentlyPlayingContext, CursorPaging, Device, PlayHistory, RepeatState, SpotifyError, SpotifyRequestParams, SpotifySuccess } from '../types';

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

  static pause = async (access_token: string, params?: SpotifyRequestParams) : Promise<SpotifySuccess | SpotifyError> => {
    return await Util.put('https://api.spotify.com/v1/me/player/pause', access_token, params);
  }

  static seekPosition = async (position_ms: number, access_token: string, params?: SpotifyRequestParams) : Promise<SpotifySuccess | SpotifyError> => {
    return await Util.put(`https://api.spotify.com/v1/me/player/seek?position_ms=${position_ms}`, access_token, params);
  }

  static setRepeatMode = async (mode: RepeatState, access_token: string, params?: SpotifyRequestParams) : Promise<SpotifySuccess | SpotifyError> => {
    return await Util.put(`https://api.spotify.com/v1/me/player/repeat?state=${mode}`, access_token, params);
  }

  static setVolume = async (volume: number, access_token: string, params?: SpotifyRequestParams) : Promise<SpotifySuccess | SpotifyError> => {
    return await Util.put(`https://api.spotify.com/v1/me/player/volume?volume_percent=${volume}`, access_token, params);
  }

  static nextTrack = async (access_token: string, params?: SpotifyRequestParams) : Promise<SpotifySuccess | SpotifyError> => {
    return await Util.post('https://api.spotify.com/v1/me/player/next', access_token, params);
  }

  static previousTrack = async (access_token: string, params?: SpotifyRequestParams) : Promise<SpotifySuccess | SpotifyError> => {
    return await Util.post('https://api.spotify.com/v1/me/player/previous', access_token, params);
  }

  static play = async (access_token: string, params?: SpotifyRequestParams) : Promise<SpotifySuccess | SpotifyError> => {
    return await Util.put('https://api.spotify.com/v1/me/player/play', access_token, params);
  }

  static setShuffleMode = async (mode: boolean, access_token: string, params?: SpotifyRequestParams) : Promise<SpotifySuccess | SpotifyError> => {
    return await Util.put(`https://api.spotify.com/v1/me/player/shuffle?state=${mode}`, access_token, params);
  }

  static transferPlayback = async (device_id: string, access_token: string, params?: SpotifyRequestParams) : Promise<SpotifySuccess | SpotifyError> => {
    if(!params) {
      params = {};
    }

    params.device_ids = [device_id];
    return await Util.put('https://api.spotify.com/v1/me/player', access_token, params);
  }
}