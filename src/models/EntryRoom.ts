import { Character, Direction } from "./Character";
import { InteractResult, Room } from "./Room";
import { RoomList } from "./RoomList";

type Choice = "confirm";
type Phase = number | string;

export const newEntryRoom = (directions: Direction[]): Room => ({
  roomName: (): typeof RoomList[number]  => {
    return "EntryRoom"
  },

  firstInteraction: (c: Character): InteractResult => {
    return {
      phase: 0,
      imgSrc: "./assets/doukutsu.png",
      text:
        "It is the very beginning of the adventure.\n" +
        "You entered the dungeon.",
      character: c,
      choices: ["confirm"] as Choice[],
    };
  },

  interact: (
    _c: Character,
    _currentPhase: Phase,
    _choice: string
  ): InteractResult => {
    throw { error: "should not reach here :(" };
  },

  shouldShowNext: (currentPhase: Phase, choice: string): boolean => {
    return currentPhase === 0 && choice === "confirm";
  },

  edges: (): Direction[] => {
    return directions;
  },

  description: (): string => {
    return "entry room";
  },
});
