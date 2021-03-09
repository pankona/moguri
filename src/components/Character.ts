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
        // start
        { description: "start", edge: [] },
        { description: "start", edge: ["right", "straight", "left"] },
        { description: "start", edge: [] },
      ],
      [
        // left
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
      ],
      [
        // center
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
      ],
      [
        // right
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
      ],
      [
        // end
        { description: "end", edge: [] },
      ],
    ];
  }
}
