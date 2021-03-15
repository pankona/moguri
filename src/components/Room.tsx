import React from "react";
import { ConfirmButton } from "./button";
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
      <ConfirmButton label="confirmed" onPress={onEventFinished} />
    </div>
  );
};

export const EmptyRoomComponent: React.FC<RoomComponent> = ({
  onEventFinished,
}) => {
  return (
    <div>
      <div>no thing in this room</div>
      <ConfirmButton label="confirmed" onPress={onEventFinished} />
    </div>
  );
};

export const RoundevourRoomComponent: React.FC<RoomComponent> = ({
  onEventFinished,
}) => {
  type choice = "greet" | "ignore" | "rob";

  const [stage, setStage] = React.useState<number>(0);
  const [text, setText] = React.useState<JSX.Element>(
    <div>there's a person</div>
  );

  const onChoice = (choice: choice) => {
    setStage((prev) => prev + 1);
    let text: JSX.Element = <div></div>;
    switch (choice) {
      case "greet":
        text = (
          <div>
            <div>you said "hi"</div>
            <div>he said "hello"</div>
          </div>
        );
        break;
      case "ignore":
        text = (
          <div>
            <div>you ignored the person.</div>
          </div>
        );
        break;
      case "rob":
        text = (
          <div>
            <div>you tried to rob of his equipments.</div>
          </div>
        );
        break;
    }
    setText(text);
  };

  return (
    <div>
      {text}
      {((stage: number) => {
        switch (stage) {
          case 0:
            return (
              <div>
                <input
                  type="button"
                  value="greet"
                  onClick={() => {
                    onChoice("greet");
                  }}
                />
                <input
                  type="button"
                  value="ignore"
                  onClick={() => {
                    onChoice("ignore");
                  }}
                />
                <input
                  type="button"
                  value="rob"
                  onClick={() => {
                    onChoice("rob");
                  }}
                />
              </div>
            );
          case 1:
            return (
              <div>
                <ConfirmButton label="confirmed" onPress={onEventFinished} />
              </div>
            );
        }
      })(stage)}
    </div>
  );
};
