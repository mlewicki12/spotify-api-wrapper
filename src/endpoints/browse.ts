
import Util from '../tools/util';
import { SpotifyRequestParams, Category, SpotifyError, SimplePlaylist, Paging, SimpleAlbum, SpotifyRecommendationsObject, Recommendation } from '../types';

export class BrowseEndpoint {
  static getCategory = async (id: string, access_token: string, params?: SpotifyRequestParams) : Promise<Category | SpotifyError> => {
    return await Util.get(`https://api.spotify.com/v1/browse/categories/${id}`, access_token, params);
  }

  static getCategoryList = async (access_token: string, params?: SpotifyRequestParams) : Promise<Paging<Category> | SpotifyError> => {
    return await Util.get('https://api.spotify.com/v1/browse/categories', access_token, params).then(data => {
      if(data.error) {
        return data;
      } else return data.categories;
    });
  }

  static getCategoryPlaylists = async (id: string, access_token: string, params?: SpotifyRequestParams) : Promise<Paging<SimplePlaylist> | SpotifyError> => {
    return await Util.get(`https://api.spotify.com/v1/browse/categories/${id}/playlists`, access_token, params);
  }

  static getFeaturedPlaylists = async (access_token: string, params?: SpotifyRequestParams) : Promise<Paging<SimplePlaylist> | SpotifyError> => {
    return await Util.get('https://api.spotify.com/v1/browse/featured-playlists', access_token, params).then(data => {
      if(data.error) {
        return data;
      }

      const ret = data.playlists;
      ret.message = data.message;
      return ret;
    });
  }

  static getNewReleases = async (access_token: string, params?: SpotifyRequestParams) : Promise<Paging<SimpleAlbum> | SpotifyError> => {
    return await Util.get('https://api.spotify.com/v1/browse/new-releases', access_token, params).then(data => {
      if(data.error) {
        return data;
      }

      return data.albums;
    });
  }

  static getRecommendations = async (attributes: SpotifyRecommendationsObject, access_token: string, params?: SpotifyRequestParams) 
    : Promise<Recommendation | SpotifyError> => {
    if(!params) {
      params = {};
    }

    Object.assign(params, attributes);
    return await Util.get('https://api.spotify.com/v1/recommendations', access_token, params);
  }
}