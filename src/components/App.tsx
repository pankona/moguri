import React, { useEffect, useState } from "react";
import { Character } from "./Character";
import { CharacterStoreMemory } from "./CharacterStore";
import DangeonScene from "./Dangeon";
import firebase from "./firebase";
import StartMenu from "./StartMenu";

export type Scene = "index" | "dangeon";

const App: React.FC = () => {
  const [user, setUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    return firebase.auth().onAuthStateChanged((user: firebase.User | null) => {
      setUser(user);
    });
  }, []);

  const [scene, setScene] = useState<Scene>("index");

  const login = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  };

  const logout = () => {
    firebase.auth().signOut();
  };

  const [currentCharacter, setCurrentCharacter] = useState<Character | null>(
    null
  );

  const onChangeScene = (c: Character) => {
    setCurrentCharacter(c);
    setScene("dangeon");
  };

  const onExitDangeon = () => {
    setScene("index");
  };

  return (
    <div className="App">
      {(() => {
        switch (scene) {
          case "index":
            return user ? (
              <>
                <button onClick={logout}>Google Logout</button>
                <StartMenu
                  characterStore={new CharacterStoreMemory(user)}
                  onChangeScene={onChangeScene}
                />
              </>
            ) : (
              <button onClick={login}>Google Login</button>
            );
          case "dangeon":
            return currentCharacter ? (
              <DangeonScene
                character={currentCharacter}
                onExitDangeon={onExitDangeon}
              />
            ) : (
              <div>:(</div>
            );
          default:
            return <div>unknown :(</div>;
        }
      })()}
    </div>
  );
};

export default App;
