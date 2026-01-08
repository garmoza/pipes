import { Screen } from '../screen/Screen'
import { StartMenuScreen } from '../screen/StartMenuScreen'
import { LevelsMenuScreen } from '../screen/LevelsMenuScreen'
import { LevelScreen } from '../screen/LevelScreen'

export enum ScreenType {
  START_MENU = 'startMenu',
  LEVELS_MENU = 'levelsMenu',
  LEVEL = 'level',
}

export class ScreenState {
  private currentScreen: Screen | null = null

  constructor(
    private ctx: CanvasRenderingContext2D,
    private logicalWidth: number,
    private logicalHeight: number
  ) {}

  public setCurrentScreen(screenType: ScreenType): void {
    switch (screenType) {
      case ScreenType.START_MENU:
        this.currentScreen = new StartMenuScreen(
          this,
          this.ctx,
          this.logicalWidth,
          this.logicalHeight
        )
        break
      case ScreenType.LEVELS_MENU:
        this.currentScreen = new LevelsMenuScreen(
          this,
          this.ctx,
          this.logicalWidth,
          this.logicalHeight
        )
        break
      case ScreenType.LEVEL:
        this.currentScreen = new LevelScreen(this.ctx, this.logicalWidth, this.logicalHeight)
        break
      default:
        this.currentScreen = null
        break
    }

    if (this.currentScreen) {
      this.currentScreen.draw()
    }
  }

  public handleMouseMove(x: number, y: number) {
    if (this.currentScreen) {
      this.currentScreen.handleMouseMove(x, y)
    }
  }

  public handleClick(x: number, y: number) {
    if (this.currentScreen) {
      this.currentScreen.handleClick(x, y)
    }
  }
}
