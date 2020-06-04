import app from "firebase/app";
import "firebase/auth";
import "firebase/database";

const config = {
  apiKey: "AIzaSyCTDjjuhUkQ5Ic2l-ZoW3dp3JeFek7GZ1Y",
  authDomain: "fit-tracker-a5b6f.firebaseapp.com",
  databaseURL: "https://fit-tracker-a5b6f.firebaseio.com",
  projectId: "fit-tracker-a5b6f",
  storageBucket: "fit-tracker-a5b6f.appspot.com",
  messagingSenderId: "433962659790",
  appId: "1:433962659790:web:465f2c30384182487d459f",
  measurementId: "G-EVGYJ9TYGP",
};

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.database();
  }

  // Authentication //
  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  // Database //
  user = (uid) => this.db.ref(`users/${uid}`);
  users = () => this.db.ref("users");

  addActivity = (uid, activity) => {
    const ref = this.db.ref().child(`users/${uid}/activities`);
    ref.push(activity);
  };

  updateActivity = (uid, activity, activityKey) => {
    const ref = this.db.ref().child(`users/${uid}/activities/${activityKey}`);
    ref.update(activity);
  };
}

export default Firebase;
