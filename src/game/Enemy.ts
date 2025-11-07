import { GameObject, Position, Size } from '../types/game.types'
import { Helpers } from '../utils/helpers'

export class Enemy implements GameObject {
  public position: Position
  public size: Size = { width: 40, height: 40 }
  public color: string = '#F44336'
  public speed: number

  constructor(canvasWidth: number, level: number = 1) {
    this.position = {
      x: Helpers.randomInt(0, canvasWidth - this.size.width),
      y: -this.size.height,
    }
    this.speed = Helpers.randomInt(2, 4) + level * 0.5
    this.color = `hsl(${Helpers.randomInt(0, 360)}, 70%, 50%)`
  }

  public draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.color
    ctx.fillRect(this.position.x, this.position.y, this.size.width, this.size.height)

    // Добавляем детали
    ctx.fillStyle = '#B71C1C'
    ctx.fillRect(
      this.position.x + 8,
      this.position.y + 8,
      this.size.width - 16,
      this.size.height - 16
    )
  }

  public update(deltaTime: number): void {
    console.log(deltaTime)
    this.position.y += this.speed
  }

  public isOutOfBounds(canvasHeight: number): boolean {
    return this.position.y > canvasHeight
  }
}
