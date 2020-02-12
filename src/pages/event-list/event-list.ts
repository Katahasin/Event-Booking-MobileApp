import { Component } from "@angular/core";
import { IonicPage, NavController } from "ionic-angular";
import { EventProvider } from "../../providers/event/event";
import { ActionSheetController } from 'ionic-angular'
import { Observable } from "rxjs/Observable";
import { AuthProvider } from "../../providers/auth/auth";


import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

@IonicPage()
@Component({
  selector: "page-event-list",
  templateUrl: "event-list.html"
})
export class EventListPage {
  
  public eventList: Array<any>;
 


  constructor(
    public navCtrl: NavController,
    public eventProvider: EventProvider,
    private actionSheetCtrl: ActionSheetController,
    public authProvider: AuthProvider,

  ) {
    
  }

  public eventListRef: firebase.database.Reference;
  
  ionViewDidLoad() {
    this.eventProvider.getEventList().on("value", eventListSnapshot => {
       this.eventList = [];
       
    
      eventListSnapshot.forEach(snap => {
        this.eventList.push({
          id: snap.key,
          name: snap.val().name,
          price: snap.val().price,
          date: snap.val().date,
          budget:snap.val().budget,
          items:snap.val().itemList,
          status:snap.val().Status
          
        });
       
        return false;
      });
      
     
    });
    
  }

  // events(eventId: string) {
  //   let actionSheet = this.actionSheetCtrl.create({
  //     title: `choose the action `,
  //     buttons: [
  //       {
  //         text: 'add item ',
  //         handler: () => {
  //           this.navCtrl.push('EventDetailPage', { eventId: eventId });
           
        
  //         }
  //       },
  //       {
  //         text: 'Delete',
  //         role: 'destructive',
  //         handler: () => {
  //           this.eventProvider.getEventDetail(eventId).remove();
  //           console.log(eventId);
  //         }
  //       },
  //       {
  //         text: 'show items ',
  //         handler: () => {
  //           this.navCtrl.push('ItemDetailsPage', { eventId: eventId });
            
  //         }
  //       },
        
  //       {
  //         text: 'Cancel',
  //         role: 'cancel',
  //         handler: () => {
  //           console.log('Cancel clicked');
  //         }
  //       }
  //     ]
  //   });
  //   actionSheet.present();
  // }


  additem(eventId: string){
      
    this.navCtrl.push('EventDetailPage', { eventId: eventId });


}
  
  delete(eventId: string){
  this.eventProvider.getEventDetail(eventId).remove();

}

showitem(eventId: string){
  this.navCtrl.push('ItemDetailsPage', { eventId: eventId });
}

logOut(): void {
  this.authProvider.logoutUser().then(() => {
    this.navCtrl.setRoot("LoginPage");
  });
}

 
  pushme(){
    this.navCtrl.push('ItemDetailsPage');
  }
  
  
}
