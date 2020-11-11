
import { Image } from './image';
import { Followers } from './followers';

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