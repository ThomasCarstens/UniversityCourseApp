import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CodesignPage } from './codesign';

@NgModule({
  declarations: [
    CodesignPage,
  ],
  imports: [
    IonicPageModule.forChild(CodesignPage),
  ],
})
export class CodesignPageModule {}
