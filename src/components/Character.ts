import React from "react";
import { RoomType } from "./Room";

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
  roomType: RoomType;
}

export class Dangeon {
  rooms: Room[][];

  constructor() {
    this.rooms = [
      [
        // left
        { roomType: "default", description: "left side", edge: [] },
        {
          roomType: "default",
          description: "left side",
          edge: ["straight", "right"],
        },
        {
          roomType: "default",
          description: "left side",
          edge: ["straight", "right"],
        },
        {
          roomType: "default",
          description: "left side",
          edge: ["straight", "right"],
        },
        {
          roomType: "default",
          description: "left side",
          edge: ["straight", "right"],
        },
        {
          roomType: "default",
          description: "left side",
          edge: ["straight", "right"],
        },
        {
          roomType: "default",
          description: "left side",
          edge: ["straight", "right"],
        },
        {
          roomType: "default",
          description: "left side",
          edge: ["straight", "right"],
        },
        {
          roomType: "default",
          description: "left side",
          edge: ["straight", "right"],
        },
        {
          roomType: "default",
          description: "left side",
          edge: ["straight", "right"],
        },
        { roomType: "default", description: "left side", edge: ["right"] },
        { roomType: "default", description: "left side", edge: [] },
      ],
      [
        // center
        {
          roomType: "default",
          description: "start",
          edge: ["left", "straight", "right"],
        },
        {
          roomType: "default",
          description: "center",
          edge: ["left", "straight", "right"],
        },
        {
          roomType: "default",
          description: "center",
          edge: ["left", "straight", "right"],
        },
        {
          roomType: "default",
          description: "center",
          edge: ["left", "straight", "right"],
        },
        {
          roomType: "default",
          description: "center",
          edge: ["left", "straight", "right"],
        },
        {
          roomType: "default",
          description: "center",
          edge: ["left", "straight", "right"],
        },
        {
          roomType: "default",
          description: "center",
          edge: ["left", "straight", "right"],
        },
        {
          roomType: "default",
          description: "center",
          edge: ["left", "straight", "right"],
        },
        {
          roomType: "default",
          description: "center",
          edge: ["left", "straight", "right"],
        },
        {
          roomType: "default",
          description: "center",
          edge: ["left", "straight", "right"],
        },
        { roomType: "default", description: "center", edge: ["straight"] },
        { roomType: "default", description: "end", edge: [] },
      ],
      [
        // right
        { roomType: "default", description: "right side", edge: [] },
        {
          roomType: "default",
          description: "right side",
          edge: ["left", "straight"],
        },
        {
          roomType: "default",
          description: "right side",
          edge: ["left", "straight"],
        },
        {
          roomType: "default",
          description: "right side",
          edge: ["left", "straight"],
        },
        {
          roomType: "default",
          description: "right side",
          edge: ["left", "straight"],
        },
        {
          roomType: "default",
          description: "right side",
          edge: ["left", "straight"],
        },
        {
          roomType: "default",
          description: "right side",
          edge: ["left", "straight"],
        },
        {
          roomType: "default",
          description: "right side",
          edge: ["left", "straight"],
        },
        {
          roomType: "default",
          description: "right side",
          edge: ["left", "straight"],
        },
        {
          roomType: "default",
          description: "right side",
          edge: ["left", "straight"],
        },
        { roomType: "default", description: "right side", edge: ["left"] },
        { roomType: "default", description: "right side", edge: [] },
      ],
    ];
  }
}
