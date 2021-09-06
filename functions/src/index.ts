const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
// const spawn = require('child-process-promise').spawn;
// const path = require('path');
// const os = require('os');
// const fs = require('fs');

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });


export const onRegister = functions
    .region("europe-west3")
    .auth.user()
    .onCreate((user: any) => {

        if (user.displayName === null) {
            user.displayName = "";
        }
        if (user.photoURL === null) {
            user.photoURL = "";
        }

        admin.firestore()
            .collection("users/u_default_groups/own_data")
            .doc(user.uid).set({
                UID: user.uid,
                email: user.email,

                name: user.displayName,
                picture: user.photoURL,
                thumb_picture: user.photoURL,

                rights: 0,
            });

            admin.firestore()
            .collection("users/u_default_rights/accessRights")
            .doc(user.uid).set({
                UID: user.uid,
                rights: 0,
            });

        functions.logger
            .info("User has been created, uid:" + user.uid);

        return null;
    });


export const deleteUserData = functions
    .region("europe-west3")
    .auth.user()
    .onDelete((user: any) => {

        admin.firestore()
            .collection("users/u_default_groups/own_data")
            .doc(user.uid)
            .delete();

            admin.firestore()
            .collection("users/u_default_rights/accessRights")
            .doc(user.uid)
            .delete();

        return null;
    });
