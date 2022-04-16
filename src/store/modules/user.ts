import { Commit, Module } from 'vuex'
import { login } from '@/service/api/login'
import config from '@/config'
import { getStorageItem, setStorageItem, removeStorageItem } from '@/utils/storage'
import { RouteComponent } from 'vue-router'
export interface RouterType {
  path: string
  name: string
  filePath: string
  redirect?: string
  hidden?: boolean
  component?: RouteComponent
  meta?: {
    title?: string
    icon?: string
  }
  children?: RouterType[]
}

//定义一个state的接口
export interface UserState {
  token: string
  routes: RouterType[]
}

const getDefaultState = () => {
  return {
    token: '',
    routes: []
  }
}

const store: Module<UserState, Commit> = {
  namespaced: true,
  state() {
    return {
      token: getStorageItem(config.storage, config.tokenName),
      routes: []
    }
  },
  getters: {
    getMenu(state: UserState) {
      return state.routes
    }
  },
  mutations: {
    SET_TOKEN: (state: UserState, token: string) => {
      state.token = token
    },
    RESET_STATE: state => {
      Object.assign(state, getDefaultState())
    },
    SET_PERMISSIONS_ROUTER: (state, routes) => {
      state.routes = routes
    }
  },
  actions: {
    login({ commit }, params: { username: string; password: string }) {
      const { username, password } = params
      return new Promise<void>((resolve, reject) => {
        login({ username: username.trim(), password: password })
          .then(async response => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const data: any = response.data
            commit('SET_TOKEN', data.authorization)
            setStorageItem(config.storage, config.tokenName, data.authorization)
            resolve()
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    // user logout
    logout({ commit }) {
      return new Promise<void>(resolve => {
        removeStorageItem(config.storage, config.tokenName)
        removeStorageItem(config.routeStorage, config.routeName)
        commit('RESET_STATE')
        resolve()
        // .catch(error => {
        //   reject(error)
        // })
      })
    },
    generateRoutes({ commit }, routes) {
      return new Promise<void>(resolve => {
        commit('SET_PERMISSIONS_ROUTER', routes)
        resolve()
        // .catch((error) => {
        //   reject(error)
        // })
      })
    }
  }
}

export default store
