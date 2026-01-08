import { Component } from '../Component'

export enum TPipeType {
  N = 'n', // T pointing up (connections: top, right, left)
  E = 'e', // T pointing right (connections: top, right, bottom)
  S = 's', // T pointing down (connections: right, bottom, left)
  W = 'w', // T pointing left (connections: top, bottom, left)
}

export class TPipe implements Component {
  private ctx: CanvasRenderingContext2D

  private x: number
  private y: number
  private width: number = 50
  private height: number = 50
  private type: TPipeType

  constructor(ctx: CanvasRenderingContext2D, x: number, y: number, type: TPipeType) {
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

    if (this.type === TPipeType.N) {
      this.ctx.translate(this.x, this.y)
    } else if (this.type === TPipeType.E) {
      const angle = 90
      this.ctx.translate(this.x + 50, this.y)
      this.ctx.rotate((angle * Math.PI) / 180)
    } else if (this.type === TPipeType.S) {
      const angle = 180
      this.ctx.translate(this.x + 50, this.y + 50)
      this.ctx.rotate((angle * Math.PI) / 180)
    } else if (this.type === TPipeType.W) {
      const angle = 270
      this.ctx.translate(this.x, this.y + 50)
      this.ctx.rotate((angle * Math.PI) / 180)
    }

    // Фон
    this.ctx.fillStyle = '#ffffff'
    this.ctx.fillRect(0, 0, 50, 50)

    // Левая часть горизонтальной линии (первая линия)
    this.ctx.beginPath()
    this.ctx.moveTo(0, 20)
    this.ctx.lineTo(20, 20)
    this.ctx.strokeStyle = 'black'
    this.ctx.lineWidth = 2
    this.ctx.stroke()

    // Правая часть горизонтальной линии (первая линия)
    this.ctx.beginPath()
    this.ctx.moveTo(30, 20)
    this.ctx.lineTo(50, 20)
    this.ctx.strokeStyle = 'black'
    this.ctx.lineWidth = 2
    this.ctx.stroke()

    // Горизонтальная часть (вторая линия)
    this.ctx.beginPath()
    this.ctx.moveTo(0, 30)
    this.ctx.lineTo(50, 30)
    this.ctx.strokeStyle = 'black'
    this.ctx.lineWidth = 2
    this.ctx.stroke()

    // Вертикальная часть Т (первая линия)
    this.ctx.beginPath()
    this.ctx.moveTo(20, 0)
    this.ctx.lineTo(20, 20)
    this.ctx.strokeStyle = 'black'
    this.ctx.lineWidth = 2
    this.ctx.stroke()

    // Вертикальная часть Т (вторая линия)
    this.ctx.beginPath()
    this.ctx.moveTo(30, 0)
    this.ctx.lineTo(30, 20)
    this.ctx.strokeStyle = 'black'
    this.ctx.lineWidth = 2
    this.ctx.stroke()

    this.ctx.restore()
  }

  public isPointInside(x: number, y: number): boolean {
    return x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height
  }

  public handleClick(): void {
    if (this.type === TPipeType.N) {
      this.type = TPipeType.E
    } else if (this.type === TPipeType.E) {
      this.type = TPipeType.S
    } else if (this.type === TPipeType.S) {
      this.type = TPipeType.W
    } else if (this.type === TPipeType.W) {
      this.type = TPipeType.N
    }
    this.draw()
  }
}
