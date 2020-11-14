
import Util from '../tools/util';
import { Episode, SpotifyError, SpotifyRequestParams } from '../types';

export class EpisodesEndpoint {
  static getEpisode = async (id: string, access_token: string, params?: SpotifyRequestParams) : Promise<Episode | SpotifyError> => {
    return await Util.get(`https://api.spotify.com/v1/episodes/${id}`, access_token, params);
  }

  static getEpisodes = async (ids: Array<string>, access_token: string, params?: SpotifyRequestParams) : Promise<Array<Episode> | SpotifyError> => {
    return await Util.get('https://api.spotify.com/v1/episodes', access_token, Object.assign({ids: ids.join(',')}, params)).then(data => {
      if(data.error) {
        return data;
      } else return data.episodes;
    });
  }
}