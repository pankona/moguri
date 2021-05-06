import { v4 as uuidv4 } from "uuid";
import { CharacterState } from "./Character";
import { Dungeon } from "./Dungeon";
import { Room } from "./Room";
import { FloorInfo, roomFactory, RoomInfo } from "./RoomList";

export interface CharacterStateStore {
  Save: (id: string, c: CharacterState) => void;
  Load: (id: string) => CharacterState | undefined;
  Delete: (id: string) => void;
  add: (c: CharacterState) => boolean;
  fetchAll: () => CharacterState[];
}

const serializeDungeon = (cs: CharacterState): FloorInfo => {
  const left = cs.dungeon.rooms[0].map<RoomInfo>((r) => ({
    room: r.roomName(),
    directions: r.edges(),
  }));
  const center = cs.dungeon.rooms[1].map<RoomInfo>((r) => ({
    room: r.roomName(),
    directions: r.edges(),
  }));
  const right = cs.dungeon.rooms[2].map<RoomInfo>((r) => ({
    room: r.roomName(),
    directions: r.edges(),
  }));
  return {
    rooms: [left, center, right],
  };
};

const deserializeFloor = (floor: FloorInfo): Dungeon => {
  const left = floor.rooms[0].map<Room>((r) =>
    roomFactory(r.room)(r.directions)
  );
  const center = floor.rooms[1].map<Room>((r) =>
    roomFactory(r.room)(r.directions)
  );
  const right = floor.rooms[2].map<Room>((r) =>
    roomFactory(r.room)(r.directions)
  );
  return {
    rooms: [left, center, right],
  };
};

type serializedCharacterState = Omit<CharacterState, "dungeon"> & {
  floor: FloorInfo;
};

const LOCALSTORAGE_KEY_CHARACTER_STATES = "characterStates";

export const characterStateStoreLocalStorage = () => ({
  Save: (id: string, c: CharacterState) => {
    const serializedState: serializedCharacterState = {
      ...c,
      floor: serializeDungeon(c),
    };

    const storedCharacterStatesJSON = localStorage.getItem(
      LOCALSTORAGE_KEY_CHARACTER_STATES
    );
    if (!storedCharacterStatesJSON) {
      localStorage.setItem(
        LOCALSTORAGE_KEY_CHARACTER_STATES,
        JSON.stringify([serializedState])
      );
      return;
    }

    const storedCharacterStates: serializedCharacterState[] = JSON.parse(
      storedCharacterStatesJSON
    );

    const serializedCharacterStates = storedCharacterStates.filter(
      (cs) => cs.currentCharacter.id !== id
    );
    serializedCharacterStates.push(serializedState);

    localStorage.setItem(
      LOCALSTORAGE_KEY_CHARACTER_STATES,
      JSON.stringify(serializedCharacterStates)
    );
  },

  Load: (id: string): CharacterState | undefined => {
    const storedCharacterStatesJSON = localStorage.getItem(
      LOCALSTORAGE_KEY_CHARACTER_STATES
    );
    if (!storedCharacterStatesJSON) {
      return undefined;
    }

    const storedCharacterStates: serializedCharacterState[] = JSON.parse(
      storedCharacterStatesJSON
    );
    const ret = storedCharacterStates.find((cs) => {
      return cs.currentCharacter.id === id;
    });
    if (!ret) {
      return undefined;
    }
    return { ...ret, dungeon: deserializeFloor(ret.floor) };
  },

  Delete: (id: string) => {
    const storedCharacterStatesJSON = localStorage.getItem(
      LOCALSTORAGE_KEY_CHARACTER_STATES
    );
    if (!storedCharacterStatesJSON) {
      return;
    }

    const storedCharacterStates: serializedCharacterState[] = JSON.parse(
      storedCharacterStatesJSON
    );
    const result = storedCharacterStates.filter(
      (cs) => cs.currentCharacter.id !== id
    );

    localStorage.setItem(
      LOCALSTORAGE_KEY_CHARACTER_STATES,
      JSON.stringify(result)
    );
  },

  add: (c: CharacterState): boolean => {
    const serializedCharacterState: serializedCharacterState = {
      ...c,
      currentCharacter: { ...c.currentCharacter, id: uuidv4() },
      floor: serializeDungeon(c),
    };

    const storedCharacterStatesJSON = localStorage.getItem(
      LOCALSTORAGE_KEY_CHARACTER_STATES
    );
    if (!storedCharacterStatesJSON) {
      localStorage.setItem(
        LOCALSTORAGE_KEY_CHARACTER_STATES,
        JSON.stringify([serializedCharacterState])
      );
      return true;
    }

    const storedCharacterStates: serializedCharacterState[] = JSON.parse(
      storedCharacterStatesJSON
    );
    storedCharacterStates.push(serializedCharacterState);
    localStorage.setItem(
      LOCALSTORAGE_KEY_CHARACTER_STATES,
      JSON.stringify(storedCharacterStates)
    );

    return true;
  },

  fetchAll: (): CharacterState[] => {
    const storedCharacterStatesJSON = localStorage.getItem(
      LOCALSTORAGE_KEY_CHARACTER_STATES
    );
    if (!storedCharacterStatesJSON) {
      return [];
    }

    const storedCharacterStates: Array<serializedCharacterState> = JSON.parse(
      storedCharacterStatesJSON
    );
    return storedCharacterStates.map<CharacterState>((cs) => ({
      ...cs,
      dungeon: deserializeFloor(cs.floor),
    }));
  },
});
