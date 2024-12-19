import { useState } from "react";
import { WINNING_COMBINATIONS } from "./winning-combinations.js";
import Log from "./components/Log";
import Players from "./components/Players";
import GameBord from "./components/GameBoard";
import GameOver from "./components/GameOver.jsx";

const PLAYERS = {
  X: "player 1",
  O: "player 2",
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let activePlayer = "X";
  if (gameTurns.length > 0 && gameTurns[0].player === "X") activePlayer = "O";

  return activePlayer;
}

function deriveWinner(gameBoard, gameTurns) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((obj) => {
      return gameBoard[obj.row][obj.column] === gameTurns[0]?.player;
    });
  });
}

function deriveGameBoard(gameTurns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map((row) => [...row])];

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function App() {
  const [players, setPlaers] = useState(PLAYERS);
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);
  const gameBoard = deriveGameBoard(gameTurns);
  const isWinner = deriveWinner(gameBoard, gameTurns);
  const hasDraw = gameTurns.length === 9 && !isWinner;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      const currentPlayer = deriveActivePlayer(prevTurns);
      const updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlaers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: newName,
      };
    });
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Players
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onChangeName={handlePlayerNameChange}
          />
          <Players
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onChangeName={handlePlayerNameChange}
          />
        </ol>
        {(isWinner || hasDraw) && (
          <GameOver
            isWinner={isWinner}
            onRestart={handleRestart}
            winnerName={players[gameTurns[0].player]}
          />
        )}
        <GameBord onSelectSquare={handleSelectSquare} board={gameBoard} />
      </div>
      <Log turns={gameTurns} />
    </main>
  );
}

export default App;
