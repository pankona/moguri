import React from "react";
import {
  Character,
  CharacterState,
  Direction,
  EventStatus,
  getRoom,
  move,
  movableDirection,
  nextRoom,
} from "../models/Character";
import { CharacterStateStore } from "../models/CharacterStateStore";
import { generateDungeon } from "../models/Dungeon";
import { Room } from "../models/Room";
import { RoomComponent } from "./Room";

const DungeonScene: React.FC<{
  character: Character;
  characterStateStore: CharacterStateStore;
}> = ({ character, characterStateStore }) => {
  const [characterState, setCharacterState] = React.useState<CharacterState>(
    loadOrInitializeCharacterState(character, characterStateStore)
  );

  const [room, setRoom] = React.useState<Room>(getRoom(characterState));

  const [eventStatus, setEventStatus] = React.useState<EventStatus>(
    "in_progress"
  );

  const onMove = (d: Direction) => {
    const updatedCharacterState = move(characterState, d);
    updatedCharacterState.currentInteractResult = undefined;
    setCharacterState(updatedCharacterState);
    characterStateStore.Save(character.id, updatedCharacterState);

    setRoom(getRoom(updatedCharacterState));
    setEventStatus("in_progress");
  };

  const onCharacterStateUpdated = (updatedCharacterState: CharacterState) => {
    setCharacterState(updatedCharacterState);
    characterStateStore.Save(character.id, updatedCharacterState);
  };

  return (
    <div className="dungeon">
      {eventStatus === "in_progress" ? (
        <div className="dungeon__room">
          <RoomComponent
            room={room}
            characterState={characterState}
            onCharacterStateUpdated={onCharacterStateUpdated}
            onEventFinished={() => {
              setEventStatus("finished");
            }}
          />
        </div>
      ) : (
        <div className="dungeon__next">
          <NextRoom characterState={characterState} onMove={onMove} />
        </div>
      )}
      <div className="dungeon__character_status">
        <div>Hello, {characterState.currentCharacter.name}!</div>
        <div>
          your current location:
          <div>
            level: {characterState.currentLocation.level}, x:
            {characterState.currentLocation.x}, y:
            {characterState.currentLocation.y}
          </div>
          <div>Health: {characterState.currentCharacter.health}</div>
        </div>
      </div>
    </div>
  );
};

const NextRoom: React.FC<{
  characterState: CharacterState;
  onMove: (d: Direction) => void;
}> = ({ characterState, onMove }) => {
  return (
    <>
      <div className="dungeon__next__visual">
        {movableDirection(characterState).map((d: Direction) => (
          <div key={d} className="dungeon__next__visual_choice">
            <div
              className="dungeon__next__visual_button"
              key={d}
              onClick={() => {
                onMove(d);
              }}
            >
              {nextRoom(characterState, d).description()}
            </div>
          </div>
        ))}
      </div>
      <div className="dungeon__next__description">choice next room</div>
    </>
  );
};

const loadOrInitializeCharacterState = (
  character: Character,
  characterStateStore: CharacterStateStore
): CharacterState => {
  const cs = characterStateStore.Load(character.id);
  return cs
    ? cs
    : {
        currentCharacter: character,
        currentLocation: { level: 0, x: 1, y: 0 },
        currentInteractResult: undefined,
        dungeon: generateDungeon(),
      };
};

export default DungeonScene;
