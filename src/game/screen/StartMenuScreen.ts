import { Button } from '../component/Button'
import { ScreenState, ScreenType } from '../navigation/ScreenState'
import { Screen } from './Screen'

export class StartMenuScreen implements Screen {
  private ctx: CanvasRenderingContext2D

  private logicalWidth: number
  private logicalHeight: number

  // Components
  private button: Button

  constructor(
    screenState: ScreenState,
    ctx: CanvasRenderingContext2D,
    logicalWidth: number,
    logicalHeight: number
  ) {
    this.ctx = ctx
    this.logicalWidth = logicalWidth
    this.logicalHeight = logicalHeight

    this.button = new Button(
      this.ctx,
      this.logicalWidth / 2 - 200 / 2,
      this.logicalHeight / 2 - 60 / 2,
      200,
      60,
      'Start',
      undefined,
      () => {
        screenState.setCurrentScreen(ScreenType.LEVELS_MENU)
      }
    )
  }

  /**
   * @implements {Screen}
   */
  draw(): void {
    this.ctx.save()

    this.ctx.fillStyle = '#2c3e50'
    this.ctx.fillRect(0, 0, this.logicalWidth, this.logicalHeight)

    this.button.draw()

    this.ctx.restore()
  }

  /**
   * @implements {Screen}
   */
  handleMouseMove(x: number, y: number) {
    this.button.handleMouseMove(x, y)
  }

  /**
   * @implements {Screen}
   */
  handleClick(x: number, y: number) {
    if (this.button.isPointInside(x, y)) {
      this.button.handleClick()
    }
  }
}
