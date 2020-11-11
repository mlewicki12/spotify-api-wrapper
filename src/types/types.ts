
import { Album, SimpleAlbum } from './album';
import { Artist, SimpleArtist } from './artist';
import { SimpleTrack, Track, TrackLink } from './track';
import { AuthObject } from './auth-object';
import { Copyright } from './copyright';
import { Followers } from './followers';
import { Image } from './image';
import { Paging } from './paging';
import { Restriction } from './restriction';

/**
 * wrapper type, so I don't have to do a millon imports if I want stuff/makes it easier to pack as part of the API
 * 
 * not sure if this is how I wanna do it, we'll see how it turns out
 */
export default class Types {
  SimpleAlbum = SimpleAlbum;
  Album = Album;
  
  SimpleArtist = SimpleArtist;
  Artist = Artist;

  SimpleTrack = SimpleTrack;
  Track = Track;
  TrackLink = TrackLink;

  AuthObject = AuthObject;
  Copyright = Copyright;
  Followers = Followers;
  Image = Image;
  Paging = Paging;
  Restriction = Restriction;
}