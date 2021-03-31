import { Character, Direction } from "./Character";

export interface Room {
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
