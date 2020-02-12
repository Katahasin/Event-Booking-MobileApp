import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { EventProvider } from "../../providers/event/event";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,
    public eventProvider: EventProvider,) {

  }

  goToProfile(): void {
    this.navCtrl.push("ProfilePage");
  }

  goToCreate(): void {
    this.navCtrl.push('EventCreatePage');
  }

  goToList(): void {
    this.navCtrl.push('EventListPage');
  }

  LED1(){
    this.eventProvider.controlLed();
  }

}
