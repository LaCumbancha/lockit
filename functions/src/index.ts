// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();


exports.readyToMoveNotificationTrigger = functions.database.ref('readyToMoveNotification/{userId}/{lockerId}')
    // @ts-ignore
    .onCreate(async event => {

        //const data = event.val();
        const snapshot = await admin.firestore()
            .collection('tokens')
            .where("type", "==", "LOCKITENDERO")
            .get();
        // @ts-ignore
        const userId = snapshot.docs.map(doc => doc.data())[0].token;

        const payload = {
            notification: {
                title: 'Hay un locker disponible para transportar!',
                body: 'No te lo pierdas.'
            }
        };
        return admin.messaging().sendToDevice(userId, payload)
    });
