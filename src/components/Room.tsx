import React, { ReactElement } from "react";
import { Button, ButtonProps } from "./Button";
import "./Button.css";
import { Character, Room } from "./Character";
import "./Room.css";

export interface RoomComponent {
  room: Room;
  character: Character;
  onEventFinished: () => void;
}

export const DefaultRoomComponent: React.FC<RoomComponent> = ({
  room,
  onEventFinished,
}) => {
  return (
    <div>
      <div>{room.description}</div>
      <Button className="button" value="Confirmed" onClick={onEventFinished} />
    </div>
  );
};

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

const RoomVisual: React.FC<{ className: string; imgSrc: string }> = ({
  className,
  imgSrc,
}) => {
  return (
    <div className={className}>
      <img
        src={imgSrc}
        style={{ maxWidth: "100%", height: "auto", maxHeight: "100%" }}
      />
    </div>
  );
};

const RoomDescription: React.FC<{
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

export const TerminalRoomComponent: React.FC<RoomComponent> = ({}) => {
  const onSearch = () => {
    setDescription(
      <RoomDescription
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
    <RoomDescription
      className="room__description"
      description={<div>It is the dead end.</div>}
      buttons={[searchButton]}
    />
  );

  return (
    <>
      <RoomVisual
        className="room__visual"
        imgSrc="./assets/kanban_jyunbi.png"
      />
      {description}
    </>
  );
};

export const RoundevourRoomComponent: React.FC<RoomComponent> = ({
  character,
  onEventFinished,
}) => {
  type choice = "greet" | "ignore" | "rob";

  const [guest, setGuest] = React.useState<Character>({
    id: "",
    name: "John",
    greet: "...",
  });
  React.useEffect(() => {
    // TODO: fetch user data from firebase
    setGuest({ id: "", name: "John", greet: "..." });
  }, []);

  const [stage, setStage] = React.useState<number>(0);
  const [element, setElement] = React.useState<JSX.Element>(
    <div>
      <div>You meet someone.</div>
      <div>There's a {guest.name}.</div>
    </div>
  );

  const onChoice = (choice: choice) => {
    setStage((prev) => prev + 1);
    setElement(
      ((): JSX.Element => {
        switch (choice) {
          case "greet":
            return (
              <div>
                <div>
                  {character.name} {character.greet}
                </div>
                <div>
                  {guest.name} {guest.greet}
                </div>
              </div>
            );
          default:
            return <div>sorry, not implemented ;(</div>;
        }
      })()
    );
  };

  const greetButton = {
    className: "room__description_button",
    value: "Greet",
    onClick: () => {
      onChoice("greet");
    },
  };

  const ignoreButton = {
    className: "room__description_button",
    value: "Ignore",
    onClick: () => {
      onChoice("ignore");
    },
  };

  const robButton = {
    className: "room__description_button",
    value: "Rob",
    onClick: () => {
      onChoice("rob");
    },
  };

  const confirmButton = {
    className: "room__description_button",
    value: "Confirmed",
    onClick: () => {
      onEventFinished();
    },
  };

  return (
    <>
      {((stage: number) => {
        switch (stage) {
          case 0:
            return (
              <>
                <RoomVisual
                  className="room__visual"
                  imgSrc="./assets/silhouette_human05_man.png"
                />
                <RoomDescription
                  className="room__description"
                  description={element}
                  buttons={[greetButton, ignoreButton, robButton]}
                />
              </>
            );
          case 1:
            return (
              <>
                <RoomVisual
                  className="room__visual"
                  imgSrc="./assets/silhouette_human05_man.png"
                />
                <RoomDescription
                  className="room__description"
                  description={element}
                  buttons={[confirmButton]}
                />
              </>
            );
        }
      })(stage)}
    </>
  );
};
