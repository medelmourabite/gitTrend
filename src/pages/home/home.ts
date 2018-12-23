import { GitProvider } from "./../../providers/git/git";
import { Component } from "@angular/core";
import { NavController } from "ionic-angular";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  repos: any;

  pageNumber = 1;
  connected = true;

  constructor(public navCtrl: NavController, public git: GitProvider) {
    this.repos = [];
  }

  ionViewDidLoad() {
    this.loadMore(null);
  }

  loadMore(ev) {
    this.git.find(this.pageNumber).subscribe(
      data => {
        data["items"].forEach(rep => {
          this.repos.push(rep);
          if (ev) ev.complete();
        });
        this.pageNumber++;
      },
      err => {
        if (ev) ev.complete();
        this.connected = false;
      }
    );
  }

  formatNumber(n) {
    if (n > 1000)
      return Math.floor(n / 1000) + "." + Math.floor((n % 1000) / 100) + "k";
    else return n;
  }
}
