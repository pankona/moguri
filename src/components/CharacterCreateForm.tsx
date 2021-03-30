import React, { useEffect } from "react";
import { Character } from "./Character";
import { CharacterStore } from "./CharacterStore";
import { Button } from "./parts/Button";

const CharacterCreateForm: React.FC<{
  characterStore: CharacterStore;
  onChangeScene: (c: Character) => void;
}> = ({ characterStore, onChangeScene }) => {
  const [characterName, setCharacterName] = React.useState<string>("");

  const onCharacterNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCharacterName(e.target.value);
  };

  const [characters, setCharacters] = React.useState<Character[]>([]);

  useEffect(() => {
    setCharacters(characterStore.fetchAll());
  }, [characterStore]);

  const onSubmitCharacterCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newCharacter = {
      id: "",
      name: characterName,
      greet: "Hi!",
      health: 10,
    };
    if (characterStore.add(newCharacter)) {
      setCharacters([...characterStore.fetchAll()]);
      setCharacterName("");
    }
  };

  const onRemoveCharacter = (id: string) => {
    if (characterStore.remove(id)) {
      setCharacters([...characterStore.fetchAll()]);
      setCharacterName("");
    }
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
      {characters.map((character) => (
        <div key={character.id}>
          {character.name}
          <Button
            className={"button"}
            value="start"
            onClick={(_: React.MouseEvent<HTMLInputElement>) => {
              onStart(character);
            }}
          />

          <Button
            className={"button"}
            value="remove"
            onClick={(_: React.MouseEvent<HTMLInputElement>) => {
              onRemoveCharacter(character.id);
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default CharacterCreateForm;
