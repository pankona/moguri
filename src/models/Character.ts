import { Dungeon } from "./Dungeon";
import { InteractResult, Room } from "./Room";

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

export type CharacterState = {
  currentCharacter: Character;
  currentLocation: Location;
  currentInteractResult?: InteractResult;
  dungeon: Dungeon;
};

export const effect = (interactResult: InteractResult): InteractResult => {
  if (interactResult.character.health <= 0) {
    const character: Character = { ...interactResult.character, health: 0 };
    const text: string =
      interactResult.text + "... you died (press exit to return title)";
    const choices: string[] = [];
    return {
      ...interactResult,
      character: character,
      text: text,
      choices: choices,
    };
  }

  return interactResult;
};

export const movableDirection = (cs: CharacterState): Direction[] => {
  const room = roomByLocation(cs.dungeon, cs.currentLocation);
  return room.edges();
};

export const nextRoom = (cs: CharacterState, d: Direction): Room => {
  const room = roomByLocation(cs.dungeon, cs.currentLocation);
  if (!isMovable(d, room)) {
    throw { error: "cannot move to the direction" };
  }

  const currentLocation = cs.currentLocation;
  const nextRooms = cs.dungeon.rooms.map((r: Room[]): Room => {
    return r[currentLocation.y + 1];
  });
  switch (d) {
    case "left":
      return nextRooms[0];
    case "center":
      return nextRooms[1];
    case "right":
      return nextRooms[2];
  }
};

export const move = (cs: CharacterState, d: Direction): CharacterState => {
  const newLocation = {
    level: cs.currentLocation.level,
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
    y: cs.currentLocation.y + 1,
  };
  return {
    ...cs,
    currentLocation: newLocation,
  };
};

export const getRoom = (cs: CharacterState): Room => {
  return roomByLocation(cs.dungeon, cs.currentLocation);
};

const isMovable = (d: Direction, r: Room): boolean => {
  return r.edges().includes(d);
};

const roomByLocation = (d: Dungeon, l: Location): Room => {
  return d.rooms[l.x][l.y];
};

export type Direction = "right" | "center" | "left";

export type EventStatus = "in_progress" | "finished";
