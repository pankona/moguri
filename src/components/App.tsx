import React, { useEffect, useState } from "react";
import { Character, CharacterState, Dangeon } from "./Character";
import { CharacterStoreMemory } from "./CharacterStore";
import DangeonScene from "./Dangeon";
import firebase from "./firebase";
import StartMenu from "./StartMenu";
import "./App.css";
import { Header } from "./Header";
import { Button } from "./Button";

import "./Button.css";

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
    <div className="app">
      <Header
        className="header"
        user={user}
        scene={scene}
        onExitDangeon={onExitDangeon}
      />
      <div className="character_select">
        {(() => {
          switch (scene) {
            case "index":
              return user ? (
                <StartMenu
                  characterStore={new CharacterStoreMemory(user)}
                  onChangeScene={onChangeScene}
                />
              ) : (
                <Button
                  className={"button"}
                  value={"Google Login"}
                  onClick={login}
                />
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
    </div>
  );
};

export default App;
