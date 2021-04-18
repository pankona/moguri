import { Character, Direction } from "./Character";
import { InteractResult, Room } from "./Room";

type Choice = "eat" | "ignore" | "confirm";
type Phase = number | string;
const vegitableList = ["herb", "mushroom"] as const;

type Result = {
  updatedCharacter: Character;
  effect: number;
};

export const newVegitableRoom = (d: Direction[]): Room => {
  const v = vegitableList[Math.floor(Math.random() * vegitableList.length)];
  return vegitableRoom(v, d);
};

const vegitableRoom = (
  vegitable: typeof vegitableList[number],
  directions: Direction[]
) => ({
  firstInteraction: (c: Character): InteractResult => {
    return {
      phase: 0,
      imgSrc: imgSrc(vegitable),
      text: "An unknown grass is growing.",
      character: c,
      choices: ["eat", "ignore"] as Choice[],
    };
  },

  interact: (
    character: Character,
    currentPhase: Phase,
    choice: string
  ): InteractResult => {
    switch (currentPhase) {
      case 0:
        switch (choice) {
          case "eat":
            const result = eat(character, vegitable);
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
              imgSrc: imgSrc(vegitable),
              text: text,
              character: result.updatedCharacter,
              choices: ["confirm"] as Choice[],
            };

          case "ignore":
            return {
              phase: 1,
              imgSrc: imgSrc(vegitable),
              text: "You ignored the herb.",
              character: character,
              choices: ["confirm"] as Choice[],
            };
        }
    }

    console.log(currentPhase, choice);
    throw { error: "should not reach here :(" };
  },

  shouldShowNext: (currentPhase: Phase, choice: string): boolean => {
    return currentPhase === 1 && choice === "confirm";
  },

  edges: (): Direction[] => {
    return directions;
  },

  description: (): string => {
    return "It smells green";
  },
});

const imgSrc = (vegitable: typeof vegitableList[number]): string => {
  switch (vegitable) {
    case "herb":
      return "./assets/vegetable_rucola.png";
    case "mushroom":
      return "./assets/kinoko.png";
  }
};

const eat = (c: Character, v: typeof vegitableList[number]): Result => {
  switch (v) {
    case "herb":
      return eatHerb(c);
    case "mushroom":
      return eatMushroom(c);
  }
};

const eatHerb = (c: Character): Result => {
  const effect: number = -3 + Math.floor(Math.random() * Math.floor(9));
  return {
    updatedCharacter: { ...c, health: c.health + effect },
    effect: effect,
  };
};

const eatMushroom = (c: Character): Result => {
  const effect: number = -5 + Math.floor(Math.random() * Math.floor(9));
  return {
    updatedCharacter: { ...c, health: c.health + effect },
    effect: effect,
  };
};
