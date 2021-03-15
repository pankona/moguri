import React from "react";

export const Button: React.FC<{
  className: string;
  value: string;
  onClick: (e: React.MouseEvent<HTMLInputElement>) => void;
}> = ({ className, value, onClick }) => {
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
