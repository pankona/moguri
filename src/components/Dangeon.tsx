import React from "react";
import {
  Character,
  CharacterState,
  Dangeon,
  Direction,
  EventStatus,
  Location,
  Room,
} from "./Character";

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
    <div>
      <div>hello, {character.name} !</div>
      <div>
        your current location is level: {currentLocation.level}, x:
        {currentLocation.x}, y:{currentLocation.y}
      </div>
      {eventStatus === "in_progress" ? (
        <room.component
          room={room}
          character={character}
          onEventFinished={() => {
            setEventStatus("finished");
          }}
        />
      ) : (
        <div>
          you can move to
          {characterState.current.movableDirection().map((d: Direction) => (
            <div key={d}>
              {d}
              <input
                type="button"
                value="move"
                onClick={(_: React.MouseEvent<HTMLInputElement>) => {
                  onMove(d);
                }}
              />
            </div>
          ))}
        </div>
      )}
      <input type="button" value="exit" onClick={onExitDangeon} />
    </div>
  );
};

export default DangeonScene;
