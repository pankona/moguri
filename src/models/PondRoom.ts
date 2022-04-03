import { Character, Direction } from "./Character";
import { InteractResult, Room } from "./Room";
import { RoomList } from "./RoomList";

type Choice = "drink" | "pump" | "ignore" | "confirm";
type Phase = number | string;

type Result = {
  updatedCharacter: Character;
  effect: number;
};

export const newPondRoom = (d: Direction[]) => {
  const imgSrc = "./assets/ike.png";
  return pondRoom(d, imgSrc);
};

const pondRoom = (directions: Direction[], imgSrc: string): Room => ({
  roomName: (): typeof RoomList[number] => {
    return "PondRoom";
  },

  firstInteraction: (c: Character): InteractResult => {
    return {
      phase: 0,
      imgSrc: imgSrc,
      text: "A pond is there.",
      character: c,
      choices: ["drink", /*"pump",*/ "ignore"] as Choice[],
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
          case "drink":
            const result = drinkRawPond(c);
            const text = "It was undrinkable water. You are feeling worse.";
            return {
              phase: 1,
              imgSrc: imgSrc,
              text: text,
              character: result.updatedCharacter,
              choices: ["confirm"] as Choice[],
            };
          case "pump":
            return {
              phase: 1,
              imgSrc: imgSrc,
              text: "not implemented yet :(",
              character: c,
              choices: ["confirm"] as Choice[],
            };

          case "ignore":
            return {
              phase: 1,
              imgSrc: imgSrc,
              text: "You ignored the pump.",
              character: c,
              choices: ["confirm"] as Choice[],
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
    return "It smells moisture";
  },
});

const drinkRawPond = (c: Character): Result => {
  const effect: number = -1 + -1 * Math.floor(Math.random() * Math.floor(4));
  return {
    updatedCharacter: { ...c, health: c.health + effect },
    effect: effect,
  };
};

const drinkBoiledPond = (c: Character): Result => {
  const effect: number = Math.floor(Math.random() * Math.floor(5));
  return {
    updatedCharacter: { ...c, health: c.health + effect },
    effect: effect,
  };
};

const pumpPond = (c: Character): Result => {
  // not implemented
  return {
    updatedCharacter: { ...c },
    effect: 0,
  };
};
