import { Component } from '../Component'

export enum EndPipeType {
  W = 'w', // Connection from west (left)
  N = 'n', // Connection from north (top)
  E = 'e', // Connection from east (right)
  S = 's', // Connection from south (bottom)
}

export class EndPipe implements Component {
  private ctx: CanvasRenderingContext2D

  private x: number
  private y: number
  private width: number = 50
  private height: number = 50
  private type: EndPipeType

  constructor(ctx: CanvasRenderingContext2D, x: number, y: number, type: EndPipeType) {
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

    // Apply rotation based on type
    if (this.type === EndPipeType.W) {
      this.ctx.translate(this.x, this.y)
    } else if (this.type === EndPipeType.N) {
      const angle = 90
      this.ctx.translate(this.x + 50, this.y)
      this.ctx.rotate((angle * Math.PI) / 180)
    } else if (this.type === EndPipeType.E) {
      const angle = 180
      this.ctx.translate(this.x + 50, this.y + 50)
      this.ctx.rotate((angle * Math.PI) / 180)
    } else if (this.type === EndPipeType.S) {
      const angle = 270
      this.ctx.translate(this.x, this.y + 50)
      this.ctx.rotate((angle * Math.PI) / 180)
    }

    // Background
    this.ctx.fillStyle = '#ffffff'
    this.ctx.fillRect(0, 0, 50, 50)

    // Pipe connection (horizontal line from left)
    this.ctx.beginPath()
    this.ctx.moveTo(0, 20)
    this.ctx.lineTo(20, 20) // Horizontal line toward center
    this.ctx.strokeStyle = 'black'
    this.ctx.lineWidth = 2
    this.ctx.stroke()

    this.ctx.beginPath()
    this.ctx.moveTo(0, 30)
    this.ctx.lineTo(20, 30) // Second horizontal line toward center
    this.ctx.strokeStyle = 'black'
    this.ctx.lineWidth = 2
    this.ctx.stroke()

    // Circle in the center to indicate dead end (not filled)
    this.ctx.beginPath()
    this.ctx.arc(25, 25, 8, 0, Math.PI * 2) // Circle at center
    this.ctx.strokeStyle = 'black'
    this.ctx.lineWidth = 2
    this.ctx.stroke()

    this.ctx.restore()
  }

  public isPointInside(x: number, y: number): boolean {
    return x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height
  }

  public handleClick(): void {
    // Rotate through the different orientations
    if (this.type === EndPipeType.W) {
      this.type = EndPipeType.N
    } else if (this.type === EndPipeType.N) {
      this.type = EndPipeType.E
    } else if (this.type === EndPipeType.E) {
      this.type = EndPipeType.S
    } else if (this.type === EndPipeType.S) {
      this.type = EndPipeType.W
    }
    this.draw()
  }
}
