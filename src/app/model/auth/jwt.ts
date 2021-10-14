export class JWT {
  jwt: string;
  header: { alg: string };
  payload: { sub: string; auth: string; exp: number };

  constructor(jwt: string) {
    this.jwt = jwt;
    if (this.jwt !== '') {
      this.header = JSON.parse(window.atob(this.jwt.split('.')[0]));
      this.payload = JSON.parse(window.atob(this.jwt.split('.')[1]));
    } else {
      this.header = { alg: '' };
      this.payload = { sub: '', auth: '', exp: -1 };
    }
  }
}
