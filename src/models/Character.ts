import { EmptyRoom } from "./EmptyRoom";
import { EntryRoom } from "./EntryRoom";
import { Room } from "./Room";
import { RoundevourRoom } from "./RoundevourRoom";
import { TerminalRoom } from "./TerminalRoom";
import { VegitableRoom } from "./VegitableRoom";

export interface Location {
  level: number;
  x: number;
  y: number;
}

export interface Character {
  id: string;
  name: string;
  greet: string;
  health: number;
}

export class CharacterState {
  constructor(
    private currentCharacter: Character,
    private currentLocation: Location,
    private dungeon: Dungeon
  ) {}

  movableDirection(): Direction[] {
    const room = this.getRoomByLocation(this.currentLocation);
    return room.edges();
  }

  nextRoom(d: Direction): Room {
    const room = this.getRoomByLocation(this.currentLocation);
    if (!this.isMovable(d, room)) {
      throw { error: "cannot move to the direction" };
    }

    const currentLocation = this.currentLocation;
    const nextRooms = this.dungeon.rooms.map(
      (r: Room[]): Room => {
        return r[currentLocation.y + 1];
      }
    );
    switch (d) {
      case "left":
        return nextRooms[0];
      case "center":
        return nextRooms[1];
      case "right":
        return nextRooms[2];
    }
  }

  move(d: Direction): boolean {
    const newLocation = {
      level: this.currentLocation.level,
      x: ((): number => {
        switch (d) {
          case "left":
            return 0;
          case "center":
            return 1;
          case "right":
            return 2;
        }
      })(),
      y: this.currentLocation.y + 1,
    };
    this.currentLocation = newLocation;
    return true;
  }

  character(): Character {
    return { ...this.currentCharacter };
  }

  location(): Location {
    return { ...this.currentLocation };
  }

  getRoom(): Room {
    return this.getRoomByLocation(this.currentLocation);
  }

  private isMovable(d: Direction, r: Room): boolean {
    return r.edges().includes(d);
  }

  private getRoomByLocation(l: Location): Room {
    return this.dungeon.rooms[l.x][l.y];
  }
}

export type Direction = "right" | "center" | "left";

export type EventStatus = "in_progress" | "finished";

export class Dungeon {
  rooms: Room[][];

  constructor() {
    this.rooms = [
      [
        // left
        new EmptyRoom([]),
        new VegitableRoom(["left"]),
        new VegitableRoom(["left"]),
        new VegitableRoom(["left"]),
        new VegitableRoom(["left"]),
        new EmptyRoom(["left"]),
        new EmptyRoom(["left"]),
        new EmptyRoom(["left"]),
        new EmptyRoom(["left"]),
        new EmptyRoom(["left"]),
        new EmptyRoom(["center"]),
        new EmptyRoom([]),
      ],
      [
        // center
        new EntryRoom(["left", "center", "right"]),
        new RoundevourRoom(["center"]),
        new EmptyRoom(["center"]),
        new EmptyRoom(["center"]),
        new EmptyRoom(["center"]),
        new EmptyRoom(["center"]),
        new EmptyRoom(["center"]),
        new EmptyRoom(["center"]),
        new EmptyRoom(["center"]),
        new EmptyRoom(["center"]),
        new EmptyRoom(["center"]),
        new TerminalRoom([]),
      ],
      [
        // right
        new EmptyRoom([]),
        new EmptyRoom(["center", "right"]),
        new EmptyRoom(["center", "right"]),
        new EmptyRoom(["center", "right"]),
        new EmptyRoom(["center", "right"]),
        new EmptyRoom(["center", "right"]),
        new EmptyRoom(["center", "right"]),
        new EmptyRoom(["center", "right"]),
        new EmptyRoom(["center", "right"]),
        new EmptyRoom(["center", "right"]),
        new EmptyRoom(["center"]),
        new EmptyRoom([]),
      ],
    ];
  }
}
