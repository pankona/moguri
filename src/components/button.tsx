import React from "react";

export const ConfirmButton: React.FC<{
  label: string;
  onPress: () => void;
}> = ({ label, onPress }) => {
  return (
    <input
      type="button"
      value={label}
      onClick={() => {
        onPress();
      }}
    />
  );
};
