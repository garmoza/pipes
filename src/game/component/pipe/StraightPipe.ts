import { Component } from '../Component'

export class StraightPipe implements Component {
  private ctx: CanvasRenderingContext2D

  private x: number
  private y: number
  private width: number = 50
  private height: number = 50
  private horizontal: boolean

  constructor(ctx: CanvasRenderingContext2D, x: number, y: number, horizontal: boolean) {
    this.ctx = ctx
    this.x = x
    this.y = y
    this.horizontal = horizontal
  }

  /**
   * @implements {Component}
   */
  draw(): void {
    this.ctx.save()

    if (this.horizontal) {
      this.ctx.translate(this.x, this.y)
    } else {
      const angle = 90
      this.ctx.translate(this.x + 50, this.y)
      this.ctx.rotate((angle * Math.PI) / 180)
    }

    // Фон
    this.ctx.fillStyle = '#ffffff'
    this.ctx.fillRect(0, 0, 50, 50)

    // Первая линия
    this.ctx.beginPath()
    this.ctx.moveTo(0, 20)
    this.ctx.lineTo(50, 20)
    this.ctx.strokeStyle = 'black'
    this.ctx.lineWidth = 2
    this.ctx.stroke()

    // Вторая линия
    this.ctx.beginPath()
    this.ctx.moveTo(0, 30)
    this.ctx.lineTo(50, 30)
    this.ctx.strokeStyle = 'black'
    this.ctx.lineWidth = 2
    this.ctx.stroke()

    this.ctx.restore()
  }

  public isPointInside(x: number, y: number): boolean {
    return x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height
  }

  public handleClick(): void {
    this.horizontal = !this.horizontal
    this.draw()
  }
}
