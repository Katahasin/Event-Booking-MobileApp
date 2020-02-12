import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventProvider } from "../../providers/event/event";
import { Camera } from '@ionic-native/camera';
import firebase from 'firebase/app';
import { ActionSheetController } from 'ionic-angular'

import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

@IonicPage()
@Component({
  selector: 'page-item-details',
  templateUrl: 'item-details.html',
})
export class ItemDetailsPage {

  
  public itemPicture:string ;

  public itemList: Array<any>;

  public eventId=this.navParams.get("eventId");
  

  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public eventProvider: EventProvider,
    public cameraPlugin: Camera,
    private actionSheetCtrl: ActionSheetController

            ) {}
  

  ionViewDidLoad() {

    this.eventProvider.getItemList(this.navParams.get("eventId"))

      .on("value", eventSnapshot => {

        this.itemList=[];

        
        eventSnapshot.forEach(snap => {
          this.itemList.push({
            id: snap.key,
            name: snap.val().name,
            price: snap.val().price,
          });
         
          return false;
        });
        
       
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
    me(){
      console.log("mee")
    }
    
    
    removeitem(eventId,itemId,itmePrice,itemPicture){
      let actionSheet = this.actionSheetCtrl.create({
        title: `choose the action `,
        buttons: [
          {
            text: 'upload proof ',
            handler: () => {
              this.navCtrl.push('UpdateItemPage', { eventId: eventId,itemId:itemId });
            }
          },
          {
            text: 'Delete',
            role: 'destructive',
            handler: () => {

               this.eventProvider.removeitem(eventId,itemId,itmePrice);
               this.eventProvider.getpic(eventId,itemId);
              
            }
          },
         
          
          {
            text: 'Cancel',
            role: 'cancel',
            handler: () => {
              console.log('Cancel clicked');
            }
          }
        ]
      });
      actionSheet.present();
    }


  
  




  }

  
