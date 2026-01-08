import { CornerPipe, CornerPipeType } from '../component/pipe/CornerPipe'
import { StraightPipe } from '../component/pipe/StraightPipe'
import { TPipe, TPipeType } from '../component/pipe/TPipe'
import { EndPipe, EndPipeType } from '../component/pipe/EndPipe'
import { Screen } from './Screen'

export class LevelScreen implements Screen {
  private ctx: CanvasRenderingContext2D

  private logicalWidth: number
  private logicalHeight: number

  // Components
  private straightPipe: StraightPipe
  private cornerPipe: CornerPipe
  private tPipe: TPipe
  private endPipe: EndPipe

  constructor(ctx: CanvasRenderingContext2D, logicalWidth: number, logicalHeight: number) {
    this.ctx = ctx
    this.logicalWidth = logicalWidth
    this.logicalHeight = logicalHeight

    this.straightPipe = new StraightPipe(this.ctx, 10, 10, true)
    this.cornerPipe = new CornerPipe(this.ctx, 60, 10, CornerPipeType.W)
    this.tPipe = new TPipe(this.ctx, 110, 10, TPipeType.N)
    this.endPipe = new EndPipe(this.ctx, 160, 10, EndPipeType.W)
  }

  /**
   * @implements {Screen}
   */
  draw(): void {
    this.ctx.save()

    this.ctx.fillStyle = '#2c3e50'
    this.ctx.fillRect(0, 0, this.logicalWidth, this.logicalHeight)

    this.straightPipe.draw()
    this.cornerPipe.draw()
    this.tPipe.draw()
    this.endPipe.draw()

    this.ctx.restore()
  }

  /**
   * @implements {Screen}
   */
  handleMouseMove(x: number, y: number) {
    console.debug('handleMouseMove', x, y)
  }

  /**
   * @implements {Screen}
   */
  handleClick(x: number, y: number) {
    if (this.straightPipe.isPointInside(x, y)) {
      this.straightPipe.handleClick()
    }
    if (this.cornerPipe.isPointInside(x, y)) {
      this.cornerPipe.handleClick()
    }
    if (this.tPipe.isPointInside(x, y)) {
      this.tPipe.handleClick()
    }
    if (this.endPipe.isPointInside(x, y)) {
      this.endPipe.handleClick()
    }
  }
}
