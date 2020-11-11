
import { SimpleArtist } from './artist';
import { Copyright } from './copyright';
import { Image } from './image';
import { Paging } from './paging';
import { Track } from './track';
import { Restriction } from './restriction';

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