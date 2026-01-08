import { Screen } from './Screen'
import { Button } from '../component/Button'
import { ScreenState, ScreenType } from '../navigation/ScreenState'

export class LevelsMenuScreen implements Screen {
  private ctx: CanvasRenderingContext2D

  private logicalWidth: number
  private logicalHeight: number

  private buttons: Button[]

  constructor(
    screenState: ScreenState,
    ctx: CanvasRenderingContext2D,
    logicalWidth: number,
    logicalHeight: number
  ) {
    this.ctx = ctx
    this.logicalWidth = logicalWidth
    this.logicalHeight = logicalHeight
    this.buttons = this.constructButtons(screenState)
  }

  private constructButtons(screenState: ScreenState): Button[] {
    const buttons: Button[] = []

    // Создаем 10 кнопок для уровней
    for (let i = 1; i <= 10; i++) {
      const button = new Button(
        this.ctx,
        this.logicalWidth / 2 - 60 / 2,
        this.logicalHeight / 2 - 60 / 2 + (i - 1) * 80,
        60,
        60,
        i.toString(),
        undefined,
        () => {
          screenState.setCurrentScreen(ScreenType.LEVEL)
        }
      )
      buttons.push(button)
    }

    return buttons
  }

  /**
   * @implements {Screen}
   */
  draw(): void {
    this.ctx.save()

    this.ctx.fillStyle = '#2c3e50'
    this.ctx.fillRect(0, 0, this.logicalWidth, this.logicalHeight)

    for (const button of this.buttons) {
      button.draw()
    }

    this.ctx.restore()
  }

  /**
   * @implements {Screen}
   */
  handleMouseMove(x: number, y: number) {
    for (const button of this.buttons) {
      button.handleMouseMove(x, y)
    }
  }

  /**
   * @implements {Screen}
   */
  handleClick(x: number, y: number) {
    for (const button of this.buttons) {
      if (button.isPointInside(x, y)) {
        button.handleClick()
        break // Only handle the first button that was clicked
      }
    }
  }
}
