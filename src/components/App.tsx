import React, * as react from "react";
import { Character } from "../models/Character";
import { characterStateStoreLocalStorage } from "../models/CharacterStateStore";
import { firebase } from "../models/firebase";
import DungeonScene from "./Dungeon";
import { Header } from "./Header";
import { Button } from "./parts/Button";
import StartMenu from "./StartMenu";

export type Scene = "index" | "dungeon";

const characterStateStore = characterStateStoreLocalStorage();

firebase.app.initializeApp();

const App: React.FC = () => {
  const [user, setUser] = react.useState<firebase.auth.User | null>(null);

  react.useEffect(() => {
    return firebase.auth.onAuthStateChanged(
      (user: firebase.auth.User | null) => {
        setUser(user);
      }
    );
  }, []);

  const [scene, setScene] = react.useState<Scene>("index");

  const [currentCharacter, setCurrentCharacter] =
    react.useState<Character | null>(null);

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
                  characterStateStore={characterStateStore}
                  onChangeScene={onChangeScene}
                />
              ) : (
                <Button
                  className={"button"}
                  value={"Google Login"}
                  onClick={() => firebase.auth.login()}
                />
              );
            case "dungeon":
              return currentCharacter ? (
                <DungeonScene
                  character={currentCharacter}
                  characterStateStore={characterStateStore}
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
