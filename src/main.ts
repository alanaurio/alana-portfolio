import './styles.css'
import { renderPage } from './render'
import { startMotion } from './motion'

const app = document.querySelector<HTMLElement>('#app')

if (app) {
  // No build, o HTML já vem pré-renderizado (ADR 0003); no dev, monta aqui.
  if (!app.firstElementChild) app.innerHTML = renderPage()
  startMotion()
}
