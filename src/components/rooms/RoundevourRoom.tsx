import React from "react";
import { Character } from "../Character";
import { RoomComponent, RoomDescription, RoomVisual } from "./Room";

export const RoundevourRoomComponent: React.FC<RoomComponent> = ({
  character,
  onEventFinished,
}) => {
  type choice = "greet" | "ignore" | "rob";

  const [guest, setGuest] = React.useState<Character>({
    id: "",
    name: "John",
    greet: "...",
    health: 10,
  });
  React.useEffect(() => {
    // TODO: fetch user data from firebase
    setGuest({ id: "", name: "John", greet: "...", health: 10 });
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
