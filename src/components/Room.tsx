import React, { FC } from "react";
import { CharacterState } from "../models/Character";
import { InteractResult, Room } from "../models/Room";
import { Button } from "./parts/Button";

export const RoomComponent: FC<{
  room: Room;
  characterState: CharacterState;
  onCharacterStateUpdated: (updatedCharacterState: CharacterState) => void;
  onEventFinished: () => void;
}> = ({ room, characterState, onCharacterStateUpdated, onEventFinished }) => {
  const [interaction, setInteraction] = React.useState<InteractResult>(
    characterState.currentInteractResult
      ? characterState.currentInteractResult
      : room.firstInteraction(characterState.currentCharacter)
  );

  const onInteract = (choice: string) => {
    if (room.shouldShowNext(interaction.phase, choice)) {
      onEventFinished();
      return;
    }
    const result = room.interact(
      characterState.currentCharacter,
      interaction.phase,
      choice
    );
    onCharacterStateUpdated({
      ...characterState,
      ...{
        currentCharacter: result.character,
        currentInteractResult: result,
      },
    });
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

export const RoomVisual: FC<{ className: string; imgSrc: string }> = ({
  className,
  imgSrc,
}) => {
  return (
    <div className={className}>
      <img src={imgSrc} style={{ maxWidth: "100%", maxHeight: "100%" }} />
    </div>
  );
};

export const RoomDescription: FC<{
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
