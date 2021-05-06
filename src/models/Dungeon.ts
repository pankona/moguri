import { Room } from "./Room";
import { SerializedDungeon, roomFactory } from "./RoomList";

export type Dungeon = {
  rooms: Room[][];
};

export const generateDungeon = (): Dungeon => {
  const dungeon = generateSerializedDungeon();
  const left = dungeon.rooms[0].map<Room>((r) =>
    roomFactory(r.room)(r.directions)
  );
  const center = dungeon.rooms[1].map<Room>((r) =>
    roomFactory(r.room)(r.directions)
  );
  const right = dungeon.rooms[2].map<Room>((r) =>
    roomFactory(r.room)(r.directions)
  );
  return {
    rooms: [left, center, right],
  };
};

export const generateSerializedDungeon = (): SerializedDungeon => {
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
