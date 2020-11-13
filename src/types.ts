
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

export class AuthObject {
  access_token!   : string;
  token_type!     : string;
  refresh_token!  : string;
  scope!          : string;
  expires_in!     : number;
}

export class Copyright {
  text!   : string;
  type!   : string;
}

export class AuthError {
  error!: string;
  error_description!: string;
}

export class Error {
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

export class SpotifyRequestParams {
  include_groups?:  Array<string>;
  country?:         string;
  limit?:           number;
  offset?:          number;
}