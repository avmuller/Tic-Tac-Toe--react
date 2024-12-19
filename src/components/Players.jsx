import { useState } from "react";

export default function Players({
  initialName,
  symbol,
  isActive,
  onChangeName,
}) {
  const [playerName, setPlayerName] = useState(initialName);
  const [isEdited, setIsEdited] = useState(false);
  function handlEditClick(e) {
    setIsEdited((editing) => !editing);

    if (isEdited) onChangeName(symbol, playerName);
  }

  function handleChange(e) {
    setPlayerName(e.target.value);
  }

  let editablePlayerName = <span className="player-name">{playerName}</span>;
  if (isEdited)
    editablePlayerName = (
      <input type="text" value={playerName} onChange={handleChange} required />
    );

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {editablePlayerName}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handlEditClick}>{isEdited ? "Save" : "Edit"}</button>
    </li>
  );
}
