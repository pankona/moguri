import React from "react";
import {
  Character,
  CharacterState,
  Direction,
  EventStatus,
  Location,
  generateDungeon,
  getRoom,
  move,
  movableDirection,
  nextRoom,
} from "../models/Character";
import { Room } from "../models/Room";
import { RoomComponent } from "./Room";

const DungeonScene: React.FC<{
  character: Character;
  onExitDungeon: () => void;
}> = ({ character }) => {
  const characterState = React.useRef<CharacterState>({
    currentCharacter: character,
    currentLocation: { level: 0, x: 1, y: 0 },
    dungeon: generateDungeon(),
  });

  const [currentCharacter, setCurrentCharacter] = React.useState<Character>(
    characterState.current.currentCharacter
  );

  const [currentLocation, setCurrentLocation] = React.useState<Location>(
    characterState.current.currentLocation
  );

  const [room, setRoom] = React.useState<Room>(getRoom(characterState.current));

  const onMove = (d: Direction) => {
    if (move(characterState.current, d)) {
      setCurrentLocation(characterState.current.currentLocation);
      setRoom(getRoom(characterState.current));
      setEventStatus("in_progress");
    }
  };

  const [eventStatus, setEventStatus] = React.useState<EventStatus>(
    "in_progress"
  );

  return (
    <div className="dungeon">
      {eventStatus === "in_progress" ? (
        <div className="dungeon__room">
          <RoomComponent
            room={room}
            character={currentCharacter}
            onCharacterChanged={(newCharacter: Character) => {
              setCurrentCharacter(newCharacter);
            }}
            onEventFinished={() => {
              setEventStatus("finished");
            }}
          />
        </div>
      ) : (
        <div className="dungeon__next">
          <NextRoom characterState={characterState.current} onMove={onMove} />
        </div>
      )}
      <div className="dungeon__character_status">
        <div>Hello, {currentCharacter.name}!</div>
        <div>
          your current location:
          <div>
            level: {currentLocation.level}, x:
            {currentLocation.x}, y:{currentLocation.y}
          </div>
          <div>Health: {currentCharacter.health}</div>
        </div>
      </div>
    </div>
  );
};

const NextRoom: React.FC<{
  characterState: CharacterState;
  onMove: (d: Direction) => void;
}> = ({ characterState, onMove }) => {
  return (
    <>
      <div className="dungeon__next__visual">
        {movableDirection(characterState).map((d: Direction) => (
          <div key={d} className="dungeon__next__visual_choice">
            <div
              className="dungeon__next__visual_button"
              key={d}
              onClick={() => {
                onMove(d);
              }}
            >
              {nextRoom(characterState, d).description()}
            </div>
          </div>
        ))}
      </div>
      <div className="dungeon__next__description">choice next room</div>
    </>
  );
};

export default DungeonScene;
