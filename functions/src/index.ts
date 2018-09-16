import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

const sendNotification = (owner_uid, type) => {

    return new Promise((resolve, reject) => {
        return admin.firestore().collection("users").doc(owner_uid).get().then((doc) => {
            if(doc.exists && doc.data().token){

                if(type === "new_comment"){
                    admin.messaging().sendToDevice(doc.data().token, {
                        data: {
                            title: "A new comment has been made on your post on Dynamics App.",
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
                            title: "Someone liked your post on Dynamics App.",
                            sound: "default",
                            body: "Tap to Check"
                        }
                    }).then((sent) => {
                        resolve(sent)
                    }).catch((err) => {
                        reject(err)
                    });
                }

              } else (type === "new_post"){
                  admin.messaging().sendToDevice('cdrge3kaU6o:APA91bF6EpsXjqchW-ub03cxiBTK1DtaX5XxzgPpskJLwjm2oiW7DnZX0USqnb_ZZLOXVpbPoGy1I-4266EBZ4M_rG7ihyCUdl_D7dEOOr1njtvOZuSk3nTc8bBintoJjIfejHxqHsKB', {
                      data: {
                          title: "Someone POSTEDPOSTEDPOSTED.",
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

export const updateLikesCount = functions.https.onRequest((request, response) => {

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

        admin.firestore().collection("posts").doc(postId).update(updateData).then(async () => {

            if(action == "like"){
                await sendNotification(data.data().owner, "new_like");
            }

            response.status(200).send("Done")
        }).catch((err) => {
            response.status(err.code).send(err.message);
        })

    }).catch((err) => {
        response.status(err.code).send(err.message);
    })

})

export const updateCommentsCount = functions.firestore.document('comments/{commentId}').onCreate(async (event) => {
    let data = event.data();

    let postId = data.post;

    let doc = await admin.firestore().collection("posts").doc(postId).get();

    if(doc.exists){
        let commentsCount = doc.data().commentsCount || 0;
        commentsCount++;

        await admin.firestore().collection("posts").doc(postId).update({
            "commentsCount": commentsCount
        })

        return sendNotification(doc.data().owner, "new_like");

    } else {
        return false;
    }
})

export const PostNotif = functions.firestore.document("posts").onCreate(async (event) => {

        return sendNotification('IdYG3pca6nVNf0LKkF910VTyCYB3', "new_post");

})

export const updateLikesforCodesign = functions.https.onRequest((request, response) => {

    console.log(request.body);

    const postId = JSON.parse(request.body).postId;
    const userId = JSON.parse(request.body).userId;
    const action = JSON.parse(request.body).action; // 'like' or 'unlike'
    admin.firestore().collection("choices").doc(postId).get().then((data) => {

        let OptionA = data.data().optionA || 0;
        let OptionB = data.data().optionB || 0;
        let likes = data.data().likes || [];

        let updateData = {};

        if(action == "A"){
            updateData["OptionA"] = ++OptionA;
            updateData["OptionB"] = --OptionB;
        } else if (action == "B"){
            updateData["OptionA"] = --OptionA;
            updateData["OptionB"] = ++OptionB;
        }
})
