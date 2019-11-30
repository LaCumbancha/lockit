import * as firebase from 'firebase';

const config = {
  apiKey: "AIzaSyBDAVUdsWScuRa20pAA7cSYXk-K8Zp_kLs",
  authDomain: "lockit-tdp1.firebaseapp.com",
  databaseURL: "https://lockit-tdp1.firebaseio.com",
  projectId: "lockit-tdp1",
  storageBucket: "lockit-tdp1.appspot.com",
  messagingSenderId: "351929988099",
  appId: "1:351929988099:web:db76b9c5c95b7d2fc48a36",
  measurementId: "G-2R1B6QTBRV"
}

firebase.initializeApp(config);

export function getBikeCoordinates(objectId){
  return firebase.firestore().doc("bikeCoordinates/" + objectId).get();
}
