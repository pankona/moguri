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
          you can move to
          {characterState.current.movableDirection().map((d: Direction) => (
            <div key={d}>
              {d}
              <Button
                className="button"
                value="move"
                onClick={(_: React.MouseEvent<HTMLInputElement>) => {
                  onMove(d);
                }}
              />
            </div>
          ))}
        </div>
      )}
      <div className="dangeon__character_status">
        <div>hello, {character.name} !</div>
        <div>
          your current location is level: {currentLocation.level}, x:
          {currentLocation.x}, y:{currentLocation.y}
        </div>
        <Button className="button" value="exit" onClick={onExitDangeon} />
      </div>
    </div>
  );
};

export default DangeonScene;
