import React from "react";
import { Room } from "./Character";

export type RoomType = "default";

export const roomComponentByType = (
  roomType: RoomType
): typeof RoomComponent => {
  switch (roomType) {
    case "default":
      return RoomComponent;
  }
};

const RoomComponent: React.FC<{ room: Room; onEventFinished: () => void }> = ({
  room,
  onEventFinished,
}) => {
  return (
    <div>
      <div>{room.description}</div>
      <input
        type="button"
        value="event finish"
        onClick={() => {
          onEventFinished();
        }}
      />
    </div>
  );
};

export default RoomComponent;
