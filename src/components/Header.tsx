import React from "react";
import * as firebase from "../models/firebase";
import { Scene } from "./App";

export const Header: React.FC<{
  className: string;
  user: firebase.firebase.auth.User | null;
  scene: Scene;
  onExitDungeon: () => void;
}> = ({ className, user, scene, onExitDungeon }) => {
  return (
    <div className={className}>
      moguri v0.1.0
      {user && scene !== "dungeon" ? (
        <div>
          <div
            onClick={firebase.firebase.auth.logout}
            style={{ cursor: "pointer" }}
          >
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
