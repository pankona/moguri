import React from "react";
import { Character } from "../models/Character";
import { CharacterStore } from "../models/CharacterStore";
import CharacterCreateForm from "./CharacterCreateForm";

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
