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
}> = ({ character, onExitDangeon }) => {
  const characterState = React.useRef(
    new CharacterState({ level: 0, x: 1, y: 0 }, new Dangeon())
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
    <div className="dangeon">
      {eventStatus === "in_progress" ? (
        <div className="dangeon__room">
          <room.component
            room={room}
            character={character}
            onEventFinished={() => {
              setEventStatus("finished");
            }}
          />
        </div>
      ) : (
        <div className="dangeon__next">
          <NextRoom characterState={characterState.current} onMove={onMove} />
        </div>
      )}
      <div className="dangeon__character_status">
        <div>hello, {character.name}!</div>
        <div>
          your current location:
          <div>
            level: {currentLocation.level}, x:
            {currentLocation.x}, y:{currentLocation.y}
          </div>
          <div>Health: {character.health}</div>
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
      <div className="dangeon__next__visual">
        {characterState.movableDirection().map((d: Direction) => (
          <div key={d} className="dangeon__next__visual_choice">
            <div
              className="dangeon__next__visual_button"
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
      <div className="dangeon__next__description">choice next room</div>
    </>
  );
};

export default DangeonScene;
