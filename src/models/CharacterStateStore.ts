import Cookies from "js-cookie";
import { CharacterState } from "./Character";
import { Dungeon } from "./Dungeon";
import { Room } from "./Room";
import { FloorInfo, roomFactory, RoomInfo } from "./RoomList";

export interface CharacterStateStore {
  Save: (id: string, c: CharacterState) => void;
  Load: (id: string) => CharacterState | undefined;
  Delete: (id: string) => void;
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

export const characterStateStoreCookie = () => ({
  Save: (id: string, c: CharacterState) => {
    const floor = serializeDungeon(c);
    const serializedState: serializedCharacterState = { ...c, floor: floor };
    Cookies.set(id, serializedState);
  },
  Load: (id: string): CharacterState | undefined => {
    const ret = Cookies.getJSON(id) as serializedCharacterState;
    if (ret) {
      return { ...ret, dungeon: deserializeFloor(ret.floor) };
    }
    return undefined;
  },
  Delete: (id: string) => {
    Cookies.remove(id);
  },
});
