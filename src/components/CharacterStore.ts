import { Character } from "./Character";
import firebase from "./firebase";

export interface CharacterStore {
  fetchAll: () => Character[];
  add: (c: Character) => boolean;
  remove: (id: string) => boolean;
}

export class CharacterStoreMemory implements CharacterStore {
  private characters: Character[];

  constructor(private user: firebase.User) {
    this.characters = [];
  }

  fetchAll(): Character[] {
    return this.characters;
  }

  add(newCharacter: Character): boolean {
    if (this.alreadyExists(newCharacter)) {
      return false;
    }
    newCharacter.id = this.user.uid + "_" + newCharacter.name;
    this.characters.push(newCharacter);
    return true;
  }

  remove(id: string): boolean {
    const newCharacters = this.characters.filter((c: Character): boolean => {
      return c.id !== id;
    });
    if (newCharacters.length === this.characters.length) {
      return false;
    }
    this.characters = newCharacters;
    return true;
  }

  private alreadyExists(character: Character): boolean {
    return this.characters.some((c) => {
      return c.name === character.name;
    });
  }
}
