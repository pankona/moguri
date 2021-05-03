import { Direction } from "./Character";
import { newEmptyRoom } from "./EmptyRoom";
import { Room } from "./Room";
import { newEntryRoom } from "./EntryRoom";
import { newPondRoom } from "./PondRoom";
import { newRoundevourRoom } from "./RoundevourRoom";
import { newTerminalRoom } from "./TerminalRoom";
import { newVegitableRoom } from "./VegitableRoom";

export const RoomList = [
  "EmptyRoom",
  "VegitableRoom",
  "EntryRoom",
  "RoundevourRoom",
  "TerminalRoom",
  "PondRoom",
] as const;

export const roomFactory = (
  roomName: typeof RoomList[number]
): ((d: Direction[]) => Room) => {
  switch (roomName) {
    case "EmptyRoom":
      return newEmptyRoom;
    case "VegitableRoom":
      return newVegitableRoom;
    case "EntryRoom":
      return newEntryRoom;
    case "RoundevourRoom":
      return newRoundevourRoom;
    case "TerminalRoom":
      return newTerminalRoom;
    case "PondRoom":
      return newPondRoom;
  }
};

export type RoomInfo = {
  room: typeof RoomList[number];
  directions: Direction[];
};

export type FloorInfo = {
  rooms: RoomInfo[][];
};
