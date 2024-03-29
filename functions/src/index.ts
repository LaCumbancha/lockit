// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp();

const readyToMoveNotification = async () => {
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
};

exports.readyToMoveNotificationTrigger = functions.database.ref('readyToMoveNotification/{lockerId}')
    // @ts-ignore
    .onWrite(async event => {
        await readyToMoveNotification();
    });

/* ---------------------------------------------------------------- */

const withdrawnMovementNotification = async () => {
    //const data = event.val();
    const snapshot = await admin.firestore()
        .collection('tokens')
        .where("type", "==", "CLIENTE")
        .get();
    // @ts-ignore
    const userId = snapshot.docs.map(doc => doc.data())[0].token;

    const payload = {
        notification: {
            title: 'Tu LockIt ya fue retirado.',
            body: 'Un lockitendero esta transportando tu LockIt.'
        }
    };
    return admin.messaging().sendToDevice(userId, payload);
};

exports.withdrawnMovementNotificationTrigger = functions.database.ref('movementWithdrawnNotification/{movementId}')
    // @ts-ignore
    .onWrite(async event => {
        await withdrawnMovementNotification();
    });

/* ---------------------------------------------------------------- */

const movementDoneNotification = async () => {
    //const data = event.val();
    const snapshot = await admin.firestore()
        .collection('tokens')
        .where("type", "==", "CLIENTE")
        .get();
    // @ts-ignore
    const userId = snapshot.docs.map(doc => doc.data())[0].token;

    const payload = {
        notification: {
            title: 'Tu LockIt ya esta listo.',
            body: 'El lockitendero entrego tu LockIt.'
        }
    };
    return admin.messaging().sendToDevice(userId, payload);
};

exports.movementDoneNotificationnTrigger = functions.database.ref('movementDoneNotification/{movementId}')
    // @ts-ignore
    .onWrite(async event => {
        await movementDoneNotification();
    });
