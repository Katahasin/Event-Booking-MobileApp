import { Injectable } from '@angular/core';
import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

@Injectable()
export class EventProvider {


  public eventListRef: firebase.database.Reference;
  public LedRef:firebase.database.Reference;
    


  constructor() {
   
    
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.eventListRef = firebase
          .database()
          .ref(`/userProfile/${user.uid}/eventList`); 
      }
    });
    this.LedRef=firebase.database().ref('/LED_STATUS');
  }

  createEvent(
    eventName: string,
    eventDate: string,
    eventCost: number
  ): firebase.database.ThenableReference {
    return this.eventListRef.push({
      name: eventName,
      date: eventDate,
      cost: eventCost * 1,
      budget: eventCost * 1
    });
  }

  getEventList(): firebase.database.Reference {
    return this.eventListRef;              //get itemdetalis 
  }

  
  controlLed(): PromiseLike<any>{
    return this.LedRef.set(1);
      }

 
  
  getItemList(eventId:string): firebase.database.Reference {
    return this.eventListRef.child(`${eventId}/itemList`)
  }

  
  getItem(eventId:string,itemId): firebase.database.Reference {
    
    return this.eventListRef.child(`${eventId}/itemList/${itemId}`);
    
  }
  
  getfirebasedata() {
    return this.LedRef;
  }
 
  



  getEventDetail(eventId:string): firebase.database.Reference {
    return this.eventListRef.child(eventId);
  }
  
  getpic(eventId:string,itemId:string):  PromiseLike<any> {
    return firebase
    .storage()
    .ref(`/itemProfile/${itemId}/${itemId}.png`).delete();
  }
  
 

 
  addItem(
    itemName: string,
    eventId: string,
    itemPrice: number,   //item price as well 
    itemPicture: string = null
  ): PromiseLike<any> {
    return this.eventListRef
      .child(`${eventId}/itemList`)
      .push({ name: itemName ,
              price:itemPrice * 1})
      .then(newItem => {
        this.eventListRef.child(eventId).transaction(event => {

          event.budget += -1* Number(itemPrice);   // item price as well 
          return event;

        });


        if (itemPicture != null) {               //try seprating this in a seprate function 
          return firebase
            .storage()
            .ref(`/itemProfile/${newItem.key}/${newItem.key}.png`)
            .putString(itemPicture, 'base64', { contentType: 'image/png' })
            .then(savedPicture => {
              this.eventListRef
                .child(`${eventId}/itemList/${newItem.key}/${newItem.key}`)
                .set(savedPicture.downloadURL);
            });
        }
      });
  }

  addpicture(
    eventId: string,
    itemPicture: string = null,
    itemId:string
  ): PromiseLike<any> {
        if (itemPicture != null) {               //try seprating this in a seprate function 
          return firebase
            .storage()
            .ref(`/itemProfile/${itemId}/${itemId}.png`)
            .putString(itemPicture, 'base64', { contentType: 'image/png' })
            .then(savedPicture => {
              this.eventListRef
                .child(`${eventId}/itemList/${itemId}/${itemId}`)
                .set(savedPicture.downloadURL);
            });
        }
    
  }


  removeitem(
    eventId: string,
    itemId:string,
    itemPrice: number   

  ): PromiseLike<any> {
    return this.eventListRef
      .child(`${eventId}/itemList/${itemId}`)
      .remove()
      .then(newItem => {
        this.eventListRef.child(eventId).transaction(event => {

          event.budget += 1* Number(itemPrice);   // item price as well 
          return event;

        });
      });
}



}
