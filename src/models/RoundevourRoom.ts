import { Character, Direction } from "./Character";
import { InteractResult, Room } from "./Room";

type Choice = "greet" | "ignore" | "rob" | "confirm";
type Phase = number | string;

export class RoundevourRoom implements Room {
  private guest: Character;

  constructor(private directions: Direction[]) {
    // TODO: fetch user data from firebase
    this.guest = {
      id: "",
      name: "John",
      greet: "...",
      health: 10,
    };
  }

  firstInteraction(c: Character): InteractResult {
    return {
      phase: 0,
      imgSrc: "./assets/silhouette_human05_man.png",
      text: "You meet someone.\nThere's a " + this.guest.name + ".",
      character: c,
      choices: ["greet"] as Choice[],
    };
  }

  interact(
    character: Character,
    currentPhase: Phase,
    choice: Choice
  ): InteractResult {
    switch (currentPhase) {
      case 0:
        switch (choice) {
          case "greet":
            return this.greet(character);
        }
    }
    throw { error: "should not reach here :(" };
  }

  shouldShowNext(currentPhase: Phase, choice: string): boolean {
    return currentPhase === 1 && choice === "confirm";
  }

  edges(): Direction[] {
    return this.directions;
  }

  description(): string {
    return "Somebody is there";
  }

  private greet(c: Character): InteractResult {
    return {
      phase: 1,
      imgSrc: "./assets/silhouette_human05_man.png",
      text: c.name + ": " + c.greet + this.guest.name + ": " + this.guest.greet,
      character: c,
      choices: ["confirm"] as Choice[],
    };
  }
}
