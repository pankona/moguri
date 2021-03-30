import React from "react";
import { Character, Room } from "../Character";
import { Button, ButtonProps } from "../parts/Button";
import "../parts/Button.css";
import "./Room.css";

export interface RoomComponent {
  room: Room;
  character: Character;
  onCharacterChanged: (newCharacter: Character) => void;
  onEventFinished: () => void;
}

export const RoomVisual: React.FC<{ className: string; imgSrc: string }> = ({
  className,
  imgSrc,
}) => {
  return (
    <div className={className}>
      <img src={imgSrc} style={{ maxWidth: "100%", maxHeight: "100%" }} />
    </div>
  );
};

export const RoomDescription: React.FC<{
  className: string;
  description: JSX.Element;
  buttons: ButtonProps[];
}> = ({ className, description, buttons }) => {
  return (
    <div className={className}>
      {description}
      <div className="room__description_buttons">
        {buttons.map((b: ButtonProps) => (
          <Button
            key={b.value}
            className={b.className}
            value={b.value}
            onClick={b.onClick}
          />
        ))}
      </div>
    </div>
  );
};
