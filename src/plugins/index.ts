import { App } from 'vue'
import initAnt from './ant'
import initGlobalComponent from './component'

export default function (app: App): void {
  initAnt(app)
  initGlobalComponent(app)
}
