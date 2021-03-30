import React, * as react from "react";
import "./App.css";
import { Character } from "./Character";
import { CharacterStoreMemory } from "./CharacterStore";
import DungeonScene from "./Dungeon";
import firebase from "./firebase";
import { Header } from "./Header";
import { Button } from "./parts/Button";
import "./parts/Button.css";
import StartMenu from "./StartMenu";

export type Scene = "index" | "dungeon";

const App: React.FC = () => {
  const [user, setUser] = react.useState<firebase.User | null>(null);

  react.useEffect(() => {
    return firebase.auth().onAuthStateChanged((user: firebase.User | null) => {
      setUser(user);
    });
  }, []);

  const [scene, setScene] = react.useState<Scene>("index");

  const login = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithRedirect(provider);
  };

  const [
    currentCharacter,
    setCurrentCharacter,
  ] = react.useState<Character | null>(null);

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
