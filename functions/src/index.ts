import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

exports.sendNotifications = (owner_uid, type) => {

    return new Promise((resolve, reject) => {
        return admin.firestore().collection("users").doc(owner_uid).get().then((doc) => {
            if(doc.exists && doc.data().token){

                if(type === "new_comment"){
                    admin.messaging().sendToDevice(doc.data().token, {
                        data: {
                            title: "A new comment has been made on your post.",
                            sound: "default",
                            body: "Tap to Check"
                        }
                    }).then((sent) => {
                        resolve(sent)
                    }).catch((err) => {
                        reject(err)
                    })
                } else if(type === "new_like"){
                    admin.messaging().sendToDevice(doc.data().token, {
                        data: {
                            title: "Someone liked your post on Feedly.",
                            sound: "default",
                            body: "Tap to Check"
                        }
                    }).then((sent) => {
                        resolve(sent)
                    }).catch((err) => {
                        reject(err)
                    });
                }

              } else if(type === "new_post"){
                  admin.messaging().sendToDevice(doc.data().token, {
                      data: {
                          title: "Someone posted on Feedly.",
                          sound: "default",
                          body: "Tap to Check"
                      }
                  }).then((sent) => {
                      resolve(sent)
                  }).catch((err) => {
                      reject(err)
                  });
              }

            }
        })
    })




}

exports.updateLikesCount = functions.https.onRequest((request, response) => {

    console.log(request.body);

    const postId = JSON.parse(request.body).postId;
    const userId = JSON.parse(request.body).userId;
    const action = JSON.parse(request.body).action; // 'like' or 'unlike'

    admin.firestore().collection("posts").doc(postId).get().then((data) => {

        let likesCount = data.data().likesCount || 0;
        let likes = data.data().likes || [];

        let updateData = {};

        if(action == "like"){
            updateData["likesCount"] = ++likesCount;
            updateData[`likes.${userId}`] = true;
        } else {
            updateData["likesCount"] = --likesCount;
            updateData[`likes.${userId}`] = false;
        }

        admin.firestore().collection("posts").doc(postId).update(updateData)
        .then(async () => {

            if(action == "like"){
                await sendNotifications(data.data().owner, "new_like");
            }

            response.status(200).send("Done")
        }).catch((err) => {
            response.status(err.code).send(err.message);
        })

    }).catch((err) => {
        response.status(err.code).send(err.message);
    })

})

exports.updateCommentsCount = functions.firestore.document('comments/{commentId}').onCreate(async (event) => {
    let data = event.data();

    let postId = data.post;

    let doc = await admin.firestore().collection("posts").doc(postId).get();

    if(doc.exists){
        let commentsCount = doc.data().commentsCount || 0;
        commentsCount++;

        await admin.firestore().collection("posts").doc(postId).update({
            "commentsCount": commentsCount
        })

        return sendNotifications(doc.data().owner, "new_comment");;

    } else {
        return false;
    }
})

exports.PostNotif = functions.firestore.document('posts/{postId}').onCreate((event) => __awaiter(this, void 0, void 0, function* () {
    let data = event.data();
    let postId = data.post;
    let doc = yield admin.firestore().collection("posts").doc(postId).get();
    if (doc.exists) {
        return sendNotifications(doc.data().owner, "new_post");
    }
    else {
        return false;
    }
}));
