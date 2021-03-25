import React from "react";
import { Button } from "./Button";
import {
  Character,
  CharacterState,
  Dangeon,
  Direction,
  EventStatus,
  Location,
  Room,
} from "./Character";

import "./Dangeon.css";

const DangeonScene: React.FC<{
  character: Character;
  onExitDangeon: () => void;
}> = ({ character }) => {
  const characterState = React.useRef(
    new CharacterState(character, { level: 0, x: 1, y: 0 }, new Dangeon())
  );

  const [currentCharacter, setCurrentCharacter] = React.useState<Character>(
    characterState.current.character()
  );

  const [currentLocation, setCurrentLocation] = React.useState<Location>(
    characterState.current.location()
  );

  const [room, setRoom] = React.useState<Room>(
    characterState.current.getRoom()
  );

  const onMove = (d: Direction) => {
    if (characterState.current.move(d)) {
      setCurrentLocation(characterState.current.location());
      setRoom(characterState.current.getRoom());
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
          <room.component
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
        {characterState.movableDirection().map((d: Direction) => (
          <div key={d} className="dungeon__next__visual_choice">
            <div
              className="dungeon__next__visual_button"
              key={d}
              onClick={() => {
                onMove(d);
              }}
            >
              {characterState.nextRoom(d).description}
            </div>
          </div>
        ))}
      </div>
      <div className="dungeon__next__description">choice next room</div>
    </>
  );
};

export default DangeonScene;
