import React from "react";
import {
  EmptyRoomComponent,
  RoomComponent,
  RoundevourRoomComponent,
  TerminalRoomComponent,
} from "./Room";

export interface Location {
  level: number;
  x: number;
  y: number;
}

export interface Character {
  id: string;
  name: string;
  greet: string;
}

export class CharacterState {
  constructor(private currentLocation: Location, private dangeon: Dangeon) {}

  movableDirection(): Direction[] {
    const room = this.getRoomByLocation(this.currentLocation);
    return room.edge;
  }

  nextRoom(d: Direction): Room {
    const room = this.getRoomByLocation(this.currentLocation);
    if (!this.isMovable(d, room)) {
      throw { error: "cannot move to the direction" };
    }

    const currentLocation = this.currentLocation;
    const nextRooms = this.dangeon.rooms.map(
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

  location(): Location {
    return { ...this.currentLocation };
  }

  getRoom(): Room {
    return this.getRoomByLocation(this.currentLocation);
  }

  private isMovable(d: Direction, r: Room): boolean {
    return r.edge.includes(d);
  }

  private getRoomByLocation(l: Location): Room {
    return this.dangeon.rooms[l.x][l.y];
  }
}

export type Direction = "right" | "center" | "left";

export type EventStatus = "in_progress" | "finished";

export interface Room {
  description: string;
  edge: Direction[];
  component: React.FC<RoomComponent>;
}

export const movableDirection = (room: Room): Direction[] => {
  return room.edge;
};

export class Dangeon {
  rooms: Room[][];

  constructor() {
    this.rooms = [
      [
        // left
        {
          component: EmptyRoomComponent,
          description: "There is nothing",
          edge: [],
        },
        {
          component: EmptyRoomComponent,
          description: "There is nothing",
          edge: ["left"],
        },
        {
          component: EmptyRoomComponent,
          description: "There is nothing",
          edge: ["left"],
        },
        {
          component: EmptyRoomComponent,
          description: "There is nothing",
          edge: ["left"],
        },
        {
          component: EmptyRoomComponent,
          description: "There is nothing",
          edge: ["left"],
        },
        {
          component: EmptyRoomComponent,
          description: "There is nothing",
          edge: ["left"],
        },
        {
          component: EmptyRoomComponent,
          description: "There is nothing",
          edge: ["left"],
        },
        {
          component: EmptyRoomComponent,
          description: "There is nothing",
          edge: ["left"],
        },
        {
          component: EmptyRoomComponent,
          description: "There is nothing",
          edge: ["left"],
        },
        {
          component: EmptyRoomComponent,
          description: "There is nothing",
          edge: ["left"],
        },
        {
          component: EmptyRoomComponent,
          description: "There is nothing",
          edge: ["center"],
        },
        {
          component: EmptyRoomComponent,
          description: "There is nothing",
          edge: [],
        },
      ],
      [
        // center
        {
          component: EmptyRoomComponent,
          description: "start",
          edge: ["left", "center", "right"],
        },
        {
          component: RoundevourRoomComponent,
          description: "Somebody is there",
          edge: ["center"],
        },
        {
          component: EmptyRoomComponent,
          description: "There is nothing",
          edge: ["center"],
        },
        {
          component: EmptyRoomComponent,
          description: "There is nothing",
          edge: ["center"],
        },
        {
          component: EmptyRoomComponent,
          description: "There is nothing",
          edge: ["center"],
        },
        {
          component: EmptyRoomComponent,
          description: "There is nothing",
          edge: ["center"],
        },
        {
          component: EmptyRoomComponent,
          description: "There is nothing",
          edge: ["center"],
        },
        {
          component: EmptyRoomComponent,
          description: "There is nothing",
          edge: ["center"],
        },
        {
          component: EmptyRoomComponent,
          description: "There is nothing",
          edge: ["center"],
        },
        {
          component: EmptyRoomComponent,
          description: "There is nothing",
          edge: ["center"],
        },
        {
          component: EmptyRoomComponent,
          description: "There is nothing",
          edge: ["center"],
        },
        {
          component: TerminalRoomComponent,
          description: "It is dead end",
          edge: [],
        },
      ],
      [
        // right
        {
          component: EmptyRoomComponent,
          description: "There is nothing",
          edge: [],
        },
        {
          component: EmptyRoomComponent,
          description: "There is nothing",
          edge: ["center", "right"],
        },
        {
          component: EmptyRoomComponent,
          description: "There is nothing",
          edge: ["center", "right"],
        },
        {
          component: EmptyRoomComponent,
          description: "There is nothing",
          edge: ["center", "right"],
        },
        {
          component: EmptyRoomComponent,
          description: "There is nothing",
          edge: ["center", "right"],
        },
        {
          component: EmptyRoomComponent,
          description: "There is nothing",
          edge: ["center", "right"],
        },
        {
          component: EmptyRoomComponent,
          description: "There is nothing",
          edge: ["center", "right"],
        },
        {
          component: EmptyRoomComponent,
          description: "There is nothing",
          edge: ["center", "right"],
        },
        {
          component: EmptyRoomComponent,
          description: "There is nothing",
          edge: ["center", "right"],
        },
        {
          component: EmptyRoomComponent,
          description: "There is nothing",
          edge: ["center", "right"],
        },
        {
          component: EmptyRoomComponent,
          description: "There is nothing",
          edge: ["center"],
        },
        {
          component: EmptyRoomComponent,
          description: "There is nothing",
          edge: [],
        },
      ],
    ];
  }
}
