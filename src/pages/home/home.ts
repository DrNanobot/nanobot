import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

declare function init();

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  ionViewDidEnter()
  {
    init();
  }
}
