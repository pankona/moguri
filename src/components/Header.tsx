import React from "react";
import { Scene } from "./App";
import firebase from "../models/firebase";

export const Header: React.FC<{
  className: string;
  user: firebase.User | null;
  scene: Scene;
  onExitDungeon: () => void;
}> = ({ className, user, scene, onExitDungeon }) => {
  const logout = () => {
    firebase.auth().signOut();
  };

  return (
    <div className={className}>
      moguri v0.1.0
      {user && scene !== "dungeon" ? (
        <div>
          <div onClick={logout} style={{ cursor: "pointer" }}>
            Logout
          </div>
        </div>
      ) : null}
      {scene === "dungeon" ? (
        <div onClick={onExitDungeon} style={{ cursor: "pointer" }}>
          Exit
        </div>
      ) : null}
    </div>
  );
};
