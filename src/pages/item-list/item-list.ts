import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { EventProvider } from "../../providers/event/event";



@IonicPage()
@Component({
  selector: 'page-item-list',
  templateUrl: 'item-list.html',
})
export class ItemListPage {
  public itemtlist: Array<any>;

  constructor(  public navCtrl: NavController,
    public navParams: NavParams,
    public eventProvider: EventProvider,
) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ItemListPage');
  }

}
