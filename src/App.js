import { useState } from 'react'; //imports the state from react

function Square({ value, onSquareClick }) { //Creates a button that is activated when a square is clicked
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) { //Renders the board with squares
  function handleClick(i) { //Function that handles the click event on a square
    if (calculateWinner(squares) || squares[i]) { //Checks if the game has already ended or if the square is already occupied
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) { //Determine the next player's turn
      nextSquares[i] = 'X'; //Change the current player's turn to X
    } else {
      nextSquares[i] = 'O'; //Change the current player's turn to O
    }
    onPlay(nextSquares); //Update the state with the new game state
  }

  const winner = calculateWinner(squares); //Calculate the winner of the game
  const isBoardFull = squares.every(square => square !== null); //Check if the board is full
  let status;
  if (winner) {
    status = 'Winner: ' + winner; //Display the winner
  } else if (isBoardFull) {
    status = "It's a Tie!"; //Declares a tie
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O'); //Display the next player's turn
  }

  return ( //Displays the squares, their mnames, and the status
    <>
      <div className="status">{status}</div> 
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} /> 
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

export default function Game() { //Renders the game component
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0); //Keeps track of the current move number
  const xIsNext = currentMove % 2 === 0; //Determines if it's X's turn or O's turn
  const currentSquares = history[currentMove]; //The current state of the game board

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory); //Update the history
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) { //Function that handles the jump to a specific move
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move; //Display the move number
    } else {
      description = 'Go to game start'; //Display the start of the game
    }
    return ( //Displays the move buttons with their descriptions
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return ( //Displays the game board and the move history
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) { //Function that checks for a winner in the game
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) { //Checks for a winner by comparing the squares in each line
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null; //If no winner is found, return null
}
