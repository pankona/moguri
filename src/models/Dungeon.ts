import { Room } from "./Room";
import { FloorInfo, RoomInfo, roomFactory } from "./RoomList";

export type Dungeon = {
  rooms: Room[][];
};

export const generateDungeon = (): Dungeon => {
  const floor = generateFloor();
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

export const generateFloor = (): FloorInfo => {
  return {
    rooms: [
      [
        // left
        { room: "EmptyRoom", directions: [] },
        { room: "VegitableRoom", directions: ["left"] },
        { room: "VegitableRoom", directions: ["left"] },
        { room: "VegitableRoom", directions: ["left"] },
        { room: "VegitableRoom", directions: ["left"] },
        { room: "EmptyRoom", directions: ["left"] },
        { room: "EmptyRoom", directions: ["left"] },
        { room: "EmptyRoom", directions: ["left"] },
        { room: "EmptyRoom", directions: ["left"] },
        { room: "EmptyRoom", directions: ["left"] },
        { room: "EmptyRoom", directions: ["center"] },
        { room: "EmptyRoom", directions: [] },
      ],
      [
        // center
        { room: "EntryRoom", directions: ["left", "center", "right"] },
        { room: "RoundevourRoom", directions: ["center"] },
        { room: "EmptyRoom", directions: ["center"] },
        { room: "EmptyRoom", directions: ["center"] },
        { room: "EmptyRoom", directions: ["center"] },
        { room: "EmptyRoom", directions: ["center"] },
        { room: "EmptyRoom", directions: ["center"] },
        { room: "EmptyRoom", directions: ["center"] },
        { room: "EmptyRoom", directions: ["center"] },
        { room: "EmptyRoom", directions: ["center"] },
        { room: "EmptyRoom", directions: ["center"] },
        { room: "TerminalRoom", directions: [] },
      ],
      [
        // right
        { room: "EmptyRoom", directions: [] },
        { room: "PondRoom", directions: ["center", "right"] },
        { room: "PondRoom", directions: ["center", "right"] },
        { room: "PondRoom", directions: ["center", "right"] },
        { room: "PondRoom", directions: ["center", "right"] },
        { room: "PondRoom", directions: ["center", "right"] },
        { room: "PondRoom", directions: ["center", "right"] },
        { room: "PondRoom", directions: ["center", "right"] },
        { room: "PondRoom", directions: ["center", "right"] },
        { room: "PondRoom", directions: ["center", "right"] },
        { room: "EmptyRoom", directions: ["center"] },
        { room: "EmptyRoom", directions: [] },
      ],
    ],
  };
};
