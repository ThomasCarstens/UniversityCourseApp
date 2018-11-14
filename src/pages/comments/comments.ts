import { Component, ViewChild } from '@angular/core';
//import { NavController, NavParams, ViewController, ToastController, LoadingController } from 'ionic-angular';
import firebase from 'firebase';
import moment from 'moment';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { ConfigurePage } from '../configure/configure';
import { PopupsProvider } from '../../providers/popups/popups';
import { ViewController, NavController, NavParams, LoadingController, ToastController, ActionSheetController, AlertController, ModalController, Modal } from 'ionic-angular';


@Component({
  selector: 'page-comments',
  templateUrl: 'comments.html',
})
export class CommentsPage {
  @ViewChild('content') content:any;
  post: any = {};
  comments : any[] = [];
  CurrentStudentName : string;
  currentusertype : string;
  commentownername : string;
  text: string = "";
  posts: any[] = [];
  pageSize: number = 10;
  cursor: any;
  infiniteEvent: any;
  image: string;
  user: any[] = [];
  comment_lurk: number;
  askcomment_lurkers : string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private viewCtrl: ViewController,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private camera: Camera,
              private alertCtrl: AlertController,
              //public configure: ConfigurePage,
              public popup: PopupsProvider) {


this.loadcomments();
//Current User details
  firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).get().then((data) => {

      this.CurrentStudentName = data.data().name || "none";
      this.currentusertype = data.data().usertype || "none";
  });

  firebase.firestore().collection("settings").doc("feedback").get().then((data) => {
      this.askcomment_lurkers = data.data().askcomment_lurkers  || "none";
  this.scrolldown();
  });

  firebase.firestore().collection("feedback").doc(firebase.auth().currentUser.uid).get().then((data) => {
      this.comment_lurk = data.data().comment_lurk || 0;
  });

/*
  setTimeout(() => {
  this.CheckNumberVisits();
}, 1000);
*/
}

CheckNumberVisits(){
  if (this.askcomment_lurkers ="1"){
    this.comment_lurk++;
    console.log('Record of Comment Lurking:',this.comment_lurk);
    firebase.firestore().collection("feedback").doc(firebase.auth().currentUser.uid).set({

        comment_lurk: this.comment_lurk,
    }, {
      merge: true
    }).then(() => {
      console.log("lurkerrecord saved to cloud firestore");
    }).catch(err => {
      console.log(err);
    })

    if (this.comment_lurk==2){
  this.popup.AboutAnonymity();
  this.popup.PrepareFeedback();
    }

    else if (this.comment_lurk==4){
  this.popup.FunctionalityCheckbox();
  this.popup.PrepareFeedback();
    }

   else  if (this.comment_lurk==7){
  this.popup.AboutMotivation();
  this.popup.PrepareFeedback();
    }

   else if (this.comment_lurk==10){
  this.popup.AboutCollaboration();
  this.popup.PrepareFeedback();
    }

    else if (this.comment_lurk==13){
  this.popup.AboutAccountability();
  this.popup.PrepareFeedback();
   }

   else if (this.comment_lurk==16){
 this.popup.AboutPosting();
 this.popup.PrepareFeedback();
  }
  }
}


  scrolldown(){
    this.content.scrollToBottom(1000);//1000ms animation speed
    console.log('Scrolldown executed.')
  }

  loadcomments(){
    this.post = this.navParams.get("post");
    console.log(this.post)
    console.log('Posting Student is:', this.post.owner_name);

    firebase.firestore().collection("comments")
    .where("post", "==", this.post.id)
    .orderBy("created", "asc")
    .get()
    .then((data) => {
      this.comments = data.docs;
      console.log('Commenting Student is:', data.docs);
    }).catch((err) => {
      console.log(err)
    })
    console.log('Comments loaded.')
  }

  close(){
    this.viewCtrl.dismiss();
  }

  ago(time) {
    let difference = moment(time).diff(moment());
    return moment.duration(difference).humanize();
  }

  resolve(){
  this.popup.ResolveSure();
  }

  PrepareComment() {
    if (this.text !== ""){
      this.CommentSure();
  } else {
     let toast = this.toastCtrl.create({
       message: "Please add text to your post.",
       duration: 3000
     }).present();
  }
 }

 CommentSure(){
   let alert = this.alertCtrl.create({
     title: 'Are you sure you want to comment?',
     message: 'This action cannot be undone.',
     buttons: [
       {
         text: 'Cancel',
         role: 'cancel',
         handler: () => {
           console.log('Cancel clicked');
         }
       },
       {
         text: 'Sure',
         handler: () => {
           console.log('Sure clicked');
 //            if (this.postexperience=="1"){
             this.newcomment();
             //this.popup.CommentFeedback();
             //CONTINUE WITH POST CODE
 //            } else {this.Thankyounote()}
         }
       }
     ],
     enableBackdropDismiss: false
   });
   alert.present();
 }

  newcomment() {
    firebase.firestore().collection("comments").add({
                            text: this.text,
                            post: this.post.id,    //need to get this from previous page. Like picture of post.
                            owner: firebase.auth().currentUser.uid,
                            owner_name: firebase.auth().currentUser.displayName,
                            created: firebase.firestore.FieldValue.serverTimestamp(),
                            owner_email: firebase.auth().currentUser.email,
                            usertype: this.currentusertype,

                          }).then(async (doc) => {
                            console.log(doc)


                            if (this.image) {
                              await this.upload(doc.id)   //picture to be uploaded.
                            }

                            this.text = "";
                            this.image = undefined;

                            this.loadcomments();
                            this.scrolldown();

                            //let toast = this.toastCtrl.create({
                            //  message: "Your post has been created successfully.",
                            //  duration: 3000
                            //}).present();

                            //this.getPosts(); //TO BE ADDED: refresh.
                          }).catch((err) => {
                            console.log(err)
                          })

                        }
  addPhoto() {

                          this.launchCamera();

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

                            let ref = firebase.storage().ref("commentImages/" + name);

                            let uploadTask = ref.putString(this.image.split(',')[1], "base64");

                            uploadTask.on("state_changed", (taskSnapshot: any) => {
                              console.log(taskSnapshot)
                              let percentage = taskSnapshot.bytesTransferred / taskSnapshot.totalBytes * 100;
                              loading.setContent("Uploaded " + percentage + "% ...")

                            }, (error) => {
                              console.log(error)
                            }, () => {
                              console.log("The upload is complete!");

                              uploadTask.snapshot.ref.getDownloadURL().then((url) => {

                                firebase.firestore().collection("comments").doc(name).update({
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

}
