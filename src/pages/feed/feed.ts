import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, ToastController, ActionSheetController, AlertController, ModalController, Modal } from 'ionic-angular';
import firebase from 'firebase';
import moment from 'moment';
import { LoginPage } from '../login/login';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { HttpClient } from '@angular/common/http';
import { CommentsPage } from '../comments/comments';
import { CodesignPage } from '../codesign/codesign';
import { Firebase } from '@ionic-native/firebase';
import { PopupsProvider } from '../../providers/popups/popups';
import { PhotoViewer } from '@ionic-native/photo-viewer';

//import * as admin from 'firebase-admin';
//import { UserProvider } from '../../providers/user/user';

@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
})
export class FeedPage {
 dummyText: string = `Type a longer text to see how this expands!`;
  text: string = "";
  posts: any[] = [];
  pageSize: number = 10;
  cursor: any;
  infiniteEvent: any;
  image: string;
  usertype:string;
  username:string;
  user: any[] = [];
  idea: string;
  latestsurvey: string='2';
  appealrecord: string;
  forcerecord: string;
  featuresrecord: string;
  feed_lurk: number;
  post_lurk: number;
  askpost_lurkers: string;
  please_resolve: number;
  student_must_contribute: number;
  force_contribute: number;

  constructor(public navCtrl: NavController,
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
              private photoViewer: PhotoViewer
              //public userservice: UserProvider,
            ) {

    this.firebaseCordova.getToken().then(async (token) => {
      console.log(token)

      await this.updateToken(token, firebase.auth().currentUser.uid);
      console.log(token)
    }).catch((err) => {
      console.log(err)
    })


this.getPosts();

//timeout for firestore retrieval time.

firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).get().then(async (data) => {
    this.username = data.data().name || "none";
    this.usertype = data.data().usertype || "none";
    firebase.firestore().collection("settings").doc("feedback").get().then((data) => {
        this.askpost_lurkers = data.data().askpost_lurkers || "none";
        this.force_contribute = data.data().force_contribute || 0;
    }).catch(err => {
      console.log(err);
    })
}).catch(err => {
  console.log(err);
})

//firebase.firestore().collection("settings").doc("feedback").get().then((data) => {
//    this.askpost_lurkers = data.data().askpost_lurkers || "none";
//    //this.force_contribute = data.data().force_contribute || 0;
//}).catch(err => {
//  console.log(err);
//})


  setTimeout(() => {
this.SetupOrConfigureFeedbackDoc();

  setTimeout(() => {
    console.log('Current user is', this.username);
    console.log('Current usertype is', this.usertype);
    console.log('Current feedback setting is', this.askpost_lurkers, '(true/false)');
    console.log('Current FeedLurk is', this.feed_lurk);
    console.log('Current PostLurk is', this.post_lurk);
    console.log('Current ForceContribute is', this.force_contribute, '(true/false)');
    console.log('Current Student Contribution is', this.student_must_contribute, '(true/false)');
  this.CheckNumberVisits();
}, 3000);
}, 3000);
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CodesignPage');
  }

////////////////////////////FUNCTIONS///////////////////////////
SetupOrConfigureFeedbackDoc(){
  //setting up doc if it does not exist.
firebase.firestore().collection("feedback").doc(firebase.auth().currentUser.uid).get().then((docSnapshot) => {
  if (docSnapshot.exists) {
    console.log('exists');
    firebase.firestore().collection("feedback").doc(firebase.auth().currentUser.uid).get().then((data) => {
      this.feed_lurk = data.data().feed_lurk;
      this.post_lurk = data.data().post_lurk;
      this.please_resolve = data.data().please_resolve;
      this.student_must_contribute= data.data().student_must_contribute;
    }).catch(err => {
      console.log(err);
    })

  } else {
    console.log('does not exist');

    firebase.firestore().collection("feedback").doc(firebase.auth().currentUser.uid).set({
      feed_lurk : 0,
      post_lurk : 0,
      please_resolve : 0,
      username : this.username,
      usertype : this.usertype,
      student_must_contribute: 0,
  }).then((data) => {
        console.log("New feedback uid doc on firestore.");
        this.feed_lurk = 0;
        this.post_lurk = 0;
        this.please_resolve = 0;
        this.student_must_contribute = 0;
    }).catch(err => {
      console.log(err);
    })

}
});
}
/* firebase.firestore().collection("feedback").doc(firebase.auth().currentUser.uid).set({
    student_must_contribute: this.student_must_contribute,
}, {
  merge: true
}).then(() => {
  console.log("New feed_lurk on firestore.");
}).catch(err => {
  console.log(err);
})
firebase.firestore().collection("feedback").doc(firebase.auth().currentUser.uid).get().then((data) => {
  this.student_must_contribute= data.data().student_must_contribute;
  if (this.force_contribute==1){
    if (this.student_must_contribute==0){
      this.popup.ForceContribute();
      this.student_must_contribute=1;
    }}
}).catch(err => {
  console.log(err);
}) */

CheckNumberVisits(){

  if (this.force_contribute==1){
    if (this.student_must_contribute==0){
      this.popup.ForceContribute();
    }}

  else if (this.askpost_lurkers=="1"){
    if (this.please_resolve==1){
    this.popup.PleaseResolve();
    this.please_resolve++
    firebase.firestore().collection("feedback").doc(firebase.auth().currentUser.uid).set({
        please_resolve: this.please_resolve,
    }, {
      merge: true
    }).then(() => {
      console.log("New feed_lurk on firestore.");
    }).catch(err => {
      console.log(err);
    })
}
    else if (this.post_lurk!==1){
    this.feed_lurk++;
    console.log('Record of Feed Lurking:',this.feed_lurk);
    firebase.firestore().collection("feedback").doc(firebase.auth().currentUser.uid).set({
        feed_lurk: this.feed_lurk,
    }, {
      merge: true
    }).then(() => {
      console.log("New feed_lurk on firestore.");
    }).catch(err => {
      console.log(err);
    })

    if (this.feed_lurk==1){
  this.popup.NewFeatures();
    }

    if (this.feed_lurk==2){
  this.popup.Purpose();
    }
}
//ask the opinion if has already posted.
  else if (this.post_lurk==1){

      this.popup.AboutPreviousPost();
      this.post_lurk++;
      console.log('Feedpage Record of Post Lurking:',this.post_lurk);
      firebase.firestore().collection("feedback").doc(firebase.auth().currentUser.uid).set({
          post_lurk: this.post_lurk,
      }, {
        merge: true
      }).then(() => {
        console.log("New post_lurk on firestore.");
      }).catch(err => {
        console.log(err);
      })
  }
  }
}

////////////////Other functional items//////////////////////////

  updateToken(token: string, uid: string){

    firebase.firestore().collection("users").doc(uid).set({  //devices to users.
      token: token,
      tokenUpdate: firebase.firestore.FieldValue.serverTimestamp()

    }, {
      merge: true
    }).then(() => {
      console.log("token saved to cloud firestore");
    }).catch(err => {
      console.log(err);
    })

  }


  getPosts() {

    this.user = [];
    console.log(firebase.auth().currentUser.uid);
    firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).get().then((data) => {

        this.usertype = data.data().usertype || "none";
        this.username = data.data().studentnumber || "none";
        //this.idea=data.data().survey_value || "none";

        //console.log(this.idea);
      })

//firebase.auth().currentUser.


  //////////////////////ORIGINAL FUNCTION///////////////////////

    this.posts = [];

    let loading = this.loadingCtrl.create({
      content: "Loading Feed..."
    });

    loading.present();

    let query = firebase.firestore().collection("posts").orderBy("created", "desc").limit(this.pageSize);

    query.onSnapshot((snapshot) => {
      let changedDocs = snapshot.docChanges();

      changedDocs.forEach((change) => {
        if (change.type == "added") {
          // TODO
        }

        if (change.type == "modified") {
          for (let i = 0; i < this.posts.length; i++) {
            if (this.posts[i].id == change.doc.id) {
              this.posts[i] = change.doc;
            }
          }
        }

        if (change.type == "removed") {
          // TODO
        }
      })
    })
    //get from firestore and push each post to posts[] array.
    query.get()
      .then((docs) => {

        docs.forEach((doc) => {
          this.posts.push(doc);

        })
    //necessary to execute as soon as page loads - see constructor

        loading.dismiss();

        this.cursor = this.posts[this.posts.length - 1];

        console.log(this.posts)

      }).catch((err) => {
        console.log(err)
      })
  }

  loadMorePosts(event) {

    firebase.firestore().collection("posts").orderBy("created", "desc").startAfter(this.cursor).limit(this.pageSize).get()
      .then((docs) => {

        docs.forEach((doc) => {
          this.posts.push(doc);
        })

        console.log(this.posts)

        if (docs.size < this.pageSize) {
          // all documents have been loaded
          event.enable(false);
          this.infiniteEvent = event;
        } else {
          event.complete();
          this.cursor = this.posts[this.posts.length - 1];
        }

      }).catch((err) => {
        console.log(err)
      })

  }

  refresh(event) {

    this.posts = [];

    this.getPosts();

    if (this.infiniteEvent) {
      this.infiniteEvent.enable(true);
    }

    event.complete();

  }

 PreparePost() {
   if (this.text !== ""){
     this.PostSure();
 } else {
    let toast = this.toastCtrl.create({
      message: "Please add text to your post.",
      duration: 3000
    }).present();
 }
}

PostSure(){
  let alert = this.alertCtrl.create({
    title: 'Are you sure you want to post?',
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
            this.post();
            this.popup.PostFeedback();
            //CONTINUE WITH POST CODE
//            } else {this.Thankyounote()}
        }
      }
    ],
    enableBackdropDismiss: false
  });
  alert.present();
}

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

  logout() {

    firebase.auth().signOut().then(() => {

      let toast = this.toastCtrl.create({
        message: "You have been logged out successfully.",
        duration: 3000
      }).present();

      this.navCtrl.setRoot(LoginPage);
    });

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

}
