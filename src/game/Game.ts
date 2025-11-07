import { GameState } from "../types/game.types";
import { Player } from "./Player";
import { Enemy } from "./Enemy";
import { Helpers } from "../utils/helpers";

export class Game {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private player: Player;
  private enemies: Enemy[] = [];
  private state: GameState;
  private lastTime: number = 0;
  private enemySpawnRate: number = 60; // кадры между появлением врагов
  private enemySpawnCounter: number = 0;
  private keys: Set<string> = new Set();

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d")!;

    // Устанавливаем размеры canvas
    this.canvas.width = 800;
    this.canvas.height = 600;

    this.player = new Player(this.canvas.width, this.canvas.height);
    this.state = {
      score: 0,
      isGameOver: false,
      level: 1,
    };

    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    document.addEventListener("keydown", (e) => {
      this.keys.add(e.key.toLowerCase());
    });

    document.addEventListener("keyup", (e) => {
      this.keys.delete(e.key.toLowerCase());
    });
  }

  private handleInput(): void {
    if (this.keys.has("arrowleft") || this.keys.has("a")) {
      this.player.move("left", this.canvas.width);
    }
    if (this.keys.has("arrowright") || this.keys.has("d")) {
      this.player.move("right", this.canvas.width);
    }
  }

  private spawnEnemy(): void {
    if (this.enemySpawnCounter >= this.enemySpawnRate) {
      this.enemies.push(new Enemy(this.canvas.width, this.state.level));
      this.enemySpawnCounter = 0;
      // Увеличиваем сложность
      this.enemySpawnRate = Math.max(20, 60 - this.state.level * 5);
    }
    this.enemySpawnCounter++;
  }

  private updateEnemies(deltaTime: number): void {
    for (let i = this.enemies.length - 1; i >= 0; i--) {
      const enemy = this.enemies[i];
      enemy.update(deltaTime);

      // Проверка столкновений
      if (
        Helpers.checkCollision(
          this.player.position,
          this.player.size,
          enemy.position,
          enemy.size
        )
      ) {
        this.state.isGameOver = true;
        return;
      }

      // Удаление вышедших за границы врагов
      if (enemy.isOutOfBounds(this.canvas.height)) {
        this.enemies.splice(i, 1);
        this.state.score += 10;

        // Увеличиваем уровень каждые 100 очков
        this.state.level = Math.floor(this.state.score / 100) + 1;
      }
    }
  }

  private drawBackground(): void {
    // Градиентный фон
    const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
    gradient.addColorStop(0, "#1a237e");
    gradient.addColorStop(1, "#4a148c");
    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }

  private drawUI(): void {
    this.ctx.fillStyle = "white";
    this.ctx.font = "20px Arial";
    this.ctx.fillText(`Score: ${this.state.score}`, 10, 30);
    this.ctx.fillText(`Level: ${this.state.level}`, 10, 60);

    if (this.state.isGameOver) {
      this.ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      this.ctx.fillStyle = "white";
      this.ctx.font = "48px Arial";
      this.ctx.textAlign = "center";
      this.ctx.fillText(
        "Game Over!",
        this.canvas.width / 2,
        this.canvas.height / 2 - 50
      );
      this.ctx.font = "24px Arial";
      this.ctx.fillText(
        `Final Score: ${this.state.score}`,
        this.canvas.width / 2,
        this.canvas.height / 2
      );
      this.ctx.fillText(
        "Press R to restart",
        this.canvas.width / 2,
        this.canvas.height / 2 + 50
      );
      this.ctx.textAlign = "left";
    }
  }

  private gameLoop(currentTime: number): void {
    const deltaTime = (currentTime - this.lastTime) / 16; // Нормализация времени
    this.lastTime = currentTime;

    // Очистка canvas
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    if (!this.state.isGameOver) {
      this.drawBackground();
      this.handleInput();
      this.spawnEnemy();
      this.updateEnemies(deltaTime);

      // Отрисовка игровых объектов
      this.player.draw(this.ctx);
      this.enemies.forEach((enemy) => enemy.draw(this.ctx));
    }

    this.drawUI();

    // Перезапуск игры
    if (this.state.isGameOver && (this.keys.has("r") || this.keys.has("R"))) {
      this.restart();
    }

    requestAnimationFrame((time) => this.gameLoop(time));
  }

  private restart(): void {
    this.player = new Player(this.canvas.width, this.canvas.height);
    this.enemies = [];
    this.state = {
      score: 0,
      isGameOver: false,
      level: 1,
    };
    this.enemySpawnCounter = 0;
    this.enemySpawnRate = 60;
    this.keys.clear();
  }

  public start(): void {
    this.gameLoop(0);
  }
}
