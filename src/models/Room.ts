import { Character, Direction } from "./Character";
import { RoomList } from "./RoomList";

export interface Room {
  roomName(): typeof RoomList[number];
  firstInteraction(c: Character): InteractResult;
  interact(c: Character, currentPhase: number, choice: string): InteractResult;
  shouldShowNext(currentPhase: number, choice: string): boolean;
  edges(): Direction[];
  description(): string;
}

export type InteractResult = {
  phase: number;
  imgSrc: string;
  text: string;
  character: Character;
  choices: string[];
};
