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

  private getRoomByLocation(l: Location): Room {
    return this.dangeon.rooms[l.x][l.y];
  }
}

export type Direction = "right" | "straight" | "left";

export interface Room {
  description: string;
  edge: Direction[];
}

export class Dangeon {
  rooms: Room[][];

  constructor() {
    this.rooms = [
      [
        // left
        { description: "left side", edge: [] },
        { description: "left side", edge: ["straight", "right"] },
        { description: "left side", edge: ["straight", "right"] },
        { description: "left side", edge: ["straight", "right"] },
        { description: "left side", edge: ["straight", "right"] },
        { description: "left side", edge: ["straight", "right"] },
        { description: "left side", edge: ["straight", "right"] },
        { description: "left side", edge: ["straight", "right"] },
        { description: "left side", edge: ["straight", "right"] },
        { description: "left side", edge: ["straight", "right"] },
        { description: "left side", edge: ["right"] },
        { description: "left side", edge: [] },
      ],
      [
        // center
        { description: "start", edge: ["left", "straight", "right"] },
        { description: "center", edge: ["left", "straight", "right"] },
        { description: "center", edge: ["left", "straight", "right"] },
        { description: "center", edge: ["left", "straight", "right"] },
        { description: "center", edge: ["left", "straight", "right"] },
        { description: "center", edge: ["left", "straight", "right"] },
        { description: "center", edge: ["left", "straight", "right"] },
        { description: "center", edge: ["left", "straight", "right"] },
        { description: "center", edge: ["left", "straight", "right"] },
        { description: "center", edge: ["left", "straight", "right"] },
        { description: "center", edge: ["straight"] },
        { description: "end", edge: [] },
      ],
      [
        // right
        { description: "right side", edge: [] },
        { description: "right side", edge: ["left", "straight"] },
        { description: "right side", edge: ["left", "straight"] },
        { description: "right side", edge: ["left", "straight"] },
        { description: "right side", edge: ["left", "straight"] },
        { description: "right side", edge: ["left", "straight"] },
        { description: "right side", edge: ["left", "straight"] },
        { description: "right side", edge: ["left", "straight"] },
        { description: "right side", edge: ["left", "straight"] },
        { description: "right side", edge: ["left", "straight"] },
        { description: "right side", edge: ["left"] },
        { description: "right side", edge: [] },
      ],
    ];
  }
}
