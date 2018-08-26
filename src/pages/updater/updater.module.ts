import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UpdaterPage } from './updater';

@NgModule({
  declarations: [
    UpdaterPage,
  ],
  imports: [
    IonicPageModule.forChild(UpdaterPage),
  ],
})
export class UpdaterPageModule {}
