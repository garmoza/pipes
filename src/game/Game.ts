import { ScreenState, ScreenType } from './navigation/ScreenState'

export class Game {
  private canvas: HTMLCanvasElement
  private ctx: CanvasRenderingContext2D
  private dpr: number

  // Логический размер холста (в CSS-пикселях)
  private logicalWidth: number
  private logicalHeight: number

  private screenState: ScreenState

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    const ctx = canvas.getContext('2d')
    if (!ctx) throw new Error('Failed to get 2D context')
    this.ctx = ctx

    this.dpr = window.devicePixelRatio || 1

    const rect = this.canvas.getBoundingClientRect()

    // Логический размер — это размер canvas в CSS-пикселях
    this.logicalWidth = rect.width
    this.logicalHeight = rect.height

    // Инициализируем экраны
    this.screenState = new ScreenState(this.ctx, this.logicalWidth, this.logicalHeight)

    // Обработчики событий
    this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this))
    this.canvas.addEventListener('click', this.handleClick.bind(this))

    // Перерисовка при изменении размера окна
    window.addEventListener('resize', this.resize.bind(this))

    this.resize()
  }

  private handleClick(e: MouseEvent): void {
    const rect = this.canvas.getBoundingClientRect()
    const logicalX = e.clientX - rect.left
    const logicalY = e.clientY - rect.top

    this.screenState.handleClick(logicalX, logicalY)
  }

  private handleMouseMove(e: MouseEvent): void {
    const rect = this.canvas.getBoundingClientRect()
    // Координаты в пикселях CSS
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    this.screenState.handleMouseMove(x, y)
  }

  private resize(): void {
    const rect = this.canvas.getBoundingClientRect()

    // Логический размер — это размер canvas в CSS-пикселях
    this.logicalWidth = rect.width
    this.logicalHeight = rect.height

    // Физический размер — учитываем devicePixelRatio
    this.canvas.width = this.logicalWidth * this.dpr
    this.canvas.height = this.logicalHeight * this.dpr

    // CSS-размер остаётся тем же (браузер сам его применяет, но вы можете явно задать)
    this.canvas.style.width = this.logicalWidth + 'px'
    this.canvas.style.height = this.logicalHeight + 'px'

    // Масштабируем контекст под логические координаты
    this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0)

    this.draw()
  }

  private draw(): void {
    this.ctx.save()

    this.screenState.setCurrentScreen(ScreenType.START_MENU)

    this.ctx.restore()
  }
}
