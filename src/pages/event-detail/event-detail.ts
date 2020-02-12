import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { EventProvider } from "../../providers/event/event";
import { Camera } from '@ionic-native/camera';

@IonicPage({
  segment: "event-detail/:eventId"
})
@Component({
  selector: "page-event-detail",
  templateUrl: "event-detail.html"
})
export class EventDetailPage {
  public currentEvent: any = {};
  public itemName: string;
  public itemPrice:number;
  public itemPicture: string = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public eventProvider: EventProvider,
    public cameraPlugin: Camera
  ) {}

  ionViewDidLoad() {
    this.eventProvider
      .getEventDetail(this.navParams.get("eventId"))
      .on("value", eventSnapshot => {
        this.currentEvent = eventSnapshot.val();
        this.currentEvent.id = eventSnapshot.key;
      });
       
  }



  addItem(itemName: string): void {
    this.eventProvider
      .addItem(
        itemName,
        this.currentEvent.id,
        this.itemPrice, //change this to an item price and make it unfixed 
        this.itemPicture
      )
      .then(newItem => {
        this.itemName = "";
        this.itemPrice=this.itemPrice;
        this.itemPicture = null;
      });

  }




  takePicture(): void {
    this.cameraPlugin
      .getPicture({
        quality: 50,
        destinationType: this.cameraPlugin.DestinationType.DATA_URL,
        sourceType: this.cameraPlugin.PictureSourceType.CAMERA,
        allowEdit: true,
        encodingType: this.cameraPlugin.EncodingType.PNG,
        saveToPhotoAlbum: true
      })
      .then(
        imageData => {
          this.itemPicture = imageData;
        },
        error => {
          console.log("ERROR -> " + JSON.stringify(error));
        }
      );
  }


}


