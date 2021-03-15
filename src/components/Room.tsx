import React from "react";
import { Button } from "./Button";
import "./Button.css";
import { Character, Room } from "./Character";

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
  return (
    <div>
      <div>Nothing in this room</div>
      <Button className="button" value="Confirmed" onClick={onEventFinished} />
    </div>
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

  return (
    <div>
      {element}
      {((stage: number) => {
        switch (stage) {
          case 0:
            return (
              <div>
                <Button
                  className="button"
                  value="Greet"
                  onClick={() => {
                    onChoice("greet");
                  }}
                />
              </div>
            );
          case 1:
            return (
              <div>
                <Button
                  className="confirm_button"
                  value="Confirmed"
                  onClick={onEventFinished}
                />
              </div>
            );
        }
      })(stage)}
    </div>
  );
};
