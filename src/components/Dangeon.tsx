import React from "react";
import { Character } from "./Character";

const Dangeon: React.FC<{
  character: Character;
  onExitDangeon: () => void;
}> = ({ character, onExitDangeon }) => {
  return (
    <div>
      hello, {character.name} !
      <input type="button" value="exit" onClick={onExitDangeon} />
    </div>
  );
};

export default Dangeon;
