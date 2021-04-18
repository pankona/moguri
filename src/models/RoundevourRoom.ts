import { Character, Direction } from "./Character";
import { InteractResult } from "./Room";

type Choice = "greet" | "ignore" | "rob" | "confirm";
type Phase = number | string;

export const newRoundevourRoom = (d: Direction[]) => {
  const guest = {
    id: "",
    name: "John",
    greet: "...",
    health: 10,
  };
  return roundevourRoom(guest, d);
};

const roundevourRoom = (guest: Character, directions: Direction[]) => ({
  firstInteraction: (c: Character): InteractResult => {
    return {
      phase: 0,
      imgSrc: "./assets/silhouette_human05_man.png",
      text: "You meet someone.\nThere's a " + guest.name + ".",
      character: c,
      choices: ["greet"] as Choice[],
    };
  },

  interact: (
    character: Character,
    currentPhase: Phase,
    choice: Choice
  ): InteractResult => {
    switch (currentPhase) {
      case 0:
        switch (choice) {
          case "greet":
            return greet(guest, character);
        }
    }
    throw { error: "should not reach here :(" };
  },

  shouldShowNext(currentPhase: Phase, choice: string): boolean {
    return currentPhase === 1 && choice === "confirm";
  },

  edges(): Direction[] {
    return directions;
  },

  description(): string {
    return "Somebody is there";
  },
});

const greet = (guest: Character, c: Character): InteractResult => {
  return {
    phase: 1,
    imgSrc: "./assets/silhouette_human05_man.png",
    text: c.name + ": " + c.greet + guest.name + ": " + guest.greet,
    character: c,
    choices: ["confirm"] as Choice[],
  };
};
