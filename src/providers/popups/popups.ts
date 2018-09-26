import { HttpClient } from '@angular/common/http';
import { Injectable, ViewChild } from '@angular/core';
import { App, NavController, LoadingController, ToastController, ActionSheetController, AlertController, ModalController, Modal } from 'ionic-angular';
//import { Component } from '@angular/core';
//import { NavParams } from 'ionic-angular';
//import { AlertController } from 'ionic-angular';
import firebase from 'firebase';
import { CodesignPage } from '../../pages/codesign/codesign';
import { FeedPage } from '../../pages/feed/feed';
//import { NavigationProvider } from '../navigation/navigation';
/*
  Generated class for the PopupsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PopupsProvider {
  @ViewChild('myNav') navCtrl: NavController;

  data : any[] = [];
  upgrades: string;
  //askcomment_lurkers: string;
  //askpost_lurkers: string;
  offhand: any[] = [];
  experience: string;
  appeal: string;
  appealrecord: string;
  force: string;
  post_lurk: number;    //keep this
  forcerecord: string;    //keep this
  features: string;
  featuresrecord: string;
  title1: string;
  subTitle1: string;
  placeholder1: string;
  flowinone: number;
  comment_lurk: number;
  contributecount: number;
  question_type: number;
  student_must_contribute: number;

  constructor(public http: HttpClient,
              private alertCtrl: AlertController,
              public appCtrl: App,
              //public navCtrl: NavController,
                        //  public navParams: NavParams,
                          private loadingCtrl: LoadingController,
                          private toastCtrl: ToastController,
                          //private camera: Camera,
                          //private http: HttpClient,
                          private actionSheetCtrl: ActionSheetController,
                          //private alertCtrl: AlertController,
                          private modalCtrl: ModalController,
                          //private navigation: NavigationProvider,/////
                          //public feed: FeedPage,
                          //private firebaseCordova: Firebase,
                          //public popup: PopupsProvider
                        ) {


      firebase.firestore().collection("feedback").doc(firebase.auth().currentUser.uid).get().then(async(user) => {
        this.post_lurk = user.data().post_lurk || 2;
        this.comment_lurk = user.data().comment_lurk || 0;
        this.contributecount = user.data().contributecount || 0;
      }).catch(err => {
        console.log(err);
      })

  }

  /////////////////////////Feedback in Comments////////////////////////////
  ////////////////////////////////////////////////////////////////////

  AboutAnonymity() {
    this.question_type = 1;
    let alert = this.alertCtrl.create({
      title: 'What are your anonymity preferences?',
      //message: 'I am designing collaborative features. I am basing this on the opinion I get from you.',
      inputs: [
        {
          //name: 'notifications',
          label: 'Anonymous@ post & comment',
          value: 'Anonymous@ post & comment',
          type: 'checkbox'
        },
        {
          //name: 'speegjfd',
          label: 'Tutors know me @post',
          value: 'Tutors know me @post',
          //placeholder: 'checkbox'
        },
        {
          //name: 'points',
          label: 'Tutors know me @comment',
          value: 'Tutors know me @comment',
          //placeholder: 'checkbox'
        },
        {
          //name: 'spejhed',
          label: 'Students know me @post',
          value: 'Students know me @post',
          //placeholder: 'checkbox'
        },
        {
          //name: 'g',
          label: 'Students know me @comment',
          value: 'Students know me @comment',
          //placeholder: 'checkbox'
        },
        {
          //name: 'Other',
          label: 'Other preference (will ask you)',
          value: 'Other',
          type: 'checkbox'
          //placeholder: 'checkbox'
        },
        ],
        buttons: [
          {
            text: 'Contribute',
            handler: data => {
                this.data=data;
                firebase.firestore().collection("feedback").doc(firebase.auth().currentUser.uid).set({

                  FeedbackAboutAnonymity: this.data,
                  Time_AboutAnonymity: firebase.firestore.FieldValue.serverTimestamp(),
                  username: firebase.auth().currentUser.displayName,
                  useremail: firebase.auth().currentUser.email,
                  timeofnote: firebase.firestore.FieldValue.serverTimestamp(),
                  uid: firebase.auth().currentUser.uid
                }, {
                merge: true
                }).then((doc) => {
                  //console.log(doc)
                }).catch((err) => {
                  console.log(err)
                })
                      if (this.data.some(x => x === "Other")){
                      //this.flowinone=2
                      console.log('other on anonymous', this.flowinone)
                      this.PleaseElaborate(this.flowinone);
                    } else {  //check if flowinone!

                      if(this.flowinone==1){
                        this.flowinone=2;
                        this.FunctionalityCheckbox();
                        console.log('flow at anonymous:', this.flowinone)
                      }else{
                        this.Thankyounote();
                      }
                    }
          }
        }],
        enableBackdropDismiss: false
      });
      alert.present();
      //this.PrepareFeedback();
  }



  FunctionalityCheckbox() {
    this.question_type = 2;
    let alert = this.alertCtrl.create({
      title: 'Choose your top three upgrades',
      //message: 'The top three app priorities must come from you.',
      inputs: [
        {
          name: 'formulas',
          id: 'formulas',
          label: 'Nice formatting of equations',
          value: 'Nice formatting of equations',
          type: 'checkbox',
        },
        {
          name: 'upload',
          label: 'Upload image from phone',
          value: 'Upload image from phone',
        },
        {
          name: 'save',
          label: 'Save picture to my images',
          value: 'Save picture to my images',
        },
        {
          name: 'notifications',
          label: 'Getting notified of responses',
          value: 'Getting notified of responses',
        },
        {
          name: 'speed',
          id: 'speed',
          label: 'Faster tutor response',
          value: 'Faster tutor response',
        },
        {
          name: 'configure',
          id: 'configure',
          label: 'Post as(name/anon)to(all/tutors)',
          value: 'Post as(name/anon)to(all/tutors)',
        },
        {
          name: 'webpages',
          id: 'webpages',
          label: 'Link webpages in comments',
          value: 'Link webpages in comments',
        },
        {
          name: 'Other',
          label: 'Something else (will ask you)',
          value: 'Other',
        },
      ],
      buttons: [
        {
          text: 'Contribute',
          handler: data => {
              this.data=data;
              firebase.firestore().collection("feedback").doc(firebase.auth().currentUser.uid).set({

                UpgradePriorities: this.data,
                Time_UpgradePriorities: firebase.firestore.FieldValue.serverTimestamp(),

              }, {
              merge: true
              }).then((doc) => {
                //console.log(doc)
              }).catch((err) => {
                console.log(err)
              })

              if (this.data.some(x => x === "Other")){
              this.PleaseElaborate(this.flowinone);
            } else {  //check if flowinone!

              if(this.flowinone==2){
                this.AppFormat();
                this.flowinone=3;
                console.log('flow at functionality checkbox:', this.flowinone)
              }else{
                this.Thankyounote();
              }
            }

          }
        }
      ],
      enableBackdropDismiss: false
    });
    alert.present();
    //this.PrepareFeedback();
  }

  AppFormat() {
    this.question_type = 3;
    let alert = this.alertCtrl.create({
      title: 'What type of platform is most suitable to connect to tutors?',
      //message: 'Much of the research is driven by your contribution.',
      inputs: [
        {
          //name: 'formulas',
          //id: 'formulas',
          label: 'Download app like this',
          value: 'Download app like this',
          type: 'checkbox',
        },
        {
          //name: 'upload',
          label: 'Webapp on browser',
          value: 'Webapp on browser',
        },
        {
          //name: 'save',
          label: 'Google Drive for the course',
          value: 'Google Drive for the course',
        },
        {
          //name: 'Other',
          label: 'Something else (will ask you)',
          value: 'Other',
        },
      ],
      buttons: [
        {
          text: 'Contribute',
          handler: data => {
              this.data=data;
              firebase.firestore().collection("feedback").doc(firebase.auth().currentUser.uid).set({

                AppFormat: this.data,
                Time_AppFormat: firebase.firestore.FieldValue.serverTimestamp(),

              }, {
              merge: true
              }).then((doc) => {
                console.log(doc)
              }).catch((err) => {
                console.log(err)
              })

              if (this.data.some(x => x === "Other")){
              this.PleaseElaborate(this.flowinone);
            } else {  //check if flowinone!

              if(this.flowinone==3){
                this.AboutMotivation();
                this.flowinone=4;
                console.log('flow at app format:', this.flowinone)
              }else{
                this.Thankyounote();
              }
            }

          }
        }
      ],
      enableBackdropDismiss: false
    });
    alert.present();
    //this.PrepareFeedback();
  }

  AboutMotivation(){
    this.question_type = 4;
  let alert = this.alertCtrl.create({
    title: 'What motivates you to answer posts?',
    //message: 'I am designing collaborative features where tutors are absent. I am basing this on the opinion I get from you.',
    inputs: [
      {
        //name: 'notifications',
        label: 'If I know the answer already',
        value: 'If I know the answer already',
        type: 'checkbox'
      },
      {
        //name: 'speegjfd',
        label: 'If someone needs help',
        value: 'If someone needs help',
        //placeholder: 'checkbox'
      },
      {
        //name: 'points',
        label: 'If I gain points for it',
        value: 'If I gain points for it',
        //placeholder: 'checkbox'
      },
      {
        //name: 'spejhed',
        label: 'If others answer my post',
        value: 'If others answer my post',
        //placeholder: 'checkbox'
      },
      {
        //name: 'g',
        label: 'Only if I get paid for it',
        value: 'Only if I get paid for it',
        //placeholder: 'checkbox'
      },
      {
        //name: 'Other',
        label: 'Something else (will ask you)',
        value: 'Other',
        type: 'checkbox'
        //placeholder: 'checkbox'
      },
    ],
    buttons: [
      {
        text: 'Contribute',
        handler: data => {

            this.data=data;
            firebase.firestore().collection("feedback").doc(firebase.auth().currentUser.uid).set({

              MotivationPriorities: this.data,
              Time_MotivationPriorities: firebase.firestore.FieldValue.serverTimestamp(),
            }, {
            merge: true
            }).then((doc) => {
              //console.log(doc)
            }).catch((err) => {
              console.log(err)
            })

            if (this.data.some(x => x === "Other")){
            this.PleaseElaborate(this.flowinone);
          } else {  //check if flowinone!

            if(this.flowinone==4){
              this.AboutCollaboration();
              this.flowinone=5;
              console.log('flow at motivation:', this.flowinone)
            }else{
              this.Thankyounote();
            }
          }

        }
      }
    ],
    enableBackdropDismiss: false
  });
  alert.present();
  //this.PrepareFeedback();
  }

  AboutCollaboration() {
    this.question_type = 5;
    let alert = this.alertCtrl.create({
      title: 'What is your opinion on collaboration on the app?',
      //message: 'I am designing collaborative features. I am basing them on the opinions I get from you.',
      inputs: [
        {
          //name: 'prevent',
          //id: 'prevent',
          label: 'Only tutors should answer posts.',
          value: 'Only tutors should answer posts.',
          type: 'checkbox',
        },
        {
          //name: 'encourage',
          label: 'Students may answer posts.',
          value: 'Students may answer posts.',
          //type: 'checkbox'
        },
        {
          //name: 'ideally',
          label: 'Ideally students answer most.',
          value: 'Ideally students answer most.',
          //placeholder: 'checkbox'
        },
        {
          //name: 'ideally',
          label: 'Other (will ask you)',
          value: 'Other',
          //placeholder: 'checkbox'
        },
      ],
      buttons: [
        {
          text: 'Contribute',
          handler: data => {

              this.data=data;
              firebase.firestore().collection("feedback").doc(firebase.auth().currentUser.uid).set({

                CollabPriorities: this.data,
                Time_CollabPriorities: firebase.firestore.FieldValue.serverTimestamp(),
              }, {
              merge: true
              }).then((doc) => {
                console.log(doc)
              }).catch((err) => {
                console.log(err)
              })

              if (this.data.some(x => x === "Other")){
              this.PleaseElaborate(this.flowinone);
            } else {  //check if flowinone!
              //this.Thankyounote();
              if(this.flowinone==5){
                this.flowinone=6;
                this.AboutAccountability();

                console.log('flow at collaboration:', this.flowinone)
              }else{
                this.Thankyounote();
              }
            }

          }
        }
      ],
      enableBackdropDismiss: false
    });
    alert.present();
    //this.PrepareFeedback();
  }

  AboutAccountability() {
    this.question_type = 6;
    let alert = this.alertCtrl.create({
      title: 'Do any of the below worry you?',
      //message: 'I am designing collaborative features. I am basing them on the opinions I get from you.',
      inputs: [
        {
          //name: 'prevent',
          //id: 'prevent',
          label: 'Tutor answers might be wrong',
          value: 'Tutor answers might be wrong',
          type: 'checkbox',
        },
        {
          //name: 'encourage',
          label: 'Student answers might be wrong',
          value: 'Student answers might be wrong',
          //type: 'checkbox'
        },
        {
          //name: 'ideally',
          label: 'Students copying from my post',
          value: 'Students copying from my post',
          //placeholder: 'checkbox'
        },
        {
          //name: 'ideally',
          label: 'Something else (will ask you)',
          value: 'Other',
          //placeholder: 'checkbox'
        },
      ],
      buttons: [
        {
          text: 'Contribute',
          handler: data => {

              this.data=data;
              firebase.firestore().collection("feedback").doc(firebase.auth().currentUser.uid).set({

                AccountabilityPriorities: this.data,
                Time_AccountabilityPriorities: firebase.firestore.FieldValue.serverTimestamp(),
              }, {
              merge: true
              }).then((doc) => {
                console.log(doc)
              }).catch((err) => {
                console.log(err)
              })

              if (this.data.some(x => x === "Other")){
              this.PleaseElaborate(this.flowinone);
            } else {  //check if flowinone!
              //this.Thankyounote();
              if(this.flowinone==6){
                this.flowinone=7;
                this.AboutPosting();

                console.log('flow at accountability:', this.flowinone)
              }else{
                this.Thankyounote();
              }
            }

          }
        }
      ],
      enableBackdropDismiss: false
    });
    alert.present();
    //this.PrepareFeedback();
  }

  AboutPosting() {
    this.question_type = 7;
    let alert = this.alertCtrl.create({
      title: 'What keeps you from posting?',
      //message: 'I am designing collaborative features. I am basing them on the opinions I get from you.',
      inputs: [
        {
          //name: 'prevent',
          //id: 'prevent',
          label: 'I rather ask tutors on Whatsapp',
          value: 'I prefer to speak to tutors on Whatsapp',
          type: 'checkbox',
        },
        {
          //name: 'encourage',
          label: 'I rather ask tutors in Tutorials',
          value: 'I prefer to speak to tutors in Tutorials',
          //type: 'checkbox'
        },
        {
          //name: 'encourage',
          label: 'I don\'t need the tutors.',
          value: 'I don\'t need the tutors.',
          //type: 'checkbox'
        },
        {
          //name: 'encourage',
          label: 'I have no storage on my phone.',
          value: 'I have no storage on my phone.',
          //type: 'checkbox'
        },
        {
          //name: 'ideally',
          label: 'I don\'t like sharing my work',
          value: 'I don\'t like sharing my work',
          //placeholder: 'checkbox'
        },
        {
          //name: 'ideally',
          label: 'Something else (I\'ll ask you)',
          value: 'Other',
          //placeholder: 'checkbox'
        },
      ],
      buttons: [
        {
          text: 'Contribute',
          handler: data => {

              this.data=data;
              firebase.firestore().collection("feedback").doc(firebase.auth().currentUser.uid).set({

                PostingIssues: this.data,
                Time_PostingIssues: firebase.firestore.FieldValue.serverTimestamp(),
              }, {
              merge: true
              }).then((doc) => {
                console.log(doc)
              }).catch((err) => {
                console.log(err)
              })

              if (this.data.some(x => x === "Other")){
              this.PleaseElaborate(this.flowinone);
            } else {  //check if flowinone!
            //  this.Thankyounote();
              if(this.flowinone==7){
                this.flowinone=8;
                //this.FunctionalityCheckbox();
                this.comment_lurk=this.comment_lurk+1000;
                firebase.firestore().collection("feedback").doc(firebase.auth().currentUser.uid).set({

                  comment_lurk: this.comment_lurk,
                  Time_PostingIssues: firebase.firestore.FieldValue.serverTimestamp(),
                }, {
                merge: true
                }).then((doc) => {
                  //console.log(doc)
                }).catch((err) => {
                  console.log(err)
                })

                console.log('flow at about posting:', this.flowinone)
              //}else{    //not for last category.
                this.Thankyounote();
              }
            }

          }
        }
      ],
      enableBackdropDismiss: false
    });
    alert.present();
    //this.PrepareFeedback();
  }

PleaseElaborate(flowinone: number){   //actually doesn't need the variable.

  let alert = this.alertCtrl.create({
    title: 'You clicked on \'Other\'',
    inputs: [
      {
        name: 'other',
        placeholder: 'Please explain what you mean.'
      },
    ],
    buttons: [
      {
        text: 'Contribute',
        handler: data => {
            this.data=data;
            firebase.firestore().collection("feedback").doc(firebase.auth().currentUser.uid).set({
              username: firebase.auth().currentUser.displayName,
              useremail: firebase.auth().currentUser.email,
              timeofnote: firebase.firestore.FieldValue.serverTimestamp(),
              uid: firebase.auth().currentUser.uid
            }, {
            merge: true
            }).then((doc) => {
              //console.log(doc)
            }).catch((err) => {
              console.log(err)
            })

            if (this.question_type==1) {

              firebase.firestore().collection("feedback").doc(firebase.auth().currentUser.uid).set({
                Extra_Anonymity: this.data,
              }, {
              merge: true
              }).then((doc) => {
                //console.log(doc)
              }).catch((err) => {
                console.log(err)
              })
          } else if (this.question_type==2) {

              firebase.firestore().collection("feedback").doc(firebase.auth().currentUser.uid).set({
                Extra_Upgrade: this.data,
              }, {
              merge: true
              }).then((doc) => {
                //console.log(doc)
              }).catch((err) => {
                console.log(err)
              })
          } else if (this.question_type==3) {

              firebase.firestore().collection("feedback").doc(firebase.auth().currentUser.uid).set({
                Extra_AppFormat: this.data,
              }, {
              merge: true
              }).then((doc) => {
                //console.log(doc)
              }).catch((err) => {
                console.log(err)
              })
          } else if (this.question_type==4) {

              firebase.firestore().collection("feedback").doc(firebase.auth().currentUser.uid).set({
                Extra_Motivation: this.data,
              }, {
              merge: true
              }).then((doc) => {
                //console.log(doc)
              }).catch((err) => {
                console.log(err)
              })
          } else if (this.question_type==5) {

              firebase.firestore().collection("feedback").doc(firebase.auth().currentUser.uid).set({
                Extra_Collaboration: this.data,
              }, {
              merge: true
              }).then((doc) => {
                //console.log(doc)
              }).catch((err) => {
                console.log(err)
              })
            } else if (this.question_type==6) {

                firebase.firestore().collection("feedback").doc(firebase.auth().currentUser.uid).set({
                  Extra_Accountability: this.data,
                }, {
                merge: true
                }).then((doc) => {
                  //console.log(doc)
                }).catch((err) => {
                  console.log(err)
                })
              } else if (this.question_type==7) {

                  firebase.firestore().collection("feedback").doc(firebase.auth().currentUser.uid).set({
                    Extra_Posting: this.data,
                  }, {
                  merge: true
                  }).then((doc) => {
                    //console.log(doc)
                  }).catch((err) => {
                    console.log(err)
                  })
            //IF FLOW IN ONE SELECTED//////////////////////////////////////////////////////
            }

            if (this.flowinone==1) {
              this.FunctionalityCheckbox();
              this.flowinone=2;

          } else if (this.flowinone==2) {
              this.flowinone=3;
              this.AppFormat();

          } else if (this.flowinone==3) {
              this.flowinone=4;
              this.AboutMotivation();

          } else if (this.flowinone==4) {
              this.flowinone=5;
              this.AboutCollaboration();

          } else if (this.flowinone==5) {
              this.flowinone=6;
              this.AboutAccountability();

            } else if (this.flowinone==6) {
                this.flowinone=7;
                this.AboutPosting();

              } else if (this.flowinone==7) {
                  this.Thankyounote();
                  this.flowinone=8;
                  //this.AboutCollaboration();

          } else {
              this.Thankyounote();
          }
        }
      }],
    enableBackdropDismiss: false
  });
  alert.present();
}


/////////////////////////Notes as popups////////////////////////////
////////////////////////////////////////////////////////////////////

PrepareFeedback(){
  let alert = this.alertCtrl.create({
    title: 'I need to ask you a quick question about your experience.',
    subTitle: `
    <p> It will take maximum 30 seconds.</p>
    <p> Do the BEER icon survey to stop receiving these popups.</p>
    <p> Your recommendations help customise the app for your learning.</p>
  `,
    buttons: [

      {
        text: 'Got it',
        handler: offhand => {
          if (1) {
          } else {
            // invalid login
            return false;
          }
        }
      }
    ],
    enableBackdropDismiss: false
  });
  alert.present();
}

  Thankyounote(){
    let alert = this.alertCtrl.create({
      title: 'Thank you very much for your help.',
      subTitle: 'Your recommendations help customise the app for your learning.',
      buttons: [

        {
          text: 'Ok',
          handler: offhand => {
            if (1) {
            } else {
              // invalid login
              return false;
            }
          }
        }
      ],
      enableBackdropDismiss: false
    });
    alert.present();
  }


//////////////////////At Post and Resolve///////////////////////////
////////////////////////////////////////////////////////////////////
AboutPreviousPost(){
let alert = this.alertCtrl.create({
  title: 'I see you have posted already. Please share your experience?',
  subTitle: `
  <p> The first three questions are about your experience making the post.</p>
  <p> the last three are about your experience resolving the post.</p>
`,

  buttons: [

    {
      text: 'Got it',
      handler: data => {
          this.PostFeedback();

        //    this.Thankyounote();
      },

    }
  ],
  enableBackdropDismiss: false
});
alert.present();

}

PostFeedback() {
  let alert = this.alertCtrl.create({
    title: 'You posted. Please spare a moment to improve the app?',
    subTitle: 'If you describe your experience, I can improve the posting of questions for everyone.',
    inputs: [
      {
        //message: 'Are you happy at the speed at which tutors answer your posts?',
        name: 'limit',
        placeholder: 'Any problems while making your post?'
      },
      {
        name: 'feed',
        placeholder: 'Any thoughts on posting in a feed?',
      },
      {
        name: 'other',
        placeholder: 'If unsatisfied, please explain here.',
      }
    ],
    buttons: [

      {
        text: 'Contribute',
        handler: data => {
            this.data=data;
            firebase.firestore().collection("feedback").doc().set({

              type: 'Feedback on Post',
              username: firebase.auth().currentUser.displayName,
              useremail: firebase.auth().currentUser.email,
              general: this.data,
              timeofnote: firebase.firestore.FieldValue.serverTimestamp(),
              uid: firebase.auth().currentUser.uid
            //}, {
            //merge: true
            }).then((doc) => {
              console.log(doc)
            }).catch((err) => {
              console.log(err)
            })
            console.log('should not be 1:', this.post_lurk)
            if (this.post_lurk==1){
            this.ResolveFeedback();
          } else {this.Thankyounote();}

        }
      }
    ],
    enableBackdropDismiss: false
  });
  alert.present();
}

  ResolveSure(){
    let alert = this.alertCtrl.create({
      title: 'Are you sure you want to resolve this post?',
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
//            if (this.experience=="1"){
              this.ResolveFeedback();
//            } else {this.shouldn't be here.()}
          }
        }
      ],
      enableBackdropDismiss: false
    });
    alert.present();
  }

  ResolveFeedback() {
    let alert = this.alertCtrl.create({
      title: 'Your post is resolved. Please spare 30 seconds to improve the app?',
      subTitle: 'If you describe your experience, I can improve the chatroom for everyone.',
      inputs: [
        {
          //message: 'Are you happy at the speed at which tutors answer your posts?',
          name: 'happy',
          placeholder: 'Are you happy with the tutor?'
        },
        {
          name: 'help',
          placeholder: 'How did this post help you?',
        },
        {
          name: 'other',
          placeholder: 'Anything we can work on? (will ask you)',
        }
      ],
      buttons: [
        {
          text: 'Contribute',
          handler: data => {
                this.data=data;
                firebase.firestore().collection("feedback").doc().set({

                  type: 'Feedback on Resolve',
                  username: firebase.auth().currentUser.displayName,
                  useremail: firebase.auth().currentUser.email,
                  general: this.data,
                  timeofnote: firebase.firestore.FieldValue.serverTimestamp(),
                  uid: firebase.auth().currentUser.uid
                //}, {
                //merge: true
                }).then((doc) => {
                  console.log(doc)
                }).catch((err) => {
                  console.log(err)
                })
                //console.log(this.post_lurk)
                //this.post_lurk++
                //console.log(this.post_lurk)
                this.Thankyounote();
          }
        }
      ],
      enableBackdropDismiss: false
    });
    alert.present();
  }

  PleaseResolve(){
    let alert = this.alertCtrl.create({
      title: 'Your last post was resolved. Please spare 30 seconds to improve the app.',
      subTitle: 'If you describe your experience, I can improve the app for everyone.',
      buttons: [
        {
          text: 'Contribute',
          handler: () => {
              this.ResolveFeedback();
          }
        }
      ],
      enableBackdropDismiss: false
    });
    alert.present();
  }

///////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////

  popupa(){

  //console.log('Latest Survey:', this.appeal);
  //console.log('Last Survey by', firebase.auth().currentUser.displayName, ':', this.popuprecord);  //add a popuprecord.
console.log('Appealrecord:', this.appealrecord, '; Appeal:', this.appeal)
    if(this.appealrecord !== this.appeal) {
        this.Purpose();  //only happens once.
      } else {
//        nothing yet, regular user.

        console.log('Purpose: do not ask', firebase.auth().currentUser.displayName, 'twice.')
      }
console.log('Forcerecord:', this.forcerecord, '; Force:', this.force)
      if(this.forcerecord !== this.force) {
          //this.feed.ForcetoCodesign();  //MUST TRANSITION TO FEED
          //this.ForcetoCodesign();

        } else {
  //        nothing yet, regular user.
          console.log('ForceCodesign: do not ask', firebase.auth().currentUser.displayName, 'twice.')
        }
console.log('Featuresrecord:', this.featuresrecord, '; Features:', this.features)
        if(this.featuresrecord !== this.features) {
            this.NewFeatures();  //only happens once.
          } else {
        //        nothing yet, regular user.
            console.log('NewFeatures: do not ask', firebase.auth().currentUser.displayName, 'twice.')
          }
  }


  NewFeatures(){
  let alert = this.alertCtrl.create({
    title: 'New Features',
    subTitle:
    `
    <p> Please do the 10min survey so I can improve the app for Dynamics 1. </p>
    <p> To do the full survey, click the BEER icon. </p>
    <p> VERSION 4.0</p>
    <ul> <li> You can type/edit longer posts </li>
    <li> Confirmation message before post/comment. </li>
    <li> When you post, and when you resolve the post, I ask you to feedback. </li></ul>
    `,
    buttons: [{
    text: 'Got it',
//    handler: () => {
//  };
}] //BUTTON
}); //ALERTCONTROLLER
alert.present();
  }



  Purpose(){
  let alert = this.alertCtrl.create({
    title: 'A project for students to be more active in shaping their learning.',
    subTitle: `
    <p> As part of this project, I need ask you questions about your preferences on the app.</p>
    <p> Please do the 10min survey so I can improve the app for Dynamics 1. </p>
    <p> To do the full survey, click the BEER icon. </p>
  `,


    buttons: [{
    text: 'Got it',
    handler: () => {
}
}] //BUTTON
}); //ALERTCONTROLLER
alert.present();
  }


  HowtoContribute(){
    let alert = this.alertCtrl.create({
      title: 'The 5min Survey',
      subTitle:`
      <p> There are 7 questions.</p>
      <p> In this way, you will not be bothered again by popups until the next update.</p>
      <p> Only your last submission will be recorded.</p>
      <ul> <li> You might already have filled some of these in. Please do so again. </li></ul>

      `,
      buttons: [

        {
          text: 'Start',
          handler: offhand => {
            this.AboutAnonymity();
            this.flowinone = 1
            this.contributecount++
            firebase.firestore().collection("feedback").doc(firebase.auth().currentUser.uid).set({
              contributecount: this.contributecount,
            }, {
            merge: true
            }).then((doc) => {
              console.log(doc)
            }).catch((err) => {
              console.log(err)
            })
            console.log('flow at start:', this.flowinone)
            }
          },
          {
            text: 'Cancel',
            handler: offhand => {
              //this.AboutAnonymity();
              }
            },

      ],
      enableBackdropDismiss: false
    });
    alert.present();
  }

  ForceContribute(){
      let alert = this.alertCtrl.create({
        title: 'The 5min Survey',
        subTitle:`
        <p> There are 7 questions.</p>
        <p> Your opinion helps customise the app for everyone's benefit.</p>
        `,
        buttons: [

          {
            text: 'Start',
            handler: offhand => {
              this.AboutAnonymity();
              this.flowinone = 1
              this.contributecount++
              this.student_must_contribute=1;
              firebase.firestore().collection("feedback").doc(firebase.auth().currentUser.uid).set({
                contributecount: this.contributecount,
                student_must_contribute: this.student_must_contribute,
              }, {
              merge: true
              }).then((doc) => {
                console.log(doc)
              }).catch((err) => {
                console.log(err)
              })
              console.log('flow at start:', this.flowinone)
              }
            },

        ],
        enableBackdropDismiss: false
      });
      alert.present();
    }

/*
  ForcetoCodesign(){
//    setTimeout(() => {
//          this.appCtrl.getRootNav().push(CodesignPage);
//                  }, 3000);

    let alert = this.alertCtrl.create({
      title: 'Collaborative Feedback Project',
      subTitle: 'As part of his project, Thomas is required to have students feedback to codesign the app.',
      buttons: [{
      text: 'Codesign',
      handler: () => {
        // user has clicked the alert button
        // begin the alert's dismiss transition
        let navTransition = alert.dismiss();

        // start some async method
        this.appCtrl.getRootNav().push(CodesignPage);
        //this.navigation.codesign();/////////////////////////////////////////////////////////
        this.forcerecord = this.force;

                  firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid).set({
                  forcerecord: this.forcerecord,
                  }, {
                  merge: true
                  }).then(() => {
                  console.log('RESET: Last Survey by', firebase.auth().currentUser.displayName, ':', this.forcerecord);
                  }).catch(err => {
                  console.log(err);


                  }).then(() => {
          // once the async operation has completed
          // then run the next nav transition after the
          // first transition has finished animating out

          navTransition.then(() => {
          this.navCtrl.pop();
          });
        });
        return false;
      }
    }],
      enableBackdropDismiss: false
    });
    alert.present();
  }*/
}
