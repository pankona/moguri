import { newEmptyRoom } from "./EmptyRoom";
import { newEntryRoom } from "./EntryRoom";
import { newPondRoom } from "./PondRoom";
import { Room } from "./Room";
import { newRoundevourRoom } from "./RoundevourRoom";
import { newTerminalRoom } from "./TerminalRoom";
import { newVegitableRoom } from "./VegitableRoom";

export type Dungeon = {
  rooms: Room[][];
};

export const generateDungeon = (): Dungeon => {
  return {
    rooms: [
      [
        // left
        newEmptyRoom([]),
        newVegitableRoom(["left"]),
        newVegitableRoom(["left"]),
        newVegitableRoom(["left"]),
        newVegitableRoom(["left"]),
        newEmptyRoom(["left"]),
        newEmptyRoom(["left"]),
        newEmptyRoom(["left"]),
        newEmptyRoom(["left"]),
        newEmptyRoom(["left"]),
        newEmptyRoom(["center"]),
        newEmptyRoom([]),
      ],
      [
        // center
        newEntryRoom(["left", "center", "right"]),
        newRoundevourRoom(["center"]),
        newEmptyRoom(["center"]),
        newEmptyRoom(["center"]),
        newEmptyRoom(["center"]),
        newEmptyRoom(["center"]),
        newEmptyRoom(["center"]),
        newEmptyRoom(["center"]),
        newEmptyRoom(["center"]),
        newEmptyRoom(["center"]),
        newEmptyRoom(["center"]),
        newTerminalRoom([]),
      ],
      [
        // right
        newEmptyRoom([]),
        newPondRoom(["center", "right"]),
        newEmptyRoom(["center", "right"]),
        newEmptyRoom(["center", "right"]),
        newEmptyRoom(["center", "right"]),
        newEmptyRoom(["center", "right"]),
        newEmptyRoom(["center", "right"]),
        newEmptyRoom(["center", "right"]),
        newEmptyRoom(["center", "right"]),
        newEmptyRoom(["center", "right"]),
        newEmptyRoom(["center"]),
        newEmptyRoom([]),
      ],
    ],
  };
};
