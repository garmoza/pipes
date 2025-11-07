export interface Position {
  x: number;
  y: number;
}

export interface Size {
  width: number;
  height: number;
}

export interface GameObject {
  position: Position;
  size: Size;
  color: string;
  draw(ctx: CanvasRenderingContext2D): void;
  update?(deltaTime: number): void;
}

export interface GameState {
  score: number;
  isGameOver: boolean;
  level: number;
}
