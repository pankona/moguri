import React from "react";
import {
  defaultRoomComponent,
  emptyRoomComponent,
  RoomComponent,
} from "./Room";

export interface Location {
  level: number;
  x: number;
  y: number;
}

export interface Character {
  id: string;
  name: string;
}

export class CharacterState {
  constructor(private currentLocation: Location, private dangeon: Dangeon) {}

  movableDirection(): Direction[] {
    const room = this.getRoomByLocation(this.currentLocation);
    return room.edge;
  }

  move(d: Direction): boolean {
    const newLocation = {
      level: this.currentLocation.level,
      x: ((): number => {
        switch (d) {
          case "right":
            return this.currentLocation.x + 1;
          case "straight":
            return this.currentLocation.x;
          case "left":
            return this.currentLocation.x - 1;
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

  private getRoomByLocation(l: Location): Room {
    return this.dangeon.rooms[l.x][l.y];
  }
}

export type Direction = "right" | "straight" | "left";

export type EventStatus = "in_progress" | "finished";

export interface Room {
  description: string;
  edge: Direction[];
  component: React.FC<RoomComponent>;
}

export class Dangeon {
  rooms: Room[][];

  constructor() {
    this.rooms = [
      [
        // left
        { component: defaultRoomComponent, description: "left side", edge: [] },
        {
          component: defaultRoomComponent,
          description: "left side",
          edge: ["straight", "right"],
        },
        {
          component: defaultRoomComponent,
          description: "left side",
          edge: ["straight", "right"],
        },
        {
          component: defaultRoomComponent,
          description: "left side",
          edge: ["straight", "right"],
        },
        {
          component: defaultRoomComponent,
          description: "left side",
          edge: ["straight", "right"],
        },
        {
          component: defaultRoomComponent,
          description: "left side",
          edge: ["straight", "right"],
        },
        {
          component: defaultRoomComponent,
          description: "left side",
          edge: ["straight", "right"],
        },
        {
          component: defaultRoomComponent,
          description: "left side",
          edge: ["straight", "right"],
        },
        {
          component: defaultRoomComponent,
          description: "left side",
          edge: ["straight", "right"],
        },
        {
          component: defaultRoomComponent,
          description: "left side",
          edge: ["straight", "right"],
        },
        {
          component: defaultRoomComponent,
          description: "left side",
          edge: ["right"],
        },
        { component: defaultRoomComponent, description: "left side", edge: [] },
      ],
      [
        // center
        {
          component: emptyRoomComponent,
          description: "start",
          edge: ["left", "straight", "right"],
        },
        {
          component: defaultRoomComponent,
          description: "center",
          edge: ["left", "straight", "right"],
        },
        {
          component: defaultRoomComponent,
          description: "center",
          edge: ["left", "straight", "right"],
        },
        {
          component: defaultRoomComponent,
          description: "center",
          edge: ["left", "straight", "right"],
        },
        {
          component: defaultRoomComponent,
          description: "center",
          edge: ["left", "straight", "right"],
        },
        {
          component: defaultRoomComponent,
          description: "center",
          edge: ["left", "straight", "right"],
        },
        {
          component: defaultRoomComponent,
          description: "center",
          edge: ["left", "straight", "right"],
        },
        {
          component: defaultRoomComponent,
          description: "center",
          edge: ["left", "straight", "right"],
        },
        {
          component: defaultRoomComponent,
          description: "center",
          edge: ["left", "straight", "right"],
        },
        {
          component: defaultRoomComponent,
          description: "center",
          edge: ["left", "straight", "right"],
        },
        {
          component: defaultRoomComponent,
          description: "center",
          edge: ["straight"],
        },
        { component: defaultRoomComponent, description: "end", edge: [] },
      ],
      [
        // right
        {
          component: defaultRoomComponent,
          description: "right side",
          edge: [],
        },
        {
          component: defaultRoomComponent,
          description: "right side",
          edge: ["left", "straight"],
        },
        {
          component: defaultRoomComponent,
          description: "right side",
          edge: ["left", "straight"],
        },
        {
          component: defaultRoomComponent,
          description: "right side",
          edge: ["left", "straight"],
        },
        {
          component: defaultRoomComponent,
          description: "right side",
          edge: ["left", "straight"],
        },
        {
          component: defaultRoomComponent,
          description: "right side",
          edge: ["left", "straight"],
        },
        {
          component: defaultRoomComponent,
          description: "right side",
          edge: ["left", "straight"],
        },
        {
          component: defaultRoomComponent,
          description: "right side",
          edge: ["left", "straight"],
        },
        {
          component: defaultRoomComponent,
          description: "right side",
          edge: ["left", "straight"],
        },
        {
          component: defaultRoomComponent,
          description: "right side",
          edge: ["left", "straight"],
        },
        {
          component: defaultRoomComponent,
          description: "right side",
          edge: ["left"],
        },
        {
          component: defaultRoomComponent,
          description: "right side",
          edge: [],
        },
      ],
    ];
  }
}
