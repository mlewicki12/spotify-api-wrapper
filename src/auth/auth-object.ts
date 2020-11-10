
export default class AuthObject {
  access_token?   : string;
  refresh_token?  : string;
  expires_in?     : number;
  error?          : string;

  constructor(access: string, refresh?: string, expires?: number) {
    if(refresh) {
      this.access_token = access;
      this.refresh_token = refresh;
      this.expires_in = expires;
    } else {
      this.error = access;
    }
  }
}