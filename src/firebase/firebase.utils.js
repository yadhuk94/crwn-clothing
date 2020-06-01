import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyBi0HqPRsX0sHsHaKVOUzSPObbx3cRaP7o",
  authDomain: "crwn-db-613c5.firebaseapp.com",
  databaseURL: "https://crwn-db-613c5.firebaseio.com",
  projectId: "crwn-db-613c5",
  storageBucket: "crwn-db-613c5.appspot.com",
  messagingSenderId: "116746356889",
  appId: "1:116746356889:web:745b817d64d28eb29c1008",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }

  return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const SignInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
