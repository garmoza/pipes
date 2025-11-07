import { GameObject, Position, Size } from '../types/game.types'
import { Helpers } from '../utils/helpers'

export class Player implements GameObject {
  public position: Position
  public size: Size = { width: 50, height: 50 }
  public color: string = '#4CAF50'
  public speed: number = 5

  constructor(canvasWidth: number, canvasHeight: number) {
    this.position = {
      x: canvasWidth / 2 - this.size.width / 2,
      y: canvasHeight - this.size.height - 20,
    }
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.color
    ctx.fillRect(this.position.x, this.position.y, this.size.width, this.size.height)

    // Добавляем детали для визуализации
    ctx.fillStyle = '#2E7D32'
    ctx.fillRect(
      this.position.x + 5,
      this.position.y + 5,
      this.size.width - 10,
      this.size.height - 10
    )
  }

  public move(direction: 'left' | 'right', canvasWidth: number): void {
    if (direction === 'left') {
      this.position.x = Helpers.clamp(
        this.position.x - this.speed,
        0,
        canvasWidth - this.size.width
      )
    } else {
      this.position.x = Helpers.clamp(
        this.position.x + this.speed,
        0,
        canvasWidth - this.size.width
      )
    }
  }
}
