import { useState } from 'react'

// -=-= GAME =-=-
export default function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)
  const xIsNext = currentMove % 2 === 0
  const currentSquares = history[currentMove]

  function handlePlay(nextSquares: any) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]
    setHistory(nextHistory)
    setCurrentMove(nextHistory.length - 1)
  }

  function jumpTo(nextMove: any) {
    setCurrentMove(nextMove)
  }

  const moves = history.map((squares, move) => {
    let description
    if (move > 0) {
      description = 'Go to move #' + move
    } else {
      description = 'Go to game start'
    }
    return (
      <li key={move}>
        <button
          className="flex items-center justify-center text-center p-1 bg-orange-700 rounded-md text-white hover:translate-x-2 transition-transform"
          onClick={() => jumpTo(move)}
        >
          {description}
        </button>
      </li>
    )
  })

  return (
    <div className="w-screen h-screen flex flex-row gap-2 items-center justify-center bg-gray-200">
      <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      <div className="">
        <ol className="flex flex-col gap-2 items-center">{moves}</ol>
      </div>
    </div>
  )
}

// -=-= SQUARE =-=-
export function Square({
  value,
  onSquareClick,
}: {
  value: string
  onSquareClick: () => void
}) {
  return (
    <button
      onClick={onSquareClick}
      className="w-10 h-10 outline-dashed bg-white flex items-center justify-center text-center font-bold"
    >
      {value}
    </button>
  )
}

// -=-= BOARD =-=-
export function Board({
  squares,
  xIsNext,
  onPlay,
}: {
  squares: any
  onPlay: (squares: any) => void
  xIsNext: boolean
}) {
  function handleClick(index: number) {
    if (calculateWinner(squares) || squares[index]) return
    const nextSquares = squares.slice()
    if (xIsNext) {
      nextSquares[index] = 'X'
    } else {
      nextSquares[index] = 'O'
    }
    onPlay(nextSquares)
  }

  const winner = calculateWinner(squares)
  console.log(winner)
  return (
    <div className="p-4 h-[280px] w-[280px] flex flex-col items-center justify-center bg-orange-700 rounded-md shadow-lg gap-10">
      <div className="flex text-white font-bold">
        {winner ? (
          <div className="text-2xl">
            Winner: <span> {winner}</span>
          </div>
        ) : (
          <div className="flex flex-row text-2xl gap-2 justify-center items-center">
            Next player:{' '}
            {xIsNext ? (
              <div className="bg-white rounded-md p-2 w-8 h-8 text-orange-700 flex justify-center items-center text-center">
                X
              </div>
            ) : (
              <div className="bg-white rounded-md p-2 w-8 h-8 text-orange-700 flex justify-center items-center text-center">
                O
              </div>
            )}
          </div>
        )}
      </div>

      <div>
        <div className="flex flex-row">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="flex flex-row">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="flex flex-row">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>
    </div>
  )
}

// -=-= CALCULATE WINNER =-=-
function calculateWinner(squares: string[]) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }
  return null
}
