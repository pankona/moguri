import { Character, Direction } from "./Character";
import { InteractResult } from "./Room";

type Choice = "search" | "confirm";
type Phase = number | string;

export const newTerminalRoom = (directions: Direction[]) => ({
  firstInteraction: (c: Character): InteractResult => {
    return {
      phase: 0,
      imgSrc: "./assets/kanban_jyunbi.png",
      text: "It is the dead end.",
      character: c,
      choices: ["search"] as Choice[],
    };
  },

  interact: (
    c: Character,
    currentPhase: Phase,
    choice: string
  ): InteractResult => {
    switch (currentPhase) {
      case 0:
        switch (choice) {
          case "search":
            return {
              phase: 1,
              imgSrc: "./assets/kanban_jyunbi.png",
              text:
                "You couldn't find anything." +
                "It seems it is not implemented yet..." +
                "(Press exit to end game)",
              character: c,
              choices: [] as Choice[],
            };
        }
    }
    throw { error: "should not reach here :(" };
  },

  shouldShowNext: (currentPhase: Phase, choice: string): boolean => {
    return currentPhase === 1 && choice === "confirm";
  },

  edges: (): Direction[] => {
    return directions;
  },

  description: (): string => {
    return "It is dead end";
  },
});
