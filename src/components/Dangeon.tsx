import React from "react";
import {
  Character,
  CharacterState,
  Dangeon,
  Direction,
  Location,
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

  const onMove = (d: Direction) => {
    if (characterState.current.move(d)) {
      setCurrentLocation(characterState.current.location());
    }
  };

  return (
    <div>
      <div>hello, {character.name} !</div>
      <div>
        <div>your current location is level: {currentLocation.level}</div>
        <div>x: {currentLocation.x}</div>
        <div>y: {currentLocation.y}</div>
      </div>
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
      <input type="button" value="exit" onClick={onExitDangeon} />
    </div>
  );
};

export default DangeonScene;
