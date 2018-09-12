import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController, LoadingController } from 'ionic-angular';
import firebase from 'firebase';
import moment from 'moment';
import { Camera, CameraOptions } from '@ionic-native/camera';

@Component({
  selector: 'page-comments',
  templateUrl: 'comments.html',
})
export class CommentsPage {
  @ViewChild('content') content:any;
  post: any = {};
  comments : any[] = [];
  CurrentStudentName : string;
  commentownername : string;
  text: string = "";
  posts: any[] = [];
  pageSize: number = 10;
  cursor: any;
  infiniteEvent: any;
  image: string;
  user: any[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private viewCtrl: ViewController,
              private loadingCtrl: LoadingController,
              private toastCtrl: ToastController,
              private camera: Camera,) {


this.loadcomments();
//Current User details
  firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).get().then((data) => {

      this.CurrentStudentName = data.data().name || "none";
      console.log(this.CurrentStudentName); //this works


  this.scrolldown();
  });

//for each comment: comment details.
//  firebase.firestore().collection("comments").doc().get().then((data) => {
//      this.commentownername = data.data().owner_name|| "none";
//      console.log(this.commentownername);
//  });

}

  scrolldown(){
    this.content.scrollToBottom(1000);//1000ms animation speed
    console.log('Scrolldown executed.')
  }

  loadcomments(){
    this.post = this.navParams.get("post");
    console.log(this.post)

    firebase.firestore().collection("comments")
    .where("post", "==", this.post.id)
    .orderBy("created", "asc")
    .get()
    .then((data) => {
      this.comments = data.docs;
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

  newcomment() {
    firebase.firestore().collection("comments").add({
                            text: this.text,
                            post: this.post.id,    //need to get this from previous page. Like picture of post.
                            owner: firebase.auth().currentUser.uid,
                            owner_name: firebase.auth().currentUser.displayName,
                            created: firebase.firestore.FieldValue.serverTimestamp(),
                            owner_email: firebase.auth().currentUser.email

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
