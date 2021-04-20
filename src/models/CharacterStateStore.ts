import Cookies from "js-cookie";
import { CharacterState } from "./Character";

export interface CharacterStateStore {
  Save: (id: string, c: CharacterState) => void;
  Load: (id: string) => CharacterState | undefined;
}

export const characterStateStoreCookie = () => ({
  Save: (id: string, c: CharacterState) => {
    Cookies.set(id, c);
  },
  Load: (id: string): CharacterState | undefined => {
    const ret = Cookies.getJSON(id);
    if (ret) {
      return ret as CharacterState;
    }
    return undefined;
  },
});
