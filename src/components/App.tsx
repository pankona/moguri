import React, { useEffect, useState } from "react";
import { Character } from "./Character";
import { CharacterStoreMemory } from "./CharacterStore";
import DungeonScene from "./Dungeon";
import firebase from "./firebase";
import StartMenu from "./StartMenu";
import "./App.css";
import { Header } from "./Header";
import { Button } from "./Button";

import "./Button.css";

export type Scene = "index" | "dungeon";

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
    setScene("dungeon");
  };

  const onExitDungeon = () => {
    setScene("index");
  };

  return (
    <div className="app">
      <Header
        className="header"
        user={user}
        scene={scene}
        onExitDungeon={onExitDungeon}
      />
      <div className="main">
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
            case "dungeon":
              return currentCharacter ? (
                <DungeonScene
                  character={currentCharacter}
                  onExitDungeon={onExitDungeon}
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
