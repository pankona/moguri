import React from "react";

export type ButtonProps = {
  className: string;
  value: string;
  onClick: (e: React.MouseEvent<HTMLInputElement>) => void;
};

export const Button: React.FC<ButtonProps> = ({
  className,
  value,
  onClick,
}) => {
  return (
    <input
      className={className}
      type="button"
      value={value}
      onClick={(e: React.MouseEvent<HTMLInputElement>) => {
        onClick(e);
      }}
    />
  );
};
