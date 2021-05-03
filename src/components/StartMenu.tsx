import React from "react";
import CharacterCreateForm, {
  CharacterCreateProps,
} from "./CharacterCreateForm";

const StartMenu: React.FC<CharacterCreateProps> = (props) => {
  return <CharacterCreateForm {...props} />;
};

export default StartMenu;
