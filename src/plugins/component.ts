/**
 * 全局组件
 */
import { App } from 'vue'
import SvgIcon from '@/components/SvgIcon/index.vue'
export default function (app: App): void {
  app.component('svg-icon', SvgIcon)
}
