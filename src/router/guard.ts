import { getStorageItem, setStorageItem } from '@/utils/storage'
import router from './index'
import config from '@/config'
import { RouterType } from '@/store/modules/user'
import store from '@/store'
import { NavigationGuardNext, RouteLocationNormalized, RouteRecordNormalized, RouteRecordRaw } from 'vue-router'
import { filterAsyncRouter } from '@/utils'

const whiteList = ['/login'] // no redirect whitelist

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let getRouter: any // 用来获取后台拿到的路由

// 假装fakeRouter是通过后台接口请求回来的数据
const fakeRouter: RouterType[] = [
  {
    path: '/',
    name: 'BaseLayout',
    filePath: '@/layout/index.vue',
    redirect: '/home',
    meta: {},
    children: [
      {
        path: '/home',
        name: 'Home',
        meta: { title: '主页', icon: 'dashboard' },
        filePath: 'home/index.vue'
      },
      {
        path: '/user',
        name: 'User',
        redirect: '/user/admin',
        meta: { title: 'user', icon: 'dashboard' },
        filePath: '@/layout/defaultRouter.vue',
        children: [
          {
            path: '/user/admin',
            name: 'Admin',
            meta: { title: 'admin', icon: 'dashboard' },
            filePath: 'user/admin/index.vue'
          },
          {
            path: '/user/editor',
            name: 'Editor',
            meta: { title: 'editor', icon: 'dashboard' },
            filePath: 'user/editor/index.vue'
          }
        ]
      }
    ]
  }
]
router.beforeEach(async (to, from, next) => {
  const hasToken = getStorageItem(config.storage, config.tokenName)
  if (hasToken) {
    if (to.path === '/login') {
      // 如果已经登录了，就重定向去首页
      next({ path: '/' })
    } else {
      if (!getRouter) {
        if (!getStorageItem(config.routeStorage, config.routeName)) {
          // getRoutes().then((response) => {
          //   console.log(response)
          // })
          getRouter = fakeRouter // 假装模拟后台请求得到的路由数据
          setStorageItem(config.routeStorage, config.routeName, JSON.stringify(getRouter)) // 存储路由到sessionStorage
          await store.dispatch('user/generateRoutes', getRouter)
          routerGo(to, next) // 执行路由跳转方法
          // })
        } else {
          // 从sessionStorage拿到了路由
          getRouter = JSON.parse(getStorageItem(config.routeStorage, config.routeName)) // 拿到路由
          await store.dispatch('user/generateRoutes', getRouter)
          routerGo(to, next)
          next()
        }
      } else {
        next()
      }
    }
  } else {
    // 如果没有登录
    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
    }
  }
})

// router.afterEach((to, from) => {})

function routerGo(to: RouteLocationNormalized, next: NavigationGuardNext) {
  getRouter = filterAsyncRouter(getRouter) // 过滤路由
  if (getRouter) {
    getRouter.map((item: RouteRecordRaw) => {
      router.addRoute(item) // 动态添加路由
    })
  }
  if (router.getRoutes().findIndex((d: RouteRecordNormalized) => d.path === '/:catchAll(.*)') === -1) {
    // 设置404页面放在最后面
    router.addRoute({ path: '/:catchAll(.*)', meta: { hidden: true }, redirect: '/404' })
  }
  // global.antRouter = getRouter // 将路由数据传递给全局变量，做侧边栏菜单渲染工作
  next({ ...to, replace: true })
}
