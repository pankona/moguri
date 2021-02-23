import React, { useEffect, useState } from "react";
import firebase from "./firebase";

const App: React.FC = () => {
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged((user) => {
      setUser(user);
    });
  }, []);

  const login = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  };

  const logout = () => {
    firebase.auth().signOut();
  };

  return (
    <div className="App">
      <p>Your Name: {user && user.displayName}</p>

      {user ? (
        <button onClick={logout}>Google Logout</button>
      ) : (
        <button onClick={login}>Google Login</button>
      )}
    </div>
  );
};

export default App;
