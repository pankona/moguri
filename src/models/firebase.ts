import * as firebaseApp from "firebase/app";
import * as firebaseAuth from "firebase/auth";

const config = {
  apiKey: "AIzaSyBFuR_VwwSAaex_k9rKPCNtCIjDlgFU1-s",
  authDomain: "moguri-mogumogu.firebaseapp.com",
  projectId: "moguri-mogumogu",
  storageBucket: "moguri-mogumogu.appspot.com",
  messagingSenderId: "180738547586",
  appId: "1:180738547586:web:9726674f479358844c399b",
  measurementId: "G-R7NK5CPT4H",
};

export namespace firebase.app {
  export const initializeApp = () => {
    firebaseApp.initializeApp(config);
  };
}

export namespace firebase.auth {
  export type User = firebaseAuth.User;

  export const login = () => {
    const provider = new firebaseAuth.GoogleAuthProvider();
    firebaseAuth.signInWithRedirect(firebaseAuth.getAuth(), provider);
  };

  export const logout = () => {
    firebaseAuth.getAuth().signOut();
  };

  export const onAuthStateChanged = (
    f: (user: firebaseAuth.User | null) => void
  ) => {
    firebaseAuth.onAuthStateChanged(firebaseAuth.getAuth(), f);
  };
}
