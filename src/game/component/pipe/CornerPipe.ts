import { Component } from '../Component'

export enum CornerPipeType {
  W = 'w',
  N = 'n',
  E = 'e',
  S = 's',
}

export class CornerPipe implements Component {
  private ctx: CanvasRenderingContext2D

  private x: number
  private y: number
  private width: number = 50
  private height: number = 50
  private type: CornerPipeType

  constructor(ctx: CanvasRenderingContext2D, x: number, y: number, type: CornerPipeType) {
    this.ctx = ctx
    this.x = x
    this.y = y
    this.type = type
  }

  /**
   * @implements {Component}
   */
  draw(): void {
    this.ctx.save()

    if (this.type === CornerPipeType.W) {
      this.ctx.translate(this.x, this.y)
    } else if (this.type === CornerPipeType.N) {
      const angle = 90
      this.ctx.translate(this.x + 50, this.y)
      this.ctx.rotate((angle * Math.PI) / 180)
    } else if (this.type === CornerPipeType.E) {
      const angle = 180
      this.ctx.translate(this.x + 50, this.y + 50)
      this.ctx.rotate((angle * Math.PI) / 180)
    } else if (this.type === CornerPipeType.S) {
      const angle = 270
      this.ctx.translate(this.x, this.y + 50)
      this.ctx.rotate((angle * Math.PI) / 180)
    }

    // Фон
    this.ctx.fillStyle = '#ffffff'
    this.ctx.fillRect(0, 0, 50, 50)

    // Первая линия (от левой стороны к нижней)
    this.ctx.beginPath()
    this.ctx.moveTo(0, 20)
    this.ctx.lineTo(30, 20) // Горизонтальная линия
    this.ctx.lineTo(30, 50) // Вертикальная линия вниз
    this.ctx.strokeStyle = 'black'
    this.ctx.lineWidth = 2
    this.ctx.stroke()

    // Вторая линия (от левой стороны к нижней)
    this.ctx.beginPath()
    this.ctx.moveTo(0, 30)
    this.ctx.lineTo(20, 30) // Горизонтальная линия
    this.ctx.lineTo(20, 50) // Вертикальная линия вниз
    this.ctx.strokeStyle = 'black'
    this.ctx.lineWidth = 2
    this.ctx.stroke()

    this.ctx.restore()
  }

  public isPointInside(x: number, y: number): boolean {
    return x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height
  }

  public handleClick(): void {
    if (this.type === CornerPipeType.W) {
      this.type = CornerPipeType.N
    } else if (this.type === CornerPipeType.N) {
      this.type = CornerPipeType.E
    } else if (this.type === CornerPipeType.E) {
      this.type = CornerPipeType.S
    } else if (this.type === CornerPipeType.S) {
      this.type = CornerPipeType.W
    }
    this.draw()
  }
}
