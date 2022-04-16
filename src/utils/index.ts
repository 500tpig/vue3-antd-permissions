import Layout from '@/layout/index.vue' // Layout 是架构组件，不在后台返回，在文件里单独引入
import defaultLayout from '@/layout/defaultRouter.vue' // Layout 是架构组件，不在后台返回，在文件里单独引入
import { RouterType } from '@/store/modules/user'

export const loadView = (view: string) => {
  // 路由懒加载
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return () => require.ensure([], require => require(`@/views/${view}`))
}
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function filterAsyncRouter(asyncRouterMap: RouterType[]) {
  // 遍历后台传来的路由字符串，转换为组件对象
  const accessedRouters = asyncRouterMap.filter(route => {
    if (route.filePath) {
      if (route.filePath === '@/layout/index.vue') {
        // Layout组件特殊处理
        route.component = Layout
      } else if (route.filePath === '@/layout/defaultRouter.vue') {
        route.component = defaultLayout
      } else {
        route.component = loadView(route.filePath)
      }
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })

  return accessedRouters
}
