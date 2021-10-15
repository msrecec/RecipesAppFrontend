export class JWT {
  jwt: string;
  header: { alg: string };
  payload: { sub: string; auth: string; exp: number };
  expirationDate: Date;

  constructor(jwt: string) {
    this.jwt = jwt;
    if (this.jwt !== '') {
      this.header = JSON.parse(window.atob(this.jwt.split('.')[0]));
      this.payload = JSON.parse(window.atob(this.jwt.split('.')[1]));
      this.expirationDate = new Date(
        new Date().getTime() + +this.payload.exp * 1000
      );
    } else {
      this.header = { alg: '' };
      this.payload = { sub: '', auth: '', exp: -1 };
      this.expirationDate = new Date();
    }
  }
}
