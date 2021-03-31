import { Character, Direction } from "./Character";
import { InteractResult, Room } from "./Room";

type Choice = "confirm";
type Phase = number | string;

export class EmptyRoom implements Room {
  constructor(private directions: Direction[]) {}

  firstInteraction(c: Character): InteractResult {
    return {
      phase: 0,
      imgSrc: "./assets/kanban_jyunbi.png",
      text: "Nothing in this room",
      character: c,
      choices: ["confirm"] as Choice[],
    };
  }

  interact(
    _c: Character,
    _currentPhase: Phase,
    _choice: string
  ): InteractResult {
    throw { error: "should not reach here :(" };
  }

  shouldShowNext(currentPhase: Phase, choice: string): boolean {
    return currentPhase === 0 && choice === "confirm";
  }

  edges(): Direction[] {
    return this.directions;
  }

  description(): string {
    return "There is nothing";
  }
}
