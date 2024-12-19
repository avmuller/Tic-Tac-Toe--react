export default function GameOver({ isWinner, onRestart, winnerName }) {
  return (
    <div id="game-over">
      <h2>Game Over</h2>
      {isWinner && <p>{winnerName} won!</p>}
      {!isWinner && <p>It's a draw</p>}
      <p>
        <button onClick={onRestart}>rematch</button>
      </p>
    </div>
  );
}
