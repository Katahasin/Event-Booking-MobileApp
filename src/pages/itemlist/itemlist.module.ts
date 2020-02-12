import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemlistPage } from './itemlist';

@NgModule({
  declarations: [
    ItemlistPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemlistPage),
  ],
})
export class ItemlistPageModule {}
