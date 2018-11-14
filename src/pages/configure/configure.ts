import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, ActionSheetController, AlertController, ModalController, Modal, ViewController } from 'ionic-angular';
import firebase from 'firebase';
import moment from 'moment';
import { LoginPage } from '../login/login';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HttpClient } from '@angular/common/http';
import { CommentsPage } from '../comments/comments';
import { CodesignPage } from '../codesign/codesign';
import { FeedPage } from '../feed/feed';
//import { ConfigurePage } from '../configure/configure';
import { Firebase } from '@ionic-native/firebase';
import { PopupsProvider } from '../../providers/popups/popups';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { App } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-configure',
  templateUrl: 'configure.html',
})
export class ConfigurePage {
  post: any = {};
  image: string = '';
  text: string;
  worksection: string;

  constructor( public navCtrl: NavController,
              public navParams: NavParams,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private camera: Camera,
              private http: HttpClient,
              private actionSheetCtrl: ActionSheetController,
              private alertCtrl: AlertController,
              private modalCtrl: ModalController,
              private firebaseCordova: Firebase,
              public popup: PopupsProvider,
              private photoViewer: PhotoViewer,
              public appCtrl: App,
              public viewCtrl: ViewController,
            ) {
              this.post = this.navParams.get("post");
              if (this.post.data().image){
                this.image = this.post.data().image;
              }
              console.log(this.image)
              this.text = this.navParams.get("post").data().text;
              console.log(this.text)


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfigurePage');
  }


close(){
  this.viewCtrl.dismiss();
}

  removePhoto() {
  this.image = null;

  //this.appCtrl.getRootNav().setRoot(FeedPage);
  console.log('remove Pic')
  }

  ViewPhoto(url: string) {
    this.photoViewer.show(url, '', {share: true});
  }


  addPhoto() {

    const actionSheet = this.actionSheetCtrl.create({
              title: 'Adding a Photo',
              buttons: [
                {
                  text: 'Use Camera',
                  role: 'destructive',
                  handler: () => {
                    this.launchCamera();
                    console.log('Camera clicked');
                  }
                },{
                  text: 'Load from Library',
                  handler: () => {
                    //this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
                    this.openLibrary();
                    console.log('Library clicked');
                  }
                },{
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

  openLibrary() {
    let options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      targetHeight: 512,
      targetWidth: 512,
      allowEdit: true
    }

    this.camera.getPicture(options).then((base64Image) => {
      console.log(base64Image);

      this.image = "data:image/png;base64," + base64Image;


    }).catch((err) => {
      console.log(err)
    })
  }

  launchCamera() {
    let options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.CAMERA,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      targetHeight: 512,
      targetWidth: 512,
      allowEdit: true
    }

    this.camera.getPicture(options).then((base64Image) => {
      console.log(base64Image);

      this.image = "data:image/png;base64," + base64Image;


    }).catch((err) => {
      console.log(err)
    })
  }


  updatePost(post){ //pseudo-post option.
  console.log(this.text);
  firebase.firestore().collection("posts").doc(post.id).update({
      image: this.image,
      text: this.text,
      worksection: this.worksection,
  }).then(function() {
      console.log("Document successfully updated!");
  }).catch(function(error) {
      console.error("Error updating document: ", error);
  });
  this.appCtrl.getRootNav().setRoot(FeedPage);
  this.close();
}
}
