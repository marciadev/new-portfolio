import { useEffect, useRef, useState } from "react";

// Directions
const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

// Game settings
const GRID_SIZE = 20;
const CELL_SIZE = 20;
const GAME_SPEED = 100;
const WIN_SCORE = 10;

function SnakeGame() {
  const canvasRef = useRef(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [showWinDialog, setShowWinDialog] = useState(false);

  // Game state refs to avoid dependency issues in useEffect
  const snakeRef = useRef([]);
  const directionRef = useRef(DIRECTIONS.RIGHT);
  const foodRef = useRef({ x: 0, y: 0 });
  const scoreRef = useRef(0);
  const gameLoopRef = useRef(null);

  // Initialize game
  const initGame = () => {
    // Reset state
    setGameOver(false);
    setScore(0);
    scoreRef.current = 0;

    // Initialize snake in the middle
    const initialSnake = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 },
    ];
    snakeRef.current = initialSnake;

    // Set initial direction
    directionRef.current = DIRECTIONS.RIGHT;

    // Place food
    placeFood();

    // Start game loop
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
    }

    gameLoopRef.current = setInterval(gameLoop, GAME_SPEED);
    setGameStarted(true);
  };

  // Place food at random position
  const placeFood = () => {
    const x = Math.floor(Math.random() * GRID_SIZE);
    const y = Math.floor(Math.random() * GRID_SIZE);

    // Check if food is on snake
    const isOnSnake = snakeRef.current.some(
      (segment) => segment.x === x && segment.y === y
    );

    if (isOnSnake) {
      placeFood();
    } else {
      foodRef.current = { x, y };
    }
  };

  // Game loop
  const gameLoop = () => {
    if (gameOver) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Move snake
    moveSnake();

    // Check collisions
    if (checkCollisions()) {
      setGameOver(true);
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
      return;
    }

    // Draw food
    drawFood(ctx);

    // Draw snake
    drawSnake(ctx);
  };

  // Move snake
  const moveSnake = () => {
    const head = { ...snakeRef.current[0] };

    // Move head in current direction
    head.x += directionRef.current.x;
    head.y += directionRef.current.y;

    // Check if snake eats food
    const ateFood =
      head.x === foodRef.current.x && head.y === foodRef.current.y;

    if (ateFood) {
      // Increase score
      scoreRef.current += 1;
      setScore(scoreRef.current);

      // Check if player won
      if (scoreRef.current >= WIN_SCORE) {
        setShowWinDialog(true);
        if (gameLoopRef.current) {
          clearInterval(gameLoopRef.current);
        }
      }

      // Place new food
      placeFood();
    } else {
      // Remove tail if didn't eat
      snakeRef.current.pop();
    }

    // Add new head
    snakeRef.current = [head, ...snakeRef.current];
  };

  // Check collisions with walls or self
  const checkCollisions = () => {
    const head = snakeRef.current[0];

    // Check wall collisions
    if (
      head.x < 0 ||
      head.x >= GRID_SIZE ||
      head.y < 0 ||
      head.y >= GRID_SIZE
    ) {
      return true;
    }

    // Check self collision (skip head)
    for (let i = 1; i < snakeRef.current.length; i++) {
      if (
        head.x === snakeRef.current[i].x &&
        head.y === snakeRef.current[i].y
      ) {
        return true;
      }
    }

    return false;
  };

  // Draw snake
  const drawSnake = (ctx) => {
    snakeRef.current.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? "#ec4899" : "#f9a8d4";
      ctx.fillRect(
        segment.x * CELL_SIZE,
        segment.y * CELL_SIZE,
        CELL_SIZE,
        CELL_SIZE
      );

      // Add border
      ctx.strokeStyle = "#fdf2f8";
      ctx.strokeRect(
        segment.x * CELL_SIZE,
        segment.y * CELL_SIZE,
        CELL_SIZE,
        CELL_SIZE
      );
    });
  };

  // Draw food
  const drawFood = (ctx) => {
    ctx.fillStyle = "#be185d";
    ctx.beginPath();
    ctx.arc(
      foodRef.current.x * CELL_SIZE + CELL_SIZE / 2,
      foodRef.current.y * CELL_SIZE + CELL_SIZE / 2,
      CELL_SIZE / 2,
      0,
      Math.PI * 2
    );
    ctx.fill();
  };

  // Handle keyboard input
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!gameStarted || gameOver) return;

      switch (e.key) {
        case "ArrowUp":
          if (directionRef.current !== DIRECTIONS.DOWN) {
            directionRef.current = DIRECTIONS.UP;
          }
          break;
        case "ArrowDown":
          if (directionRef.current !== DIRECTIONS.UP) {
            directionRef.current = DIRECTIONS.DOWN;
          }
          break;
        case "ArrowLeft":
          if (directionRef.current !== DIRECTIONS.RIGHT) {
            directionRef.current = DIRECTIONS.LEFT;
          }
          break;
        case "ArrowRight":
          if (directionRef.current !== DIRECTIONS.LEFT) {
            directionRef.current = DIRECTIONS.RIGHT;
          }
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [gameStarted, gameOver]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, []);

  return (
    <section
      id="game"
      className="section py-16 dark:bg-gray-800"
      style={{ backgroundColor: "rgba(217, 159, 240, 0.87)" }}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-4xl text-center mb-12 font-bold bg-gradient-to-r from-purple-700 to-violet-100 bg-clip-text text-transparent dark:text-purple-300 dark:text-purple-300">
          ¡Juega Snake!
        </h2>
        <div className="flex flex-col items-center">
          <div className="bg-white dark:bg-gray-900 border border-purple-200 dark:border-purple-900 rounded-lg p-6 mb-6">
            <div className="mb-4 text-center">
              <p className="text-lg font-semibold">
                Puntuación: <span className="text-purple-500">{score}</span>
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Objetivo: {WIN_SCORE} puntos
              </p>
            </div>
            <div className="border-4 border-purple-200 dark:border-purple-800 rounded-lg overflow-hidden">
              <canvas
                ref={canvasRef}
                width={GRID_SIZE * CELL_SIZE}
                height={GRID_SIZE * CELL_SIZE}
                className="bg-purple-100 dark:bg-gray-800"
              />
            </div>
          </div>

          <div className="flex gap-4">
            {!gameStarted || gameOver ? (
              <button
                onClick={initGame}
                className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-md transition-colors"
              >
                {gameOver ? "Jugar de nuevo" : "Iniciar juego"}
              </button>
            ) : (
              <button
                onClick={() => {
                  setGameStarted(false);
                  setGameOver(true);
                  if (gameLoopRef.current) {
                    clearInterval(gameLoopRef.current);
                  }
                }}
                className="px-4 py-2 border border-purple-500 text-purple-500 hover:bg-purple-100 dark:hover:bg-purple-900/20 rounded-md transition-colors"
              >
                Detener juego
              </button>
            )}
          </div>

          <div className="mt-6 text-center max-w-md">
            <h3 className="text-lg font-semibold mb-2 text-purple-600 dark:text-purple-300">
              Instrucciones:
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-2">
              Usa las teclas de flecha para mover la serpiente. Come la comida
              para crecer y ganar puntos. ¡Evita chocar con las paredes o
              contigo mismo!
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Alcanza {WIN_SCORE} puntos para ganar el juego.
            </p>
          </div>
        </div>
      </div>

      {showWinDialog && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-900 border border-purple-200 dark:border-purple-900 rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-xl font-bold text-purple-500 dark:text-purple-300 mb-2">
              ¡Felicidades! 🎉
            </h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
              Has alcanzado {score} puntos y superado el nivel. ¡Eres increíble!
            </p>
            <p className="mb-6 text-gray-700 dark:text-gray-300">
              Si disfrutaste el juego, ¡no dudes en ponerte en contacto conmigo
              para hablar sobre proyectos o colaboraciones!
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setShowWinDialog(false);
                  setGameStarted(false);
                }}
                className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-md transition-colors"
              >
                ¡Gracias!
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default SnakeGame;
