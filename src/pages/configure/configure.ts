import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, ActionSheetController, AlertController, ModalController, Modal } from 'ionic-angular';
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
              public appCtrl: App
            ) {
              this.post = this.navParams.get("post");
              console.log(this.post)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ConfigurePage');
  }

/*
  post() {
    firebase.firestore().collection("posts").add({
      text: this.text,
      created: firebase.firestore.FieldValue.serverTimestamp(),
      owner: firebase.auth().currentUser.uid,
      owner_name: firebase.auth().currentUser.displayName,
      owner_email: firebase.auth().currentUser.email
    }).then(async (doc) => {
      console.log(doc)


      if (this.image) {
        await this.upload(doc.id)
      }

      this.text = "";
      this.image = undefined;

      let toast = this.toastCtrl.create({
        message: "Your post has been created successfully.",
        duration: 3000
      }).present();

      this.getPosts();
      //this.popup.PostFeedback();                                                        //Feedback on post!
    }).catch((err) => {
      console.log(err)
    })

    console.log('a b a',this.text,'b')
  }


  ago(time) {
    let difference = moment(time).diff(moment());
    return moment.duration(difference).humanize();
  }


  ViewPhoto(url: string) {
    //this.image =
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

  upload(name: string) {

    return new Promise((resolve, reject) => {

      let loading = this.loadingCtrl.create({
        content: "Uploading Image..."
      })

      loading.present();

      let ref = firebase.storage().ref("postImages/" + name);

      let uploadTask = ref.putString(this.image.split(',')[1], "base64");

      uploadTask.on("state_changed", (taskSnapshot: any) => {
        console.log(taskSnapshot)
        let percentage = taskSnapshot.bytesTransferred / taskSnapshot.totalBytes * 100;
        loading.setContent("Uploaded " + percentage + "%...")

      }, (error) => {
        console.log(error)
      }, () => {
        console.log("The upload is complete!");

        uploadTask.snapshot.ref.getDownloadURL().then((url) => {

          firebase.firestore().collection("posts").doc(name).update({
            image: url
          }).then(() => {
            loading.dismiss()
            resolve()
          }).catch((err) => {
            loading.dismiss()
            reject()
          })

        }).catch((err) => {
          loading.dismiss()
          reject()
        })

      })

    })

  }

  like(post) {

    let body = {
      postId: post.id,
      userId: firebase.auth().currentUser.uid,
      action: post.data().likes && post.data().likes[firebase.auth().currentUser.uid] == true ? "unlike" : "like"
    }

    let toast = this.toastCtrl.create({
      message: "Updating like... Please wait."
    });

    toast.present();
  //https://us-central1-myapp-93470.cloudfunctions.net/updateLikesCount
    this.http.post("https://europe-west1-myapp-93470.cloudfunctions.net/updateLikesCount", JSON.stringify(body), {
      responseType: "text"
    }).subscribe((data) => {
      console.log(data)

      toast.setMessage("Like updated!");
      setTimeout(() => {
        toast.dismiss();
      }, 3000)

    }, (error) => {
      toast.setMessage("An error has occured. Please try again later.")
      setTimeout(() => {
        toast.dismiss();
      }, 3000)
      console.log(error)
    })

  }

  comment(post) {

            this.modalCtrl.create(CommentsPage, {
              "post": post
            }).present();

  }

  //  deleteQuestion(post: string)
  //  {
  //
  //    firebase.firestore().collection("archive").doc().add({
  //        text: post.data().text,
  //        created: post.data().created,
  //        owner: post.data().owner,
  //        owner_name: post.data().owner_name,
  //        owner_email: post.data().owner_email
  //      }).then(async (doc) => {
  //        console.log(doc)
  //
  //      }).catch((err) => {
  //        console.log(err)
  //      })
  //
  //
  //    firebase.firestore().collection("posts").doc("post").delete().then(function() {
  //      console.log("Deleted");
  //    }).catch(function(error) {
  //      console.error("Error:", error);
  //    })
  //}

  gotoCodesign(){
  this.navCtrl.push(CodesignPage);
  }

  settings(post){
  const actionSheet = this.actionSheetCtrl.create({
            title: 'Post Settings',
            buttons: [
              {
                text: 'Edit Post',
                handler: () => {
                  this.editPost(post);
                }
              },{
                text: 'Delete Post',
                handler: () => {
                  this.deletePost(post);
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

  deletePost(post){
  firebase.firestore().collection("posts").doc(post.id).delete().then(function() {
      console.log("Document successfully deleted!");
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });

  //refresh the page
  this.appCtrl.getRootNav().setRoot(FeedPage);
  }

  editPost(post){
  this.modalCtrl.create(ConfigurePage, {
    "post": post
  }).present();
  }

  removePhoto() {
  this.appCtrl.getRootNav().setRoot(FeedPage);
  console.log('remove Pic')
  }
  */
}
