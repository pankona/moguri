import React from "react";
import { ConfirmButton } from "./button";
import { Character, Room } from "./Character";

export interface RoomComponent {
  room: Room;
  character: Character;
  onEventFinished: () => void;
}

export const defaultRoomComponent: React.FC<RoomComponent> = ({
  room,
  onEventFinished,
}) => {
  return (
    <div>
      <div>{room.description}</div>
      <ConfirmButton label="confirmed" onPress={onEventFinished} />
    </div>
  );
};

export const emptyRoomComponent: React.FC<RoomComponent> = ({
  onEventFinished,
}) => {
  return (
    <div>
      <div>no thing in this room</div>
      <ConfirmButton label="confirmed" onPress={onEventFinished} />
    </div>
  );
};
