import React, { useEffect } from "react";
import { CharacterStore } from "./CharacterStore";
import { Character } from "./Character";

const CharacterCreateForm: React.FC<{
  characterStore: CharacterStore;
}> = ({ characterStore }) => {
  const [characterName, setCharacterName] = React.useState<string>("");

  const onCharacterNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCharacterName(e.target.value);
  };

  const [characters, setCharacters] = React.useState<Character[]>([]);

  useEffect(() => {
    setCharacters(characterStore.fetchAll());
  }, []);

  const onSubmitCharacterCreate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newCharacter = { id: "", name: characterName };
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

  return (
    <div>
      <div>input new character name</div>
      <form onSubmit={onSubmitCharacterCreate}>
        <input
          type="text"
          value={characterName}
          onChange={onCharacterNameChange}
        />
        <input type="submit" name="submit" />
      </form>
      <div>characters</div>
      {characters.map((character) => (
        <div key={character.id}>
          {character.name}
          <input
            type="button"
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
