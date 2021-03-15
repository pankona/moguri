import React from "react";
import firebase from "./firebase";
import "./Header.css";

export const Header: React.FC<{
  className: string;
  user: firebase.User | null;
}> = ({ className, user }) => {
  const logout = () => {
    firebase.auth().signOut();
  };

  return (
    <div className={className}>
      moguri v0.1.0
      {user ? (
        <div onClick={logout} style={{ cursor: "pointer" }}>
          Logout
        </div>
      ) : null}
    </div>
  );
};
