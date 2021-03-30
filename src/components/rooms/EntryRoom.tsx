import React from "react";
import { ButtonProps } from "../parts/Button";
import { RoomComponent, RoomDescription, RoomVisual } from "./Room";

export const EntryRoomComponent: React.FC<RoomComponent> = ({
  onEventFinished,
}) => {
  const description = (
    <>
      <div>It is the very beginning of the adventure.</div>
      <div>You entered the dungeon.</div>
    </>
  );
  const confirmButton: ButtonProps = {
    className: "room__description_button",
    value: "Confirmed",
    onClick: () => {
      onEventFinished();
    },
  };

  return (
    <>
      <RoomVisual className="room__visual" imgSrc="./assets/doukutsu.png" />
      <RoomDescription
        className="room__description"
        description={<>{description}</>}
        buttons={[confirmButton]}
      />
    </>
  );
};
