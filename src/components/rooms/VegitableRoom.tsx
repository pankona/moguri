import React from "react";
import { Character } from "../../models/Character";
import { ButtonProps } from "../parts/Button";
import { RoomComponent, RoomDescription, RoomVisual } from "./Room";

export const VegitableRoomComponent: React.FC<RoomComponent> = ({
  character,
  onCharacterChanged,
  onEventFinished,
}) => {
  const vegitableList = ["herb", "mushroom"] as const;

  const confirmButton = {
    className: "room__description_button",
    value: "Confirmed",
    onClick: () => {
      onEventFinished();
    },
  };

  const vegitable = React.useRef(
    vegitableList[Math.floor(Math.random() * vegitableList.length)]
  );

  const imgSrc = ((v: typeof vegitableList[number]): string => {
    switch (v) {
      case "herb":
        return "./assets/vegetable_rucola.png";
      case "mushroom":
        return "./assets/kinoko.png";
    }
  })(vegitable.current);

  type Result = { character: Character; effect: number };

  const eatRawHerb = (currentCharacter: Character): Result => {
    //range: -3~+3
    const effect: number = -3 + Math.floor(Math.random() * Math.floor(7));
    return {
      character: {
        ...currentCharacter,
        health: currentCharacter.health + effect,
      },
      effect: effect,
    };
  };

  const eatRawMushroom = (currentCharacter: Character): Result => {
    //range: -3~+3
    const effect: number = -5 + Math.floor(Math.random() * Math.floor(9));
    return {
      character: {
        ...currentCharacter,
        health: currentCharacter.health + effect,
      },
      effect: effect,
    };
  };

  const eatFunc = ((
    v: typeof vegitableList[number]
  ): ((c: Character) => Result) => {
    switch (v) {
      case "herb":
        return eatRawHerb;
      case "mushroom":
        return eatRawMushroom;
    }
  })(vegitable.current);

  type Event = "eat_raw" | "eat_cooked" | "ignore";

  const onPress = (event: Event) => {
    switch (event) {
      case "eat_raw":
        const result = eatFunc(character);
        onCharacterChanged(result.character);

        if (result.effect > 0) {
          setDescription(
            <RoomDescription
              className="room__description"
              description={<div>You are feeling better.</div>}
              buttons={[confirmButton]}
            />
          );
        } else if (result.effect < 0) {
          setDescription(
            <RoomDescription
              className="room__description"
              description={<div>You are feeling worse.</div>}
              buttons={[confirmButton]}
            />
          );
        } else {
          setDescription(
            <RoomDescription
              className="room__description"
              description={<div>Nothing happened.</div>}
              buttons={[confirmButton]}
            />
          );
        }
        return;
      case "eat_cooked":
        setDescription(
          <RoomDescription
            className="room__description"
            description={<div>Not implemented ;(</div>}
            buttons={[confirmButton]}
          />
        );
        return;
      case "ignore":
        setDescription(
          <RoomDescription
            className="room__description"
            description={<div>You ignored the herb.</div>}
            buttons={[confirmButton]}
          />
        );
        return;
    }
  };

  const eatButton: ButtonProps = {
    className: "room__description_button",
    value: "Eat (Raw)",
    onClick: () => {
      onPress("eat_raw");
    },
  };
  const ignoreButton: ButtonProps = {
    className: "room__description_button",
    value: "Ignore",
    onClick: () => {
      onPress("ignore");
    },
  };

  const [description, setDescription] = React.useState<JSX.Element>(
    <RoomDescription
      className="room__description"
      description={<div>An unknown grass is growing.</div>}
      buttons={[eatButton, ignoreButton]}
    />
  );

  return (
    <>
      <RoomVisual className="room__visual" imgSrc={imgSrc} />
      {description}
    </>
  );
};
