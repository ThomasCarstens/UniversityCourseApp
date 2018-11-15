//import firebase from 'firebase/app';
//import 'firebase/auth';
//import 'firebase/firestore';
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try {
            step(generator.next(value));
        }
        catch (e) {
            reject(e);
        } }
        function rejected(value) { try {
            step(generator["throw"](value));
        }
        catch (e) {
            reject(e);
        } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const NotifyTutoratPost = () => {
    return new Promise((resolve, reject) => {
        //Kabir
        admin.messaging().sendToDevice("c2cOs4EQasM:APA91bEIL1pL9TmtRvsTj7W2yBmBo5KNVrZgm8l9Z_e9NlndPgkxOmg_nR2VTKwU3Mu2rxnfaBZ8Kk4fqS0gyciG7S6CIBVgjQQQllExJOSN344wXnGhaWOD2X2HhcRICP4AhAoS4JNa", {
            data: {
                title: "Someone POSTED!",
                sound: "default",
                body: "Tap to Check"
            }
        }).then((sent) => {
            resolve(sent);
        }).catch((err) => {
            reject(err);
        });
        //Tutor 1.
        admin.messaging().sendToDevice("fsLzLd4Exh8:APA91bGAxkU3pLKV54LpU6-XLPMFRUk5jbnhVWm1coQfghq3jQKBtupR9sEKEUesfDg9O3K9LsU6E98U_NZcDCaBrEMz6zFtqTkv8WHEhgSMK4pQAAIhEzmMYPDSpa_iV-8VskEI9weM", {
            data: {
                title: "Dynamics App: A Student Posted",
                sound: "default",
                body: "Tap to Check"
            }
        }).then((sent) => {
            resolve(sent);
        }).catch((err) => {
            reject(err);
        });
        /*
        //Kathryn
               admin.messaging().sendToDevice("cSKTGvbg5Io:APA91bEEtTK5la-7LlzGhjUwvmwq8c-VhuxapiEXh6U_VurjYCPqBtyjcgRYCZz9Ms8GPayUfDFaUTIQn7Qvin4bHXLbwT1TC7la1GTRLSRU2a9iBix8hlwYHTU1ZOx1Z0VSGFn5N-J_", {
                    data: {
                        title: "Dynamics App: A Student Posted",
                        sound: "default",
                        body: "Tap to Check"
                    }
                }).then((sent) => {
                    resolve(sent);
                }).catch((err) => {
                    reject(err);
                });
        
        //Marius
                admin.messaging().sendToDevice("dYrmBhhkM0g:APA91bHpSHxx7he-eeoazRbkBxJjY6oHz4qmehn7ZEF9ZPV2EQ9nzVvE0hlwD2DM96viWPh-FYc6S_JWsBPreq-vRzvaFzqbTfQAKQe99tnuDQ7Zd6DVBIcJKmJPQIMghS3L1YLrxk4V", {
                     data: {
                         title: "Dynamics App: A Student Posted",
                         sound: "default",
                         body: "Tap to Check"
                     }
                 }).then((sent) => {
                     resolve(sent);
                 }).catch((err) => {
                     reject(err);
                 });
        
        //Thabang
                 admin.messaging().sendToDevice("eIRp02Gu5JE:APA91bGznBajxaDUKhw_uKav3bbNLAot5pGrpQUY76SG7aezxDxO5XKIKf_Lz9PIiEenxmiQ5qL5hx3g4KShnO7Nty80vocPavxaaOUex9WNJS2P7oZY_2Cd2B5FH_2YIxgac5e1ICnm", {
                      data: {
                          title: "Dynamics App: A Student Posted",
                          sound: "default",
                          body: "Tap to Check"
                      }
                  }).then((sent) => {
                      resolve(sent);
                  }).catch((err) => {
                      reject(err);
                  });
        
        //Abraar
                  admin.messaging().sendToDevice("cNs0Ww-UKMg:APA91bHIectOeJA1tWm9be7eOIhVx9N6iDD0SGL2GxF2XXDnJRXZH2TEbWMWhwqOhjpe0o0256ATsH64vazoSplDTbKJK7ZC2_OUPbPxE9c8IO0vCsosUqOinQLoXPWYuShYzCF-pQyL", {
                       data: {
                           title: "Dynamics App: A Student Posted",
                           sound: "default",
                           body: "Tap to Check"
                       }
                   }).then((sent) => {
                       resolve(sent);
                   }).catch((err) => {
                       reject(err);
                   });
        
        //Thomas
                   admin.messaging().sendToDevice("eGa11RcYkQk:APA91bEmp_MHkiB2B4gJ58GkM3iazlFgi6dG7BxkAJnubDSxT9_pKhMTjdK3UaZoFdfPGQbNadVwREY78jrhGJQ7BPVLKNFP6YMHl1aQv0Glu-Uyfh0LN0KJHg9QQ-YPkPnmffRfvpdY", {
                        data: {
                            title: "Dynamics App: A Student Posted",
                            sound: "default",
                            body: "Tap to Check"
                        }
                    }).then((sent) => {
                        resolve(sent);
                    }).catch((err) => {
                        reject(err);
                    });
        
        //Bevan
                    admin.messaging().sendToDevice("fdT8l6ZD3N8:APA91bF-DuSkWJl9XLViaP5Zyux3bKG1J9NPoLGo-7GdBdwZhup4heW912-Ifcy9ozGBsdwBrN8by-RdofzJQP7rzCI1eu91L3E_UievQwIchzcu01DppT2PpZV1Rhjd6tUl4eHxSEXU", {
                         data: {
                             title: "Dynamics App: A Student Posted",
                             sound: "default",
                             body: "Tap to Check"
                         }
                     }).then((sent) => {
                         resolve(sent);
                     }).catch((err) => {
                         reject(err);
                     });
        
        //Yolanda
                     admin.messaging().sendToDevice("frplUfhZLig:APA91bFjBcuib7Z9maMGmz9KhRjIsDyYtI56S69WsQgs-9WTMGYSGOhGlW24oY5J1-SOo-HqowSKqCL_Bq2HTVnIKmEfnRVaW-WdrWC7q-5FT4ivyyVq_AoSBBsBjtyzA3YV7sdrcSGl", {
                          data: {
                              title: "Dynamics App: A Student Posted",
                              sound: "default",
                              body: "Tap to Check"
                          }
                      }).then((sent) => {
                          resolve(sent);
                      }).catch((err) => {
                          reject(err);
                      });
        
          */
    });
};
const sendNotifications = (owner_uid, type) => {
    return new Promise((resolve, reject) => {
        return admin.firestore().collection("users").doc(owner_uid).get().then((doc) => {
            if (doc.exists && doc.data().token) {
                if (type === "new_comment") {
                    admin.messaging().sendToDevice(doc.data().token, {
                        data: {
                            title: "Someone replied on Dynamics App.",
                            sound: "default",
                            body: "Tap to Check"
                        }
                    }).then((sent) => {
                        resolve(sent);
                    }).catch((err) => {
                        reject(err);
                    });
                }
                else if (type === "new_like") {
                    admin.messaging().sendToDevice(doc.data().token, {
                        data: {
                            title: "Someone liked your post on Dynamics App.",
                            sound: "default",
                            body: "Tap to Check"
                        }
                    }).then((sent) => {
                        resolve(sent);
                    }).catch((err) => {
                        reject(err);
                    });
                }
                else if (type === "new_post") {
                    admin.messaging().sendToDevice(doc.data().token, {
                        data: {
                            title: "Someone just asked a question.",
                            sound: "default",
                            body: "Can you help?"
                        }
                    }).then((sent) => {
                        resolve(sent);
                    }).catch((err) => {
                        reject(err);
                    });
                }
            }
        });
    });
};
exports.updateLikesCount = functions.https.onRequest((request, response) => {
    console.log(request.body);
    const postId = JSON.parse(request.body).postId;
    //const commentId = JSON.parse(request.body).commentId;   //later per comment input.
    const userId = JSON.parse(request.body).userId;
    const action = JSON.parse(request.body).action; // 'like' or 'unlike'
    admin.firestore().collection("choices").doc(postId).get().then((data) => {
        let likesCount = data.data().likesCount || 0;
        let likes = data.data().likes || [];
        let updateData = {};
        if (action == "like") {
            updateData["likesCount"] = ++likesCount;
            updateData[`likes.${userId}`] = true;
        }
        else {
            updateData["likesCount"] = --likesCount;
            updateData[`likes.${userId}`] = false;
        }
    }).catch((err) => {
        response.status(err.code).send(err.message);
    });
});
exports.updateCommentsCount = functions.firestore.document('comments/{commentId}').onCreate((event) => __awaiter(this, void 0, void 0, function* () {
    let data = event.data();
    let postId = data.post;
    let doc = yield admin.firestore().collection("posts").doc(postId).get();
    if (doc.exists) {
        let commentsCount = doc.data().commentsCount || 0;
        //notify all
        doc.data().commenters_uids.forEach(function (uid, i) {
            sendNotifications(uid, "new_comment");
        });
        commentsCount++;
        yield admin.firestore().collection("posts").doc(postId).update({
            "commentsCount": commentsCount,
            commenters_uids: admin.firestore.FieldValue.arrayUnion(data.owner)
        });
        //notify poster
        sendNotifications(doc.data().owner, "new_comment");
        //notify all
        //        yield admin.firestore().collection("posts").doc(postId).get().then(snapshot => {
        //          snapshot.docs.forEach(doc => {
        //            this.uids.push(doc.data()); //should add uids to this file.
        //        })
        //    })
        /*        let query = firebase.firestore().collection("posts").orderBy("created", "desc").limit(this.pageSize);
    
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
    
                    }) */
    }
    else {
        return false;
    }
}));
//# sourceMappingURL=index.js.map
exports.PostNotif = functions.firestore.document('posts/{postId}').onCreate((event) => __awaiter(this, void 0, void 0, function* () {
    //let data = event.data();
    //let postId = data.post;
    //let doc = yield admin.firestore().collection("posts").doc(postId).get();
    //notification.
    //return sendNotifications(doc.data().owner, "new_post");
    let doc = yield admin.firestore().collection("settings").doc("tutors").get();
    if (doc.exists) {
        let tutor_uids = doc.data().tutor_uids || "none";
        //notify all
        doc.data().tutor_uids.forEach(function (uid, i) {
            sendNotifications(uid, "new_post");
        });
    }
    //         yield admin.firestore().collection("posts").doc(postId).update({
    //             "commentsCount": commentsCount,
    //             commenters_uids: admin.firestore.FieldValue.arrayUnion(data.owner)
    //           });
    //notify poster
    //         sendNotifications(doc.data().owner, "new_comment");
    //   return NotifyTutoratPost();
    //2WyW3SfVEaPx2Flsk7apHBPUnEm1 DummyTutor
    //TrG0MgLYgMQn0RrDpYS4ZFbWmeH3 TOM
    //IdYG3pca6nVNf0LKkF910VTyCYB3 KATH
}));
//# sourceMappingURL=index.js.map