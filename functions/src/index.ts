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



    exports.updateUserAccessRights = functions.region('europe-west3').firestore
    .document('users/u_default_rights/accessRights/{accRi}')
    .onUpdate((change: any, context: any) => {

        const prevData = change.before.data();
        const newData = change.after.data();
        const safeUID = context.params.accRi

        // only when rights have changed, do something
        if (newData.rights !== prevData.rights) {
            console.log("updateUserAccessRights: RightsUpdate has to be performed.");

            admin.auth().setCustomUserClaims(safeUID, { rights: newData.rights })
            // The new custom claims will propagate to the user's ID token the
            // next time a new one is issued.
            // so the user has to log out and log in again
            // console.log("updateUserAccessRights: CustomClaims have been set from level: " + prevData.rights + " to level: " + newData.rights + " for userUID: " + safeUID);


            // now we have to update userOwn data - so that the users sees the updated rights
            admin.firestore().collection("users/u_default_groups/own_data")
                .doc(safeUID)
                .update({
                    rights: newData.rights,
                }).then(() => {
                    console.log("updateUserAccessRights: Rights have been updated from: " + prevData.rights + " to level: " + newData.rights + " for userUID: " + safeUID);

                }, () => {

                    // there was some error, so return false
                    console.log("updateUserAccessRights: Rights update failed from level: " + prevData.rights + " to level: " + newData.rights + " for userUID: " + safeUID + " error: ");
                });

        } else {
            // there was nothing to do, so just do nothing
        }

        return true;
    });