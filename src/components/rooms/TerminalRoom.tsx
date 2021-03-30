import React from "react";
import { ButtonProps } from "../parts/Button";
import * as Room from "./Room";

export const TerminalRoomComponent: React.FC<Room.RoomComponent> = ({}) => {
  const onSearch = () => {
    setDescription(
      <Room.RoomDescription
        className="room__description"
        description={
          <>
            <div>You couldn't find anything.</div>
            <div>It seems it is not implemented yet...</div>
            <div>(Press exit to end game)</div>
          </>
        }
        buttons={[]}
      />
    );
  };

  const searchButton: ButtonProps = {
    className: "room__description_button",
    value: "Search",
    onClick: () => {
      onSearch();
    },
  };

  const [description, setDescription] = React.useState<JSX.Element>(
    <Room.RoomDescription
      className="room__description"
      description={<div>It is the dead end.</div>}
      buttons={[searchButton]}
    />
  );

  return (
    <>
      <Room.RoomVisual
        className="room__visual"
        imgSrc="./assets/kanban_jyunbi.png"
      />
      {description}
    </>
  );
};
