import { useState, useEffect, useRef, useContext } from "react";
import { LanguageContext } from "../context/LanguageContext";
import { translations } from "../data/translations";

// Configuración del juego
const GRID_SIZE = 20;
const CELL_SIZE = 20;
const INITIAL_SPEED = 150;
const SPEED_INCREMENT = 5;
const WINNING_SCORE = 10;

// Direcciones
const DIRECTIONS = {
  UP: { x: 0, y: -1 },
  DOWN: { x: 0, y: 1 },
  LEFT: { x: -1, y: 0 },
  RIGHT: { x: 1, y: 0 },
};

const SnakeGame = () => {
  const { language } = useContext(LanguageContext);
  const t = translations[language];

  const canvasRef = useRef(null);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [showWinMessage, setShowWinMessage] = useState(false);

  // Referencias para el estado del juego
  const snakeRef = useRef([]);
  const directionRef = useRef(DIRECTIONS.RIGHT);
  const foodRef = useRef({ x: 0, y: 0 });
  const speedRef = useRef(INITIAL_SPEED);
  const gameLoopRef = useRef(null);

  // Inicializar el juego
  const initGame = () => {
    // Reiniciar estado
    setGameOver(false);
    setScore(0);
    setShowWinMessage(false);
    speedRef.current = INITIAL_SPEED;

    // Inicializar serpiente
    snakeRef.current = [
      { x: 10, y: 10 },
      { x: 9, y: 10 },
      { x: 8, y: 10 },
    ];

    // Establecer dirección inicial
    directionRef.current = DIRECTIONS.RIGHT;

    // Colocar comida
    placeFood();

    // Iniciar bucle del juego
    if (gameLoopRef.current) {
      clearInterval(gameLoopRef.current);
    }

    gameLoopRef.current = setInterval(gameLoop, speedRef.current);
    setGameStarted(true);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!gameStarted || gameOver) return;
  
      // Prevenir el desplazamiento de la pantalla con las flechas
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
      }
  
      // Cambiar dirección de la serpiente
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
  
    // Agregar el evento de teclado
    window.addEventListener("keydown", handleKeyDown);
  
    // Limpiar el evento al desmontar
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [gameStarted, gameOver]);

  // Colocar comida en posición aleatoria
  const placeFood = () => {
    const x = Math.floor(Math.random() * GRID_SIZE);
    const y = Math.floor(Math.random() * GRID_SIZE);

    // Verificar si la comida está sobre la serpiente
    const isOnSnake = snakeRef.current.some(
      (segment) => segment.x === x && segment.y === y
    );

    if (isOnSnake) {
      placeFood();
    } else {
      foodRef.current = { x, y };
    }
  };

  // Bucle principal del juego
  const gameLoop = () => {
    if (gameOver) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Limpiar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Mover serpiente
    moveSnake();

    // Verificar colisiones
    if (checkCollisions()) {
      setGameOver(true);
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
      return;
    }

    // Dibujar comida
    drawFood(ctx);

    // Dibujar serpiente
    drawSnake(ctx);
  };

  // Mover la serpiente
  const moveSnake = () => {
    const head = { ...snakeRef.current[0] };

    // Mover cabeza en la dirección actual
    head.x += directionRef.current.x;
    head.y += directionRef.current.y;

    // Verificar si la serpiente come la comida
    const ateFood =
      head.x === foodRef.current.x && head.y === foodRef.current.y;

    if (ateFood) {
      // Aumentar puntuación
      setScore((prevScore) => {
        const newScore = prevScore + 1;
        if (newScore >= WINNING_SCORE) {
          setShowWinMessage(true);
          if (gameLoopRef.current) {
            clearInterval(gameLoopRef.current);
          }
        }
        return newScore;
      });

      // Aumentar velocidad
      speedRef.current = Math.max(
        50,
        INITIAL_SPEED - (score + 1) * SPEED_INCREMENT
      );
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
        gameLoopRef.current = setInterval(gameLoop, speedRef.current);
      }

      // Verificar victoria

      // Colocar nueva comida
      placeFood();
    } else {
      // Eliminar cola si no comió
      snakeRef.current.pop();
    }

    // Añadir nueva cabeza
    snakeRef.current = [head, ...snakeRef.current];
  };

  // Verificar colisiones con paredes o con la propia serpiente
  const checkCollisions = () => {
    const head = snakeRef.current[0];

    // Colisiones con paredes
    if (
      head.x < 0 ||
      head.x >= GRID_SIZE ||
      head.y < 0 ||
      head.y >= GRID_SIZE
    ) {
      return true;
    }

    // Colisión con la propia serpiente (omitir cabeza)
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

  // Dibujar serpiente
  const drawSnake = (ctx) => {
    snakeRef.current.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? "#8B5CF6" : "#A78BFA";
      ctx.fillRect(
        segment.x * CELL_SIZE,
        segment.y * CELL_SIZE,
        CELL_SIZE,
        CELL_SIZE
      );

      // Añadir borde
      ctx.strokeStyle = "#F5F3FF";
      ctx.strokeRect(
        segment.x * CELL_SIZE,
        segment.y * CELL_SIZE,
        CELL_SIZE,
        CELL_SIZE
      );
    });
  };

  // Dibujar comida
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

  // Manejar entrada de teclado
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

  // Limpiar al desmontar
  useEffect(() => {
    return () => {
      if (gameLoopRef.current) {
        clearInterval(gameLoopRef.current);
      }
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-8 text-center text-violet-700 dark:text-violet-400">
        {t.game.title}
      </h1>

      <div className="flex flex-col items-center">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-violet-100 dark:border-violet-900/30 mb-6">
          <div className="mb-4 text-center">
            <p className="text-lg font-semibold text-gray-800 dark:text-white">
              {t.game.score}:{" "}
              <span className="text-violet-600 dark:text-violet-400">
                {score}
              </span>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t.game.goal}: {WINNING_SCORE}
            </p>
          </div>

          <div className="border-4 border-violet-200 dark:border-violet-800 rounded-lg overflow-hidden">
            <canvas
              ref={canvasRef}
              width={GRID_SIZE * CELL_SIZE}
              height={GRID_SIZE * CELL_SIZE}
              className="bg-violet-50 dark:bg-gray-700"
            />
          </div>
        </div>

        <div className="flex gap-4">
          {!gameStarted || gameOver ? (
            <button
              onClick={initGame}
              className="px-4 py-2 bg-violet-600 hover:bg-violet-700 text-white rounded-md transition-colors"
            >
              {gameOver ? t.game.playAgain : t.game.startGame}
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
              className="px-4 py-2 border border-violet-600 text-violet-600 dark:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/20 rounded-md transition-colors"
            >
              {t.game.stopGame}
            </button>
          )}
        </div>

        <div className="mt-6 text-center max-w-md">
          <h3 className="text-lg font-semibold mb-2 text-violet-700 dark:text-violet-400">
            {t.game.instructions.title}
          </h3>
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            {t.game.instructions.controls}
          </p>
          <p className="text-gray-700 dark:text-gray-300">
            {t.game.instructions.objective}
          </p>
        </div>
      </div>

      {/* Mensaje de victoria */}
      {showWinMessage && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-md mx-4 border border-violet-200 dark:border-violet-800">
            <h3 className="text-xl font-bold text-violet-700 dark:text-violet-400 mb-2">
              {t.game.winMessage.title}
            </h3>
            <p className="mb-4 text-gray-700 dark:text-gray-300">
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
    </div>
  );
};

export default SnakeGame;
