import React, { useEffect, useState } from "react";
import CharacterCreateForm from "./CharacterCreateForm";
import { CharacterStoreMemory } from "./CharacterStore";
import firebase from "./firebase";

const App: React.FC = () => {
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged((user: firebase.User | null) => {
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
      {user ? (
        <>
          <button onClick={logout}>Google Logout</button>
          <CharacterCreateForm
            characterStore={new CharacterStoreMemory(user)}
          />
        </>
      ) : (
        <button onClick={login}>Google Login</button>
      )}
    </div>
  );
};

export default App;
