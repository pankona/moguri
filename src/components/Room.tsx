import React from "react";
import { Character } from "../models/Character";
import { Room } from "../models/Room";
import { Button } from "./parts/Button";

export const RoomComponent: React.FC<{
  room: Room;
  character: Character;
  onCharacterChanged: (newCharacter: Character) => void;
  onEventFinished: () => void;
}> = ({ room, character, onCharacterChanged, onEventFinished }) => {
  const [interaction, setInteraction] = React.useState(
    room.firstInteraction(character)
  );

  const onInteract = (choice: string) => {
    if (room.shouldShowNext(interaction.phase, choice)) {
      onEventFinished();
      return;
    }
    const result = room.interact(character, interaction.phase, choice);
    onCharacterChanged({ ...result.character });
    setInteraction(result);
  };

  return (
    <>
      <RoomVisual className="room__visual" imgSrc={interaction.imgSrc} />
      <RoomDescription
        className="room__description"
        interaction={interaction}
        onInteract={onInteract}
      />
    </>
  );
};

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
  interaction: {
    phase: number;
    text: string;
    choices: string[];
  };
  onInteract: (choice: string) => void;
}> = ({ className, interaction, onInteract }) => {
  return (
    <div className={className}>
      {interaction.text}
      <div className="room__description_buttons">
        {interaction.choices.map((c: string) => (
          <Button
            key={c}
            className="button"
            value={c}
            onClick={() => {
              onInteract(c);
            }}
          />
        ))}
      </div>
    </div>
  );
};
