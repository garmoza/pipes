import { Component } from './Component'

export interface ButtonStyle {
  backgroundColor: string
  hoverBackgroundColor: string
  borderColor: string
  textColor: string
  shadowColor: string
  borderWidth: number
  fontSize: number
  fontFamily: string
}

export type ButtonCallback = () => void

export class Button implements Component {
  private ctx: CanvasRenderingContext2D

  private x: number
  private y: number
  private width: number
  private height: number
  private text: string
  private isHovered: boolean = false
  private style: ButtonStyle
  private onClickCallback: ButtonCallback | undefined

  constructor(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    text: string,
    style?: Partial<ButtonStyle>,
    onClick?: ButtonCallback
  ) {
    this.ctx = ctx
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    this.text = text
    this.onClickCallback = onClick

    // Стили по умолчанию
    const defaultStyle: ButtonStyle = {
      backgroundColor: '#2ecc71',
      hoverBackgroundColor: '#27ae60',
      borderColor: '#27ae60',
      textColor: 'white',
      shadowColor: 'rgba(0, 0, 0, 0.3)',
      borderWidth: 2,
      fontSize: 24,
      fontFamily: 'Arial',
    }

    // Объединяем стили по умолчанию с переданными стилями
    this.style = { ...defaultStyle, ...style }
  }

  /**
   * @implements {Component}
   */
  draw(): void {
    this.ctx.save()

    // Определяем цвет фона в зависимости от состояния
    const backgroundColor = this.isHovered
      ? this.style.hoverBackgroundColor
      : this.style.backgroundColor

    // Рисуем тень кнопки
    this.ctx.fillStyle = this.style.shadowColor
    this.ctx.fillRect(this.x + 5, this.y + 5, this.width, this.height)

    // Рисуем саму кнопку
    this.ctx.fillStyle = backgroundColor
    this.ctx.fillRect(this.x, this.y, this.width, this.height)

    // Рисуем границу кнопки
    this.ctx.strokeStyle = this.style.borderColor
    this.ctx.lineWidth = this.style.borderWidth
    this.ctx.strokeRect(this.x, this.y, this.width, this.height)

    // Рисуем текст кнопки (с учетом DPR)
    this.ctx.font = `${this.style.fontSize}px ${this.style.fontFamily}`
    this.ctx.textAlign = 'center'
    this.ctx.textBaseline = 'middle'
    this.ctx.fillStyle = this.style.textColor
    this.ctx.fillText(this.text, this.x + this.width / 2, this.y + this.height / 2)

    this.ctx.restore()
  }

  public handleClick(): void {
    if (this.onClickCallback) {
      this.onClickCallback()
    }
  }

  public handleMouseMove(x: number, y: number) {
    const isHovered = this.isPointInside(x, y)
    if (isHovered !== this.isHovered) {
      this.isHovered = isHovered
      this.draw()
    }
  }

  public isPointInside(x: number, y: number): boolean {
    return x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.height
  }
}
