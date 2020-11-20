
import Auth from './auth/auth-code-flow';
import { AlbumsEndpoint } from './endpoints/albums';
import { ArtistsEndpoint } from './endpoints/artists';
import { BrowseEndpoint } from './endpoints/browse';
import { EpisodesEndpoint } from './endpoints/episodes';
import { FollowEndpoint } from './endpoints/follow';
import { LibraryEndpoint } from './endpoints/library';
import { PersonalizationEndpoint } from './endpoints/personalization';
import { PlayerEndpoint } from './endpoints/player';
import { PlaylistsEndpoint } from './endpoints/playlists';
import { Album, Artist, AuthError, AuthObject, Category, SpotifyError, 
  Paging, SimpleAlbum, SimpleTrack, SpotifyRequestParams, Track, SimplePlaylist, 
  SpotifyRecommendationsObject, Recommendation, Episode, SpotifySuccess, CursorPaging, 
  SavedShow, SavedAlbum, SavedTrack, Device, CurrentlyPlayingContext, PlayHistory, CurrentlyPlaying, RepeatState, PlaylistDetails, Playlist, Image } from './types';

export enum AuthType {
  AuthorizationCodeFlow
}

export class Spotify {
  private _clientId       : string;
  private _clientSecret   : string;

  private _auth?          : Auth;
  private _access_data?   : AuthObject;

  constructor(id:string, secret:string) {
    this._clientId = id;
    this._clientSecret = secret;
  }

  auth = {
    getLink: (redirect: string, scopes: Array<string>) : string => {
      if(!this._auth) {
        this._auth = new Auth(redirect);
      }

      return this._auth.beginAuthorize(this._clientId, scopes);
    },

    getAccessToken: async (code: string, state: string) : Promise<AuthObject | AuthError> => {
      if(!this._auth) {
        return {error: 'data_error', error_description: 'no existing authorization object found, did you mean to call getAuthLink?'};
      }

      try {
        const data = await this._auth.requestTokens(this._clientId, this._clientSecret, code, state);
        if((data as AuthObject).access_token) {
          this._access_data = data as AuthObject;
        }

        return data;
      } catch(error) {
        return {error: error.type, error_description: error.message};
      }
    },
    
    setAccessToken: (token: AuthObject) : Spotify => {
      this._access_data = token;
      return this;
    }
  }

  albums = {
    get: async (id: string | Array<string>) : Promise<Album | Array<Album> | SpotifyError> => {
      if(this._access_data) {
        if(typeof id === 'string') {
          return AlbumsEndpoint.getAlbum(id, this._access_data.access_token);
        }

        return AlbumsEndpoint.getAlbums(id, this._access_data.access_token);
      }
      
      return {status: 0, message: 'access_data not defined'};
    },

    getTracks: async (id: string, params?: SpotifyRequestParams) : Promise<Paging<SimpleTrack> | SpotifyError> => {
      if(this._access_data) {
        return AlbumsEndpoint.getTracks(id, this._access_data.access_token, params);
      }
      
      return {status: 0, message: 'access_data not defined'};
    }
  }

  artists = {
    get: async (id: string | Array<string>) : Promise<Artist | Array<Artist> | SpotifyError> => {
      if(this._access_data) {
        if(typeof id === 'string') {
          return ArtistsEndpoint.getArtist(id, this._access_data.access_token);
        }

        return ArtistsEndpoint.getArtists(id, this._access_data.access_token);
      }

      return {status: 0, message: 'access_data not defined'};
    },

    getAlbums: async (id: string, params?: SpotifyRequestParams) : Promise<Paging<SimpleAlbum> | SpotifyError> => {
      if(this._access_data) {
        return ArtistsEndpoint.getAlbums(id, this._access_data.access_token, params);
      }

      return {status: 0, message: 'access_data not defined'};
    },

    getTopTracks: async (id: string, country: string) : Promise<Array<Track> | SpotifyError> => {
      if(this._access_data) {
        return ArtistsEndpoint.getTopTracks(id, this._access_data.access_token, country);
      }

      return {status: 0, message: 'access_data not defined'};
    },

    getRelatedArtists: async (id: string) : Promise<Array<Track> | SpotifyError> => {
      if(this._access_data) {
        return ArtistsEndpoint.getRelatedArtists(id, this._access_data.access_token);
      }

      return {status: 0, message: 'access_data not defined'};
    }
  }

  browse = {
    getCategory: async (id: string) : Promise<Category | SpotifyError> => {
      if(this._access_data) {
        return BrowseEndpoint.getCategory(id, this._access_data.access_token);
      }

      return {status: 0, message: 'access_data not defined'};
    },

    getCategoryPlaylists: async (id: string, params?: SpotifyRequestParams) : Promise<Paging<SimplePlaylist> | SpotifyError> => {
      if(this._access_data) {
        return BrowseEndpoint.getCategoryPlaylists(id, this._access_data.access_token, params);
      }

      return {status: 0, message: 'access_data not defined'};
    },

    getCategoryList: async (params?: SpotifyRequestParams) : Promise<Paging<Category> | SpotifyError> => {
      if(this._access_data) {
        return BrowseEndpoint.getCategoryList(this._access_data.access_token, params);
      }

      return {status: 0, message: 'access_data not defined'};
    },

    getFeaturedPlaylists: async (params?: SpotifyRequestParams) : Promise<Paging<SimplePlaylist> | SpotifyError> => {
      if(this._access_data) {
        return BrowseEndpoint.getFeaturedPlaylists(this._access_data.access_token, params);
      }

      return {status: 0, message: 'access_data not defined'};
    },

    getNewReleases: async (params?: SpotifyRequestParams) : Promise<Paging<SimpleAlbum> | SpotifyError> => {
      if(this._access_data) {
        return BrowseEndpoint.getNewReleases(this._access_data.access_token, params);
      }

      return {status: 0, message: 'access_data not defined'};
    },

    getRecommendations: async (attributes: SpotifyRecommendationsObject, params?: SpotifyRequestParams) : Promise<Recommendation | SpotifyError> => {
      if(this._access_data) {
        return BrowseEndpoint.getRecommendations(attributes, this._access_data.access_token, params);
      }

      return {status: 0, message: 'access_data not defined'};
    }
  }

  episodes = {
    get: async (id: string | Array<string>, params?: SpotifyRequestParams) : Promise<Episode | Array<Episode> | SpotifyError> => {
      if(this._access_data) {
        if(typeof id === 'string') {
          return EpisodesEndpoint.getEpisode(id, this._access_data.access_token, params);
        }

        return EpisodesEndpoint.getEpisodes(id, this._access_data.access_token, params);
      }

      return {status: 0, message: 'access_data not defined'};
    }
  }

  follow = {
    checkFollow: async (ids: Array<string>, params: SpotifyRequestParams) : Promise<Array<boolean> | SpotifyError> => {
      if(this._access_data) {
        return FollowEndpoint.checkUserFollows(ids, this._access_data.access_token, params);
      }

      return {status: 0, message: 'access_data not defined'};
    },

    checkUsersFollowPlaylist: async (id: string, params: SpotifyRequestParams) : Promise<Array<boolean> | SpotifyError> => {
      if(this._access_data) {
        return FollowEndpoint.checkUsersFollowPlaylist(id, this._access_data.access_token, params);
      }

      return {status: 0, message: 'access_data not defined'};
    },

    followArtistOrUser: async (ids: Array<string>, params: SpotifyRequestParams) : Promise<SpotifySuccess | SpotifyError> => {
      if(this._access_data) {
        return FollowEndpoint.follow(ids, this._access_data.access_token, params);
      }

      return {status: 0, message: 'access_data not defined'};
    },

    followPlaylist: async (id: string, params?: SpotifyRequestParams) : Promise<SpotifySuccess | SpotifyError> => {
      if(this._access_data) {
        return FollowEndpoint.followPlaylist(id, this._access_data.access_token, params);
      }

      return {status: 0, message: 'access_data not defined'};
    },

    getFollowedArtists: async (params?: SpotifyRequestParams) : Promise<CursorPaging<Artist> | SpotifyError> => {
      if(this._access_data) {
        return FollowEndpoint.getFollowedArtists(this._access_data.access_token, params);
      }

      return {status: 0, message: 'access_data not defined'};
    },

    unfollowArtistOrUser: async (ids: Array<string>, params: SpotifyRequestParams) : Promise<SpotifySuccess | SpotifyError> => {
      if(this._access_data) {
        return FollowEndpoint.unfollow(ids, this._access_data.access_token, params);
      }

      return {status: 0, message: 'access_data not defined'};
    },

    unfollowPlaylist: async (id: string) : Promise<SpotifySuccess | SpotifyError> => {
      if(this._access_data) {
        return FollowEndpoint.unfollowPlaylist(id, this._access_data.access_token);
      }

      return {status: 0, message: 'access_data not defined'};
    }
  }

  library = {
    checkSaved: async (ids: Array<string>, type: string) : Promise<Array<boolean> | SpotifyError> => {
      if(!this._access_data) {
        return {status: 0, message: 'access_data not defined'};
      }

      switch(type) {
      case 'albums':
        return LibraryEndpoint.checkSavedAlbums(ids, this._access_data.access_token);

      case 'shows':
        return LibraryEndpoint.checkSavedShows(ids, this._access_data.access_token);

      case 'tracks':
        return LibraryEndpoint.checkSavedTracks(ids, this._access_data.access_token);

      default:
        return {status: 0, message: `type ${type} is not a valid type`};
      }
    },

    get: async (type: string, params?: SpotifyRequestParams) : Promise<Paging<SavedAlbum | SavedShow | SavedTrack> | SpotifyError> => {
      if(!this._access_data) {
        return {status: 0, message: 'access_data not defined'};
      }

      switch(type) {
      case 'albums':
        return LibraryEndpoint.getSavedAlbums(this._access_data.access_token, params);

      case 'shows':
        return LibraryEndpoint.getSavedShows(this._access_data.access_token, params);

      case 'tracks':
        return LibraryEndpoint.getSavedTracks(this._access_data.access_token, params);

      default:
        return {status: 0, message: `type ${type} is not a valid type`};
      }
    },

    deleteSaved: async (ids: Array<string>, type: string) : Promise<SpotifySuccess | SpotifyError> => {
      if(!this._access_data) {
        return {status: 0, message: 'access_data not defined'};
      }

      switch(type) {
      case 'albums':
        return LibraryEndpoint.removeSavedAlbums(ids, this._access_data.access_token);

      case 'shows':
        return LibraryEndpoint.removeSavedShows(ids, this._access_data.access_token);

      case 'tracks':
        return LibraryEndpoint.removeSavedTracks(ids, this._access_data.access_token);

      default:
        return {status: 0, message: `type ${type} is not a valid type`};
      }
    },

    save: async (ids: Array<string>, type: string) : Promise<SpotifySuccess | SpotifyError> => {
      if(!this._access_data) {
        return {status: 0, message: 'access_data not defined'};
      }

      switch(type) {
      case 'albums':
        return LibraryEndpoint.saveAlbums(ids, this._access_data.access_token);

      case 'shows':
        return LibraryEndpoint.saveShows(ids, this._access_data.access_token);

      case 'tracks':
        return LibraryEndpoint.saveTracks(ids, this._access_data.access_token);

      default:
        return {status: 0, message: `type ${type} is not a valid type`};
      }
    }
  }

  personalization = {
    getTopArtists: async (params?: SpotifyRequestParams) : Promise<Paging<Artist> | SpotifyError> => {
      if(this._access_data) {
        return PersonalizationEndpoint.getTopArtists(this._access_data.access_token, params);
      }

      return {status: 0, message: 'access_data not defined'};
    },

    getTopTracks: async (params?: SpotifyRequestParams) : Promise<Paging<Track> | SpotifyError> => {
      if(this._access_data) {
        return PersonalizationEndpoint.getTopTracks(this._access_data.access_token, params);
      }

      return {status: 0, message: 'access_data not defined'};
    }
  }

  player = {
    getAvailableDevices: async () : Promise<Array<Device> | SpotifyError> => {
      if(this._access_data) {
        return PlayerEndpoint.getAvailableDevices(this._access_data.access_token);
      }

      return {status: 0, message: 'access_data not defined'};
    },

    getCurrentPlayback: async (params?: SpotifyRequestParams) : Promise<CurrentlyPlayingContext | SpotifyError> => {
      if(this._access_data) {
        return PlayerEndpoint.getCurrentPlayback(this._access_data.access_token, params);
      }

      return {status: 0, message: 'access_data not defined'};
    },

    getRecentlyPlayed: async (params?: SpotifyRequestParams) : Promise<CursorPaging<PlayHistory> | SpotifyError> => {
      if(this._access_data) {
        return PlayerEndpoint.getRecentlyPlayed(this._access_data.access_token, params);
      }

      return {status: 0, message: 'access_data not defined'};
    },

    getCurrentlyPlaying: async (params?: SpotifyRequestParams) : Promise<CurrentlyPlaying | SpotifyError> => {
      if(this._access_data) {
        return PlayerEndpoint.getCurrentlyPlaying(this._access_data.access_token, params);
      }

      return {status: 0, message: 'access_data not defined'};
    },

    pause: async (params?: SpotifyRequestParams) : Promise<SpotifySuccess | SpotifyError> => {
      if(this._access_data) {
        return PlayerEndpoint.pause(this._access_data.access_token, params);
      }

      return {status: 0, message: 'access_data not defined'};
    },

    seekPosition: async (position_ms: number, params?: SpotifyRequestParams) : Promise<SpotifySuccess | SpotifyError> => {
      if(this._access_data) {
        return PlayerEndpoint.seekPosition(position_ms, this._access_data.access_token, params);
      }

      return {status: 0, message: 'access_data not defined'};
    },

    setRepeatMode: async (mode: RepeatState, params?: SpotifyRequestParams) : Promise<SpotifySuccess | SpotifyError> => {
      if(this._access_data) {
        return PlayerEndpoint.setRepeatMode(mode, this._access_data.access_token, params);
      }

      return {status: 0, message: 'access_data not defined'};
    },

    setVolume: async (volume: number, params?: SpotifyRequestParams) : Promise<SpotifySuccess | SpotifyError> => {
      if(this._access_data) {
        return PlayerEndpoint.setVolume(volume, this._access_data.access_token, params);
      }

      return {status: 0, message: 'access_data not defined'};
    },

    nextTrack: async (params?: SpotifyRequestParams) : Promise<SpotifySuccess | SpotifyError> => {
      if(this._access_data) {
        return PlayerEndpoint.nextTrack(this._access_data.access_token, params);
      }

      return {status: 0, message: 'access_data not defined'};
    },

    previousTrack: async (params?: SpotifyRequestParams) : Promise<SpotifySuccess | SpotifyError> => {
      if(this._access_data) {
        return PlayerEndpoint.previousTrack(this._access_data.access_token, params);
      }

      return {status: 0, message: 'access_data not defined'};
    },

    play: async (params?: SpotifyRequestParams) : Promise<SpotifySuccess | SpotifyError> => {
      if(this._access_data) {
        return PlayerEndpoint.play(this._access_data.access_token, params);
      }

      return {status: 0, message: 'access_data not defined'};
    },

    setShuffleMode: async (mode: boolean, params?: SpotifyRequestParams) : Promise<SpotifySuccess | SpotifyError> => {
      if(this._access_data) {
        return PlayerEndpoint.setShuffleMode(mode, this._access_data.access_token, params);
      }

      return {status: 0, message: 'access_data not defined'};
    },

    transferPlayback: async (device_id: string, params?: SpotifyRequestParams) : Promise<SpotifySuccess | SpotifyError> => {
      if(this._access_data) {
        return PlayerEndpoint.transferPlayback(device_id, this._access_data.access_token, params);
      }

      return {status: 0, message: 'access_data not defined'};
    }
  }

  playlists = {
    addItems: async (playlist_id: string, uris: Array<string>, params?: SpotifyRequestParams) : Promise<SpotifySuccess | SpotifyError> => {
      if(this._access_data) {
        return PlaylistsEndpoint.addItems(playlist_id, this._access_data.access_token, uris, params);
      }

      return {status: 0, message: 'access_data not defined'};
    },

    changeDetails: async (playlist_id: string, details: PlaylistDetails) : Promise<SpotifySuccess | SpotifyError> => {
      if(this._access_data) {
        return PlaylistsEndpoint.changeDetails(playlist_id, this._access_data.access_token, details);
      }

      return {status: 0, message: 'access_data not defined'};
    },

    create: async (user_id: string, details: PlaylistDetails) : Promise<Playlist | SpotifyError> => {
      if(this._access_data) {
        return PlaylistsEndpoint.create(user_id, this._access_data.access_token, details);
      }

      return {status: 0, message: 'access_data not defined'};
    },

    getUserPlaylist: async (paramsOrId?: string | SpotifyRequestParams, params?: SpotifyRequestParams) : Promise<Paging<SimplePlaylist> | SpotifyError> => {
      if(this._access_data) {
        return PlaylistsEndpoint.getUserPlaylist(this._access_data.access_token, paramsOrId, params);
      }

      return {status: 0, message: 'access_data not defined'};
    },

    get: async (playlist_id: string, params?: SpotifyRequestParams) : Promise<Playlist | SpotifyError> => {
      if(this._access_data) {
        return PlaylistsEndpoint.get(playlist_id, this._access_data.access_token, params);
      }

      return {status: 0, message: 'access_data not defined'};
    },

    getCoverImage: async (playlist_id: string) : Promise<Array<Image> | SpotifyError> => {
      if(this._access_data) {
        return PlaylistsEndpoint.getCoverImage(playlist_id, this._access_data.access_token);
      }

      return {status: 0, message: 'access_data not defined'};
    },

    getTracks: async (playlist_id: string, params?: SpotifyRequestParams) : Promise<Paging<Episode | Track> | SpotifyError> => {
      if(this._access_data) {
        return PlaylistsEndpoint.getTracks(playlist_id, this._access_data.access_token, params);
      }

      return {status: 0, message: 'access_data not defined'};
    }
  }
}