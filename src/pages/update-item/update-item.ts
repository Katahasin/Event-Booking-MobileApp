import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { EventProvider } from "../../providers/event/event";
import { Camera } from '@ionic-native/camera';


@IonicPage()
@Component({
  selector: 'page-update-item',
  templateUrl: 'update-item.html',
})
export class UpdateItemPage {

  public currentItem: any = {};
  public itemPicture: string = null;
  public eventId=this.navParams.get("eventId");
  public itemId=this.navParams.get("itemId");


  constructor( public navCtrl: NavController,
    public navParams: NavParams,
    public eventProvider: EventProvider,
    public cameraPlugin: Camera) {}

  ionViewDidLoad() {
    this.eventProvider
      .getItem(this.navParams.get("eventId"),this.navParams.get("itemId"))
      .on("value", eventSnapshot => {
        this.currentItem = eventSnapshot.val();
        this.currentItem.id = eventSnapshot.key;
      });
  }


  takePicture(): void {
    this.cameraPlugin
      .getPicture({
        quality: 95,
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
  
  addItem(): void {
    this.eventProvider
      .addpicture(
        this.eventId,
        this.itemPicture, //change this to an item price and make it unfixed 
        this.itemId
      )
  }


}
