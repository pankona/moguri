import React, { useEffect } from "react";
import { Character, CharacterState } from "../models/Character";
import { CharacterStateStore } from "../models/CharacterStateStore";
import { generateDungeon } from "../models/Dungeon";
import { Button } from "./parts/Button";

export type CharacterCreateProps = {
  characterStateStore: CharacterStateStore;
  onChangeScene: (c: Character) => void;
};

const CharacterCreateForm: React.FC<CharacterCreateProps> = ({
  characterStateStore,
  onChangeScene,
}) => {
  const [characterName, setCharacterName] = React.useState<string>("");

  const onCharacterNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCharacterName(e.target.value);
  };

  const [characterStates, setCharacterStates] = React.useState<
    CharacterState[]
  >([]);

  useEffect(() => {
    setCharacterStates(characterStateStore.fetchAll());
  }, [characterStateStore]);

  const onSubmitCharacterCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newCharacter = {
      id: "",
      name: characterName,
      greet: "Hi!",
      health: 10,
    };

    const newCharacterState: CharacterState = {
      currentCharacter: newCharacter,
      currentLocation: { level: 0, x: 1, y: 0 },
      currentInteractResult: undefined,
      dungeon: generateDungeon(),
    };

    if (characterStateStore.add(newCharacterState)) {
      setCharacterStates(characterStateStore.fetchAll());
      setCharacterName("");
    }
  };

  const onRemoveCharacter = (id: string) => {
    characterStateStore.Delete(id);
    setCharacterStates(characterStateStore.fetchAll());
    setCharacterName("");
  };

  const onStart = (c: Character) => {
    onChangeScene(c);
  };

  return (
    <div>
      <div>input new character name</div>
      <form onSubmit={onSubmitCharacterCreate}>
        <input
          className={"textfield"}
          type="text"
          value={characterName}
          onChange={onCharacterNameChange}
        />
        <input className={"button"} type="submit" name="submit" />
      </form>
      <div>characters</div>
      {characterStates.map((characterStatus) => (
        <div key={characterStatus.currentCharacter.id}>
          {((): string => {
            return characterStatus.currentCharacter.name;
          })()}
          <Button
            className={"button"}
            value="start"
            onClick={(_: React.MouseEvent<HTMLInputElement>) => {
              onStart(characterStatus.currentCharacter);
            }}
          />
          <Button
            className={"button"}
            value="remove"
            onClick={(_: React.MouseEvent<HTMLInputElement>) => {
              onRemoveCharacter(characterStatus.currentCharacter.id);
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default CharacterCreateForm;
