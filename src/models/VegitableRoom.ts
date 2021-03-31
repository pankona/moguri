import { Character, Direction } from "./Character";
import { InteractResult, Room } from "./Room";

type Choice = "eat" | "ignore" | "confirm";
type Phase = number | string;
const vegitableList = ["herb", "mushroom"] as const;

type Result = {
  updatedCharacter: Character;
  effect: number;
};

export class VegitableRoom implements Room {
  private vegitable: typeof vegitableList[number];

  constructor(private directions: Direction[]) {
    this.vegitable =
      vegitableList[Math.floor(Math.random() * vegitableList.length)];
  }

  firstInteraction(c: Character): InteractResult {
    return {
      phase: 0,
      imgSrc: this.imgSrc(),
      text: "An unknown grass is growing.",
      character: c,
      choices: ["eat", "ignore"] as Choice[],
    };
  }

  interact(
    character: Character,
    currentPhase: Phase,
    choice: string
  ): InteractResult {
    switch (currentPhase) {
      case 0:
        switch (choice) {
          case "eat":
            const result = this.eat(character, this.vegitable);
            const text = ((): string => {
              if (result.effect > 0) {
                return "You are feeling better.";
              } else if (result.effect < 0) {
                return "You are feeling worse.";
              }
              return "Nothing happened";
            })();
            return {
              phase: 1,
              imgSrc: this.imgSrc(),
              text: text,
              character: result.updatedCharacter,
              choices: ["confirm"] as Choice[],
            };

          case "ignore":
            return {
              phase: 1,
              imgSrc: this.imgSrc(),
              text: "You ignored the herb.",
              character: character,
              choices: ["confirm"] as Choice[],
            };
        }
    }

    console.log(currentPhase, choice);
    throw { error: "should not reach here :(" };
  }

  shouldShowNext(currentPhase: Phase, choice: string): boolean {
    return currentPhase === 1 && choice === "confirm";
  }

  edges(): Direction[] {
    return this.directions;
  }

  description(): string {
    return "It smells green";
  }

  private imgSrc(): string {
    switch (this.vegitable) {
      case "herb":
        return "./assets/vegetable_rucola.png";
      case "mushroom":
        return "./assets/kinoko.png";
    }
  }

  private eat(c: Character, v: typeof vegitableList[number]): Result {
    switch (v) {
      case "herb":
        return this.eatHerb(c);
      case "mushroom":
        return this.eatMushroom(c);
    }
  }

  private eatHerb(c: Character): Result {
    const effect: number = -3 + Math.floor(Math.random() * Math.floor(9));
    return {
      updatedCharacter: { ...c, health: c.health + effect },
      effect: effect,
    };
  }

  private eatMushroom(c: Character): Result {
    const effect: number = -5 + Math.floor(Math.random() * Math.floor(9));
    return {
      updatedCharacter: { ...c, health: c.health + effect },
      effect: effect,
    };
  }
}
