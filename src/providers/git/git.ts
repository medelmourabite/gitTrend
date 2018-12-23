import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

/*
  Generated class for the GitProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GitProvider {
  url =
    "https://api.github.com/search/repositories?sort=stars&order=desc&per_page=10&q=created:%3E";

  //2018-12-22
  constructor(public http: HttpClient) {
    console.log("Hello GitProvider Provider");
  }

  find(page) {
    console.log("URL", this.url + this.formatedDate() + "&page=" + page);

    return this.http.get(this.url + this.formatedDate() + "&page=" + page);
  }

  formatedDate() {
    const time = new Date().getTime() - 3600 * 24 * 30 * 1000;
    const date = new Date(time);
    return date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate();
  }
}
