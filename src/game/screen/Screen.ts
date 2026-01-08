export interface Screen {
  draw(): void
  handleMouseMove(x: number, y: number): void
  handleClick(x: number, y: number): void
}
