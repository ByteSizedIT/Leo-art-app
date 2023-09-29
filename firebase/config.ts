// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
let firebaseApp =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

// Inititialize services - each can be optionally passed in the inizialised app
// const firestoreDB = getFirestore();
const firestoreDB = getFirestore(firebaseApp);
const firebaseAuth = getAuth(firebaseApp);

export { firestoreDB, firebaseAuth };

// To use a feature, like monitoring authentication state, import them as individual functions that take the firebase service as the first parameter. For example, the onAuthStateChanged function then takes a cb that returns whether the user is logged in:
// import {getAuth, onAuthStateChanged} from firebase/authentication
// const firebaseAuth = getAuth(firebaseApp)
// onAuthStateChanged((firebaseAuth) => {
//   if (user != null) {
//     console.log("logged in!");
//   } else {
//     console.log("no user!");
//   }
// });

// This is the pattern for each subpackage. Each function takes in an arg of either the service returned from the getter function or some relevant container object like in firestore. For example, to create a collection you pass the service as the first parameter, to get the docs from a collection you pass the collection as the first parameter:
// import { getFirestore, collection, getDocs, getDoc } from "firebase/firestore";
// const firebaseDB = getFirestore(firestoreApp)
// const todosCollection = collection(firestoreDB, 'todos')
// const snapshot = await getDocs(todosCollection)

// Note how features are now imported as indiv functions that take a service as first parameter rather than methods avail on the service itself:
// e.g. db.collection(toDos).docs()
// This previous structure used by firebase and makes App less performant - when done the new functional way JS module bundlers know how to eliminate unused code ('tree shaking'), speeding up page load performance
