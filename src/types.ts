
export class SimpleAlbum {
  album_group?              : string;
  album_type!               : string;
  artists!                  : Array<SimpleArtist>;
  available_markets!        : Array<string>;
  external_urls!            : any;
  href!                     : string;
  id!                       : string;
  images!                   : Array<Image>;
  name!                     : string;
  release_date!             : string;
  release_date_precision!   : string;
  restrictions!             : Restriction;
  type!                     : string;
  uri!                      : string;
}

export class Album {
  // it might be bad practice to ! all of them, but I'm not making a 17 argument constructor
  // plus the code shouldn't need to create an album object, it just comes from spotify
  album_type!               : string;
  artists!                  : Array<SimpleArtist>; 
  available_markets!        : Array<string>;
  copyrights!               : Array<Copyright>; 
  external_ids!             : any; // have to use any here bc spotify doesnt give a strict definition
  external_urls!            : any; // same here
  genres!                   : Array<string>;
  href!                     : string;
  id!                       : string;
  image!                    : Array<Image>; 
  label!                    : string;
  name!                     : string;
  popularity!               : number;
  release_date!             : string;
  release_date_precision!   : string;
  tracks!                   : Paging<Track>; 
  type!                     : string;
  uri!                      : string;
}

export class SimpleArtist {
  external_urls!  : any;
  href!           : string;
  id!             : string;
  name!           : string;
  type!           : string;
  uri!            : string;
}

export class Artist {
  external_urls!  : any;
  followers!      : Followers; 
  genres!         : Array<string>;
  href!           : string;
  id!             : string;
  images!         : Array<Image>;
  name!           : string;
  popularity!     : number;
  type!           : string;
  uri!            : string;
}

export class SimplePlaylist {
  collaborative!  : boolean;
  description!    : string;
  external_urls!  : any;
  href!           : string;
  id!             : string;
  images!         : Array<Image>;
  name!           : string;
  owner!          : PublicUser;
  public!         : boolean;
  snapshot_id!    : string;
  tracks!         : PlaylistTracks;
  type!           : string;
  uri!            : string;
}

export class PlaylistTracks {
  total!    : number;
  href!     : string;
}

export class PublicUser {
  display_name!   : string;
  external_urls!  : any;
  followers!      : Followers;
  href!           : string;
  id!             : string;
  images!         : Array<Image>;
  type!           : string;
  uri!            : string;
}

export class AuthObject {
  access_token!   : string;
  token_type!     : string;
  refresh_token!  : string;
  scope!          : string;
  expires_in!     : number;
}

export class Category {
  href!   : string;
  icons!  : Array<Image>;
  id!     : string;
  name!   : string;
}

export class Copyright {
  text!   : string;
  type!   : string;
}

export class AuthError {
  error!: string;
  error_description!: string;
}

export class SpotifyError {
  status!: number;
  message!: string;
}

export class Followers {
  href!   : string;
  total!  : number;
}

export class Image {
  height!   : number;
  width!    : number;
  url!      : string;
}

export class Paging<T> {
  message?    : string;
  href!       : string;
  items!      : Array<T>;
  limit!      : number;
  next!       : string;
  offset!     : number;
  previous!   : string;
  total!      : number;
}

export class Restriction {
  reason!: string;
}

export class SimpleTrack {
  artists!            : Array<SimpleArtist>;
  available_markets!  : Array<string>;
  disc_number!        : number;
  duration_ms!        : number;
  explicit!           : boolean;
  external_urls!      : any;
  href!               : string;
  id!                 : string;
  is_playable!        : boolean;
  linked_from!        : TrackLink;
  restrictions!       : Restriction;
  name!               : string;
  preview_url!        : string;
  track_number!       : number;
  type!               : string;
  uri!                : string;
  is_local!           : boolean;
}

export class Track {
  album!              : SimpleAlbum;
  artists!            : Array<SimpleArtist>;
  available_markets!  : Array<string>;
  disc_number!        : number;
  duration_ms!        : number;
  explicit!           : boolean;
  external_ids!       : any;
  external_urls!      : any;
  href!               : string;
  id!                 : string;
  is_playable!        : boolean;
  linked_from!        : TrackLink;
  restriction!        : Restriction;
  name!               : string;
  popularity!         : number;
  preview_url!        : string;
  track_number!       : number;
  type!               : string;
  uri!                : string;
  is_local!           : boolean;
}

export class TrackLink {
  external_urls!      : any;
  href!               : string;
  id!                 : string;
  type!               : string;
  uri!                : string;
}

export class Recommendation {
  seeds!  : Array<RecommendationSeed>;
  tracks! : Array<SimpleTrack>;
}

export class RecommendationSeed {
  afterFilteringSize!   : number;
  afterRelinkingSize!   : number;
  href!                 : string;
  id!                   : string;
  initialPoolSize!      : number;
  type!                 : string;
}

export class SpotifyRequestParams {
  include_groups?   : Array<string>;
  country?          : string;
  limit?            : number;
  offset?           : number;
  locale?           : string;
  ids?              : string;
  timestamp?        : string;
}

export class SpotifyRecommendationsObject {
  max_acousticness?         : number;
  min_acousticness?         : number;
  target_acousticness?      : number;

  max_danceability?         : number;
  min_danceability?         : number;
  target_danceability?      : number;

  max_duration_ms?          : number;
  min_duration_ms?          : number;
  target_duration_ms?       : number;

  max_energy?               : number;
  min_energy?               : number;
  target_energy?            : number;

  max_instrumentalness?     : number;
  min_instrumentalness?     : number;
  target_instrumentalness?  : number;

  max_key?                  : number;
  min_key?                  : number;
  target_key?               : number;
  
  max_liveness?             : number;
  min_liveness?             : number;
  target_liveness?          : number;

  max_loudness?             : number;
  min_loudness?             : number;
  target_loudness?          : number;

  max_mode?                 : number;
  min_mode?                 : number;
  target_mode?              : number;

  max_popularity?           : number;
  min_popularity?           : number;
  target_popularity?        : number;

  max_speechiness?          : number;
  min_speechiness?          : number;
  target_speechiness?       : number;

  max_tempo?                : number;
  min_tempo?                : number;
  target_tempo?             : number;

  max_time_signature?       : number;
  min_time_signature?       : number;
  target_time_signature?    : number;

  max_valence?              : number;
  min_valence?              : number;
  target_valence?           : number;

  seed_artists?             : string;
  seed_genres?              : string;
  seed_tracks?              : string;
}

/**
 * helper class for building a SpotifyRecommendationsObject
 */
export class SpotifyRecommendationsBuilder {
  seed_artists?     : Array<string>;
  seed_genres?      : Array<string>;
  seed_tracks?      : Array<string>;

  // this lets me manipulate strings as keys
  private _return_object: {
    [key: string]: number | undefined;
  };

  private _keys = ['acousticness', 'danceability', 'duration_ms', 'energy',
    'instrumentalness', 'key', 'liveness', 'loudness',
    'mode', 'popularity', 'speechiness', 'tempo',
    'time_signature', 'valence'];

  constructor(values?: {[key: string] : number | Array<number>}) {
    this._return_object = {};

    if(values) {
      this._keys.forEach(key => {
        const element = values[key];
        if(typeof element === 'number') {
          this._return_object[`target_${key}`] = element;
        } else {          
          this._return_object[`min_${key}`] = element[0];
          this._return_object[`max_${key}`] = element[1];
        }
      });

    }
  }

  /**
   * set an attribute
   * 
   * @param key - the name of the attribute you want to set
   * @param value - what value to set the attribute to
   * @param value_max - (optional) sets the first value to be min value and the second one to be max
   */
  set = (key: string, value: number, value_max?: number) : SpotifyRecommendationsBuilder => {
    if(value_max) {
      this._return_object[`min_${key}`] = value;
      this._return_object[`max_${key}`] = value_max;
      return this;
    }

    this._return_object[`target_${key}`] = value;
    return this;
  }

  get = () : SpotifyRecommendationsObject => {
    return this._return_object;
  }
}