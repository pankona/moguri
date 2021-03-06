import { Character } from "./Character";
import firebase from "./firebase";

export interface CharacterStore {
  fetchAll: () => Character[];
  add: (c: Character) => boolean;
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

  private alreadyExists(character: Character): boolean {
    return this.characters.some((c) => {
      return c.name === character.name;
    });
  }
}
