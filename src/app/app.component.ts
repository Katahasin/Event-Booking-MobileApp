import { Component, ViewChild } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Nav } from 'ionic-angular';
import { HomePage } from '../pages/home/home';
import firebase from 'firebase/app';
import 'firebase/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage:any;
  activePage: any;

  pages: Array<{title: string, component: any}>;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {

    this.pages = [
      { title: 'profile', component: "ProfilePage" },
      { title: 'My events', component: 'EventListPage'},
      { title: 'creat Event', component: 'EventCreatePage'}
    ];
    firebase.initializeApp({
         apiKey: "AIzaSyC6AVSfidmgJtRioSQBgvP4nvv-qzy5XtU",
       authDomain: "feldamobile-app.firebaseapp.com",
      databaseURL: "https://feldamobile-app.firebaseio.com",
      projectId: "feldamobile-app",
      storageBucket: "feldamobile-app.appspot.com",
      messagingSenderId: "783958265320"
    });

    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if (!user){
        this.rootPage = 'LoginPage';
        unsubscribe();
      } else {
        this.rootPage = 'EventListPage';
        unsubscribe();
      }
    });
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
    this.activePage = page;
  }

  checkActive(page){
    return page == this.activePage;
  }

  

}


