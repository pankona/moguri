import React from "react";
import { Character, CharacterState, Dangeon, Direction } from "./Character";

const DangeonScene: React.FC<{
  character: Character;
  onExitDangeon: () => void;
}> = ({ character, onExitDangeon }) => {
  const characterState = new CharacterState(
    { level: 0, x: 0, y: 1 },
    new Dangeon()
  );

  console.log(characterState, characterState.movableDirection());

  return (
    <div>
      hello, {character.name} ! you can move to{" "}
      {characterState.movableDirection().map((d: Direction) => (
        <div key={d}>{d}<input type="button" value="move" /></div>
      ))}
      <input type="button" value="exit" onClick={onExitDangeon} />
    </div>
  );
};

export default DangeonScene;
