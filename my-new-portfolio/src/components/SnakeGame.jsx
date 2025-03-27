import { useState, useEffect, useRef, useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { LanguageContext } from "../context/LanguageContext";
import { translations } from "../data/translations";
import confetti from "canvas-confetti";

const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;
const SPEED_INCREMENT = 5;
const WINNING_SCORE = 10;

const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

const SnakeGame = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language];
  const { theme } = useContext(ThemeContext);

  const canvasRef = useRef(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [showWinMessage, setShowWinMessage] = useState(false);
  const [lost, setLost] = useState(false);

  const snakeRef = useRef([]);
  const directionRef = useRef(DIRECTIONS.RIGHT);
  const foodRef = useRef({ x: 0, y: 0 });
  const speedRef = useRef(INITIAL_SPEED);
  const gameLoopRef = useRef(null);

  const initGame = () => {
    setGameOver(false);
    setLost(false);
    setScore(0);
    setShowWinMessage(false);
    setGameStarted(true);
    speedRef.current = INITIAL_SPEED;

    snakeRef.current = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 },
    ];

    directionRef.current = DIRECTIONS.RIGHT;

    placeFood();

    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    }

    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
    }

    gameLoopRef.current = setInterval(gameLoop, speedRef.current);
  };

  const placeFood = () => {
    const x = Math.floor(Math.random() * GRID_SIZE);
    const y = Math.floor(Math.random() * GRID_SIZE);

    const isOnSnake = snakeRef.current.some(
      (segment) => segment.x === x && segment.y === y
    );

    if (isOnSnake) {
      placeFood();
    } else {
      foodRef.current = { x, y };
    }
  };

  const gameLoop = () => {
    if (gameOver) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    moveSnake();

    if (checkCollisions()) {
      setGameOver(true);
      setLost(true);
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
      return;
    }

    drawFood(ctx);

    drawSnake(ctx);
  };

  const moveSnake = () => {
    const head = { ...snakeRef.current[0] };

    head.x += directionRef.current.x;
    head.y += directionRef.current.y;

    const ateFood =
      head.x === foodRef.current.x && head.y === foodRef.current.y;

    if (ateFood) {
      placeFood();
      setScore((prevScore) => {
        const newScore = prevScore + 1;
        if (newScore >= WINNING_SCORE) {
          setShowWinMessage(true);
          runConfetti();
          if (gameLoopRef.current) {
            clearInterval(gameLoopRef.current);
          }
        }
        return newScore;
      });

      speedRef.current = Math.max(
        50,
        INITIAL_SPEED - (score + 1) * SPEED_INCREMENT
      );
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
        gameLoopRef.current = setInterval(gameLoop, speedRef.current);
      }

      placeFood();
    } else {
      snakeRef.current.pop();
    }

    snakeRef.current = [head, ...snakeRef.current];
  };

  const checkCollisions = () => {
    const head = snakeRef.current[0];

    if (
      head.x < 0 ||
      head.x >= GRID_SIZE ||
      head.y < 0 ||
      head.y >= GRID_SIZE
    ) {
      return true;
    }

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

  const drawSnake = (ctx) => {
    snakeRef.current.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? "#8B5CF6" : "#A78BFA";
      ctx.fillRect(
        segment.x * CELL_SIZE,
        segment.y * CELL_SIZE,
        CELL_SIZE,
        CELL_SIZE
      );

      ctx.strokeStyle = "#F5F3FF";
      ctx.strokeRect(
        segment.x * CELL_SIZE,
        segment.y * CELL_SIZE,
        CELL_SIZE,
        CELL_SIZE
      );
    });
  };

  const drawFood = (ctx) => {
    ctx.fillStyle = "#7C3AED";
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

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
      }

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

  useEffect(() => {
    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, []);

  const runConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1
        className={`text-3xl font-bold mb-8 text-center ${
          theme === "dark" ? "text-violet-400" : "text-violet-700"
        }`}
      >
        {t.game.title}
      </h1>

      <div className="flex flex-col items-center">
        <div
          className={`rounded-lg shadow-md p-6 border mb-6 ${
            theme === "dark"
              ? "bg-gray-800 border-violet-900/30"
              : "bg-white border-violet-100"
          }`}
        >
          <div className="mb-4 text-center">
            <p
              className={`text-lg font-semibold ${
                theme === "dark" ? "text-white" : "text-gray-800"
              }`}
            >
              {t.game.score}:{" "}
              <span
                className={`${
                  theme === "dark" ? "text-violet-400" : "text-violet-600"
                }`}
              >
                {score}
              </span>
            </p>
            <p
              className={`text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {t.game.goal}: {WINNING_SCORE}
            </p>
          </div>

          <div
            className={`border-4 rounded-lg overflow-hidden ${
              theme === "dark" ? "border-violet-800" : "border-violet-200"
            }`}
          >
            <canvas
              ref={canvasRef}
              width={GRID_SIZE * CELL_SIZE}
              height={GRID_SIZE * CELL_SIZE}
              className={`${theme === "dark" ? "bg-gray-700" : "bg-violet-50"}`}
            />
          </div>
        </div>

        <div className="flex gap-4">
          {!gameStarted && (
            <button
              onClick={initGame}
              className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-md transition-colors"
            >
              {gameOver ? t.game.playAgain : t.game.startGame}
            </button>
          )}
        </div>

        <div className="mt-6 text-center max-w-md">
          <h3
            className={`text-lg font-semibold mb-2 ${
              theme === "dark" ? "text-violet-400" : "text-violet-700"
            }`}
          >
            {t.game.instructions.title}
          </h3>
          <p
            className={`mb-2 ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {t.game.instructions.controls}
          </p>
          <p
            className={`mb-2 ${
              theme === "dark" ? "text-gray-300" : "text-gray-700"
            }`}
          >
            {t.game.instructions.objective}
          </p>
        </div>
      </div>

      {showWinMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div
            className={`rounded-lg shadow-lg p-6 max-w-md mx-4 border ${
              theme === "dark"
                ? "bg-gray-800 border-violet-800"
                : "bg-white border-violet-200"
            }`}
          >
            <h3
              className={`text-xl font-bold mb-2 ${
                theme === "dark" ? "text-violet-400" : "text-violet-700"
              }`}
            >
              {t.game.winMessage.title}
            </h3>
            <p
              className={`mb-4 ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {t.game.winMessage.message}
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => {
                  setShowWinMessage(false);
                  setGameStarted(false);
                }}
                className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-md transition-colors"
              >
                {t.game.winMessage.button}
              </button>
            </div>
          </div>
        </div>
      )}

      {lost && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div
            className={`rounded-lg shadow-lg p-6 max-w-md mx-4 border ${
              theme === "dark"
                ? "bg-gray-800 border-violet-800"
                : "bg-white border-violet-200"
            }`}
          >
            <h3
              className={`text-xl font-bold mb-2 ${
                theme === "dark" ? "text-violet-400" : "text-violet-700"
              }`}
            >
              {t.game.lostMessage.title}
            </h3>
            <p
              className={`mb-4 ${
                theme === "dark" ? "text-gray-300" : "text-gray-700"
              }`}
            >
              {t.game.lostMessage.message}
            </p>
            <div className="flex justify-end">
              <button
                onClick={() => {
                  window.location.reload();
                }}
                className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-md transition-colors"
              >
                {t.game.lostMessage.button}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SnakeGame;
