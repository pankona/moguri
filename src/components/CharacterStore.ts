import Cookies from "js-cookie";
import { Character } from "./Character";
import firebase from "./firebase";

export interface CharacterStore {
  fetchAll: () => Character[];
  add: (c: Character) => boolean;
  remove: (id: string) => boolean;
}

export class CharacterStoreMemory implements CharacterStore {
  constructor(private user: firebase.User) {}

  fetchAll(): Character[] {
    const characters = Cookies.getJSON("characters") as Character[];
    if (characters) {
      return characters;
    }

    Cookies.set("characters", []);
    return [];
  }

  add(newCharacter: Character): boolean {
    if (newCharacter.name === "") {
      return false;
    }
    const characters = Cookies.getJSON("characters") as Character[];
    if (this.alreadyExists(characters, newCharacter)) {
      return false;
    }
    if (characters.length >= 3) {
      return false;
    }
    newCharacter.id = this.user.uid + "_" + newCharacter.name;
    characters.push(newCharacter);
    Cookies.set("characters", characters);
    return true;
  }

  remove(id: string): boolean {
    const characters = Cookies.getJSON("characters") as Character[];
    const newCharacters = characters.filter((c: Character): boolean => {
      return c.id !== id;
    });
    if (newCharacters.length === characters.length) {
      return false;
    }
    Cookies.set("characters", newCharacters);
    return true;
  }

  private alreadyExists(
    currentCharacters: Character[],
    newCharacter: Character
  ): boolean {
    return currentCharacters.some((c) => {
      return c.name === newCharacter.name;
    });
  }
}
