import { Game } from './game/Game'

// Ждем загрузки DOM
document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('gameCanvas') as HTMLCanvasElement

  if (!canvas) {
    console.error('Canvas element not found!')
    return
  }

  new Game(canvas)
})
