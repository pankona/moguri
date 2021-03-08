import React from "react";
import { Character } from "./Character";
import CharacterCreateForm from "./CharacterCreateForm";
import { CharacterStore } from "./CharacterStore";

const StartMenu: React.FC<{
  characterStore: CharacterStore;
  onChangeScene: (c: Character) => void;
}> = ({ characterStore, onChangeScene }) => {
  return (
    <CharacterCreateForm
      characterStore={characterStore}
      onChangeScene={onChangeScene}
    />
  );
};

export default StartMenu;
