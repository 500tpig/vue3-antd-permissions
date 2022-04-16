import { createStore } from 'vuex'

import user from './modules/user'
const store = createStore({
  strict: true,
  modules: {
    user
  }
})
export default store
