import React from "react";
import { RoomComponent, RoomDescription, RoomVisual } from "./Room";

export const EmptyRoomComponent: React.FC<RoomComponent> = ({
  onEventFinished,
}) => {
  const confirmButton = {
    className: "room__description_button",
    value: "Confirm",
    onClick: onEventFinished,
  };
  return (
    <>
      <RoomVisual
        className="room__visual"
        imgSrc="./assets/kanban_jyunbi.png"
      />
      <RoomDescription
        className="room__description"
        description={<div>Nothing in this room</div>}
        buttons={[confirmButton]}
      />
    </>
  );
};
