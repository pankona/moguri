import React from "react";
import { Scene } from "./App";
import { Button } from "./Button";
import firebase from "./firebase";
import "./Header.css";

export const Header: React.FC<{
  className: string;
  user: firebase.User | null;
  scene: Scene;
  onExitDangeon: () => void;
}> = ({ className, user, scene, onExitDangeon }) => {
  const logout = () => {
    firebase.auth().signOut();
  };

  return (
    <div className={className}>
      moguri v0.1.0
      {user && scene !== "dangeon" ? (
        <div>
          <div onClick={logout} style={{ cursor: "pointer" }}>
            Logout
          </div>
        </div>
      ) : null}
      {scene === "dangeon" ? (
        <div onClick={onExitDangeon} style={{ cursor: "pointer" }}>
          Exit
        </div>
      ) : null}
    </div>
  );
};
