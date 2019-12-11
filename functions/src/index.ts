// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();


exports.newSubscriberNotification = functions.database.ref('tokens/{user}')
    // @ts-ignore
    .onCreate(async event => {

        const data = event.val();
        const userId = data.token;

        const payload = {
            notification: {
                title: 'Hola perrin',
                body: `is following your content!`
            }
        };
        return admin.messaging().sendToDevice(userId, payload)
    });
