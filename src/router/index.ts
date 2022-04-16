import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
export type MenuType = RouteRecordRaw & {
  meta: {
    hidden?: boolean
    title?: string
    icon?: string
  }
  children?: MenuType[]
}
const routes: Array<MenuType> = [
  {
    path: '/login',
    meta: { hidden: true },
    name: 'Login',
    component: () => import('@/views/login/index.vue')
  },
  {
    path: '/404',
    name: '404',
    meta: { hidden: true },
    component: () => import('@/views/result/404.vue')
  }
  // {
  //   path: '/',
  //   name: 'BaseLayout',
  //   component: () => import('@/layout/index.vue'),
  //   redirect: '/home',
  //   meta: {},
  //   children: [
  //     {
  //       path: '/home',
  //       name: 'Home',
  //       meta: { title: '主页', icon: 'dashboard' },
  //       component: () => import('@/views/home/index.vue')
  //     },
  //     {
  //       path: '/user',
  //       name: 'User',
  //       redirect: '/user/admin',
  //       meta: { title: 'user', icon: 'dashboard' },
  //       component: () => import('@/layout/defaultRouter.vue'),
  //       children: [
  //         {
  //           path: '/user/admin',
  //           name: 'Admin',
  //           meta: { title: 'admin', icon: 'dashboard' },
  //           component: () => import('@/views/user/admin/index.vue')
  //         },
  //         {
  //           path: '/user/editor',
  //           name: 'Editor',
  //           meta: { title: 'editor', icon: 'dashboard' },
  //           component: () => import('@/views/user/editor/index.vue')
  //         }
  //       ]
  //     }
  //   ]
  // },
  // { path: '/:catchAll(.*)', meta: { hidden: true }, redirect: '/404' }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})
// 解决Error: Redirected when going from "/login?redirect=%2Fhome" to "/" via a nav
// const originalPush = router.prototype.push
// router.prototype.push = function push(location, onResolve, onReject) {
//   if (onResolve || onReject) {
//     return originalPush.call(this, location, onResolve, onReject)
//   }
//   return originalPush.call(this, location).catch(err => err)
// }
// const originalPush = VueRouter.prototype.push
// VueRouter.prototype.push = function push(location, onResolve, onReject) {
//   if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
//   return originalPush.call(this, location).catch(err => err)
// }

export default router
