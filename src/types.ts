
export class SavedAlbum {
  added_at! : string;
  album!    : Album;
}

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

export class Disallows {
  interrupting_playback?   : boolean;
  pausing?                 : boolean;
  resuming?                : boolean;
  seeking?                 : boolean;
  skipping_next?           : boolean;
  skipping_prev?           : boolean;
  toggling_repeat_context? : boolean;
  toggling_shuffle?        : boolean;
  toggling_repeat_track?   : boolean;
  transferring_playback?   : boolean;  
}

export class Actions {
  disallows!: Disallows;
}

export class Context {
  uri!           : string;
  href!          : string;
  external_urls! : any;
  type!          : string;
}

export enum ContextType {
  Artist   = 'artist',
  Playlist = 'playlist',
  Album    = 'album'
}

export enum CurrentlyPlayingType {
  Track   = 'track',
  Episode = 'episode',
  Ad      = 'ad',
  Unknown = 'unknown'
}

export enum RepeatState {
  Off     = 'off',
  Track   = 'track',
  Context = 'context'
}

export class CurrentlyPlaying {
  context!                : Context;
  timestamp!              : number;
  progress_ms!            : number;
  is_playing!             : boolean;
  item!                   : Track | Episode;
  currently_playing_type! : CurrentlyPlayingType;
  actions!                : Actions;
}

export class CurrentlyPlayingContext {
  device!                 : Device;
  repeat_state!           : RepeatState;
  shuffle_state!          : boolean;
  context?                : Context;
  timestamp!              : number;
  progress_ms?            : number;
  is_playing!             : boolean;
  item!                   : Track | Episode;
  currently_playing_type! : CurrentlyPlayingType;
  actions!                : Actions;
}

export enum DeviceType {
  Computer    = 'Computer',
  Tablet      = 'Tablet',
  Smartphone  = 'Smartphone',
  Speaker     = 'Speaker',
  TV          = 'TV',
  AVR         = 'AVR',
  STB         = 'STB',
  AudioDongle = 'AudioDongle',
  GameConsole = 'GameConsole',
  CastVideo   = 'CastVideo',
  CastAudio   = 'CastAudio',
  Automobile  = 'Automobile',
  Unknown     = 'Unknown'
}

export class Device {
  id?                 : string;
  is_active!          : boolean;
  is_private_session! : boolean;
  is_restricted!      : boolean;
  name!               : string;
  type!               : string;
  volume_percent!     : number;
}

export class SimpleEpisode {
  audio_preview_url!      : string;
  description!            : string;
  duration_ms!            : string;
  explicit!               : boolean;
  external_urls!          : any;
  href!                   : string;
  id!                     : string;
  images!                 : Array<Image>;
  is_externally_hosted!   : boolean;
  is_playable!            : boolean;
  language!               : string;
  languages!              : Array<string>;
  name!                   : string;
  release_date!           : string;
  release_date_precision! : string;
  resume_point!           : ResumePoint;
  type!                   : string;
  uri!                    : string;
}

export class Episode {
  audio_preview_url!      : string;
  description!            : string;
  duration_ms!            : string;
  explicit!               : boolean;
  external_urls!          : any;
  href!                   : string;
  id!                     : string;
  images!                 : Array<Image>;
  is_externally_hosted!   : boolean;
  is_playable!            : boolean;
  language!               : string;
  languages!              : Array<string>;
  name!                   : string;
  release_date!           : string;
  release_date_precision! : string;
  resume_point!           : ResumePoint;
  show!                   : SimpleShow;
  type!                   : string;
  uri!                    : string;
}

export class ResumePoint {
  fully_played!       : boolean;
  resume_position_ms! : number;
}

export class SavedShow {
  added_at! : string;
  show!     : Show;
}

export class SimpleShow {
  available_markets!    : Array<string>;
  copyrights!           : Array<Copyright>;
  description!          : string;
  explicit!             : boolean;
  external_urls!        : any;
  href!                 : string;
  id!                   : string;
  images!               : Array<Image>;
  is_externally_hosted! : boolean;
  languages!            : Array<string>;
  media_type!           : string;
  name!                 : string;
  publisher!            : string;
  type!                 : string;
  uri!                  : string;
}

export class Show {
  available_markets!    : Array<string>;
  copyrights!           : Array<Copyright>;
  description!          : string;
  explicit!             : boolean;
  episodes!             : Paging<SimpleEpisode>;
  external_urls!        : any;
  href!                 : string;
  id!                   : string;
  images!               : Array<Image>;
  is_externally_hosted! : boolean;
  languages!            : Array<string>;
  media_type!           : string;
  name!                 : string;
  publisher!            : string;
  type!                 : string;
  uri!                  : string;
}

export class PlaylistDetails {
  name?           : string;
  public?         : boolean;
  collaborative?  : boolean;
  description?    : string;
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

export class Playlist {
  collaborative!  : boolean;
  description!    : string;
  external_urls!  : any;
  followers!      : Followers;
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
  status!  : number;
  message! : string;
}

export class SpotifySuccess {
  status!       : number;
  snapshot_id?  : string;
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

export class PlayHistory {
  track!     : SimpleTrack;
  played_at! : string;
  context!   : Context;
}

export class Paging<T> {
  // this is used in one specific example, somewhere in browse
  // might be better to split it off into its own thing
  message?    : string;

  href!       : string;
  items!      : Array<T>;
  limit!      : number;
  next!       : string;
  offset!     : number;
  previous!   : string;
  total!      : number;
}

export class CursorPaging<T> {
  href!       : string;
  items!      : Array<T>;
  limit!      : number;
  next!       : string;
  cursors!    : Cursor;
  total!      : number;
}

export class Cursor {
  after!      : string;
}

export class Restriction {
  reason!: string;
}

export class SavedTrack {
  added_at! : string;
  track!    : Track;
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
  ids?              : string | Array<string>;
  timestamp?        : string;
  type?             : string;
  time_range?       : string;
  after?            : string;
  before?           : string;
  fields?           : string;
  market?           : string;
  additional_types? : string;
  device_id?        : string;
  device_ids?       : Array<string>;
  position?         : number;
  position_ms?      : number;
  play?             : boolean;
  name?             : string;
  public?           : boolean;
  collaborative?    : boolean;
  description?      : string;
}

export class SpotifyRecommendationsObject {
  acousticness?             : number | Array<number>;
  max_acousticness?         : number;
  min_acousticness?         : number;
  target_acousticness?      : number;

  danceability?             : number | Array<number>;
  max_danceability?         : number;
  min_danceability?         : number;
  target_danceability?      : number;

  duration_ms?              : number | Array<number>;
  max_duration_ms?          : number;
  min_duration_ms?          : number;
  target_duration_ms?       : number;

  energy?                   : number | Array<number>;
  max_energy?               : number;
  min_energy?               : number;
  target_energy?            : number;

  instrumentalness?         : number | Array<number>;
  max_instrumentalness?     : number;
  min_instrumentalness?     : number;
  target_instrumentalness?  : number;

  key?                      : number | Array<number>;
  max_key?                  : number;
  min_key?                  : number;
  target_key?               : number;
  
  liveness?                 : number | Array<number>;
  max_liveness?             : number;
  min_liveness?             : number;
  target_liveness?          : number;

  loudness?                 : number | Array<number>;
  max_loudness?             : number;
  min_loudness?             : number;
  target_loudness?          : number;

  mode?                     : number | Array<number>;
  max_mode?                 : number;
  min_mode?                 : number;
  target_mode?              : number;

  popularity?               : number | Array<number>;
  max_popularity?           : number;
  min_popularity?           : number;
  target_popularity?        : number;

  speechiness?              : number | Array<number>;
  max_speechiness?          : number;
  min_speechiness?          : number;
  target_speechiness?       : number;

  tempo?                    : number | Array<number>;
  max_tempo?                : number;
  min_tempo?                : number;
  target_tempo?             : number;

  time_signature?           : number | Array<number>;
  max_time_signature?       : number;
  min_time_signature?       : number;
  target_time_signature?    : number;

  valence?                  : number | Array<number>;
  max_valence?              : number;
  min_valence?              : number;
  target_valence?           : number;

  artists?                  : Array<string>;
  seed_artists?             : string;

  genres?                   : Array<string>;
  seed_genres?              : string;

  tracks?                   : Array<string>;
  seed_tracks?              : string;

  static build = (values: SpotifyRecommendationsObject) : SpotifyRecommendationsObject => {
    values.seed_artists = values.seed_artists || values.artists?.join(',');
    values.seed_genres = values.seed_genres || values.genres?.join(',');
    values.seed_tracks = values.seed_tracks || values.tracks?.join(',');

    values.artists = undefined;
    values.genres = undefined;
    values.tracks = undefined;

    let val: number | Array<number>; // variable so i can get around typescript's type checking

    // kinda pains me to do this all separately, but at least it'll make the user interface slightly betters
    // tradeoffs, right?
    if(values.acousticness) {
      val = values.acousticness;
      if(val && typeof val === 'number') {
        values.target_acousticness = val;
      } else if(val) {
        values.min_acousticness = (val as Array<number>)[0];
        values.max_acousticness = (val as Array<number>)[1];
      }

      // kill the value so we don't have any extra information
      values.acousticness = undefined;
    }

    if(values.danceability) {
      val = values.danceability;
      if(val && typeof val === 'number') {
        values.target_danceability = val;
      } else if(val) {
        values.min_danceability = (val as Array<number>)[0];
        values.max_danceability = (val as Array<number>)[1];
      }

      values.danceability = undefined;
    }

    if(values.duration_ms) {
      val = values.duration_ms;
      if(val && typeof val === 'number') {
        values.target_duration_ms = val;
      } else if(val) {
        values.min_duration_ms = (val as Array<number>)[0];
        values.max_duration_ms = (val as Array<number>)[1];
      }

      values.duration_ms = undefined;
    }

    if(values.energy) {
      val = values.energy;
      if(val && typeof val === 'number') {
        values.target_energy = val;
      } else if(val) {
        values.min_energy = (val as Array<number>)[0];
        values.max_energy = (val as Array<number>)[1];
      }
      
      values.energy = undefined;
    }

    if(values.instrumentalness) {
      val = values.instrumentalness;
      if(val && typeof val === 'number') {
        values.target_instrumentalness = val;
      } else if(val) {
        values.min_instrumentalness = (val as Array<number>)[0];
        values.max_instrumentalness = (val as Array<number>)[1];
      }

      values.instrumentalness = undefined;
    }

    if(values.key) {
      val = values.key;
      if(val && typeof val === 'number') {
        values.target_key = val;
      } else if(val) {
        values.min_key = (val as Array<number>)[0];
        values.max_key = (val as Array<number>)[1];
      }

      values.key = undefined;
    }

    if(values.liveness) {
      val = values.liveness;
      if(val && typeof val === 'number') {
        values.target_liveness = val;
      } else if(val) {
        values.min_liveness = (val as Array<number>)[0];
        values.max_liveness = (val as Array<number>)[1];
      }

      values.liveness = undefined;
    }

    if(values.loudness) {
      val = values.loudness;
      if(val && typeof val === 'number') {
        values.target_loudness = val;
      } else if(val) {
        values.min_loudness = (val as Array<number>)[0];
        values.max_loudness = (val as Array<number>)[1];
      }
      
      values.loudness = undefined;
    }

    if(values.mode) {
      val = values.mode;
      if(val && typeof val === 'number') {
        values.target_mode = val;
      } else if(val) {
        values.min_mode = (val as Array<number>)[0];
        values.max_mode = (val as Array<number>)[1];
      }

      values.mode = undefined;
    }

    if(values.popularity) {
      val = values.popularity;
      if(val && typeof val === 'number') {
        values.target_popularity = val;
      } else if(val) {
        values.min_popularity = (val as Array<number>)[0];
        values.max_popularity = (val as Array<number>)[1];
      }

      values.popularity = undefined;
    }

    if(values.speechiness) {
      val = values.speechiness;
      if(val && typeof val === 'number') {
        values.target_speechiness = val;
      } else if(val) {
        values.min_speechiness = (val as Array<number>)[0];
        values.max_speechiness = (val as Array<number>)[1];
      }

      values.speechiness = undefined;
    }

    if(values.tempo) {
      val = values.tempo;
      if(val && typeof val === 'number') {
        values.target_tempo = val;
      } else if(val) {
        values.min_tempo = (val as Array<number>)[0];
        values.max_tempo = (val as Array<number>)[1];
      }

      values.tempo = undefined;
    }

    if(values.time_signature) {
      val = values.time_signature;
      if(val && typeof val === 'number') {
        values.target_time_signature = val;
      } else if(val) {
        values.min_time_signature = (val as Array<number>)[0];
        values.max_time_signature = (val as Array<number>)[1];
      }

      values.time_signature = undefined;
    }

    if(values.valence) {
      val = values.valence;
      if(val && typeof val === 'number') {
        values.target_valence = val;
      } else if(val) {
        values.min_valence = (val as Array<number>)[0];
        values.max_valence = (val as Array<number>)[1];
      }

      values.valence = undefined;
    }

    return values;
  }
}