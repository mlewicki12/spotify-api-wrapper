
import { SimpleArtist } from './artist';
import { SimpleAlbum } from './album';
import { Restriction } from './restriction';

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