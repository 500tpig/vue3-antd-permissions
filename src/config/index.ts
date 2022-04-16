interface ConfigType {
  tokenName: string
  storage: string
  routeStorage: string
  routeName: string
}
const config: ConfigType = {
  // token名称
  tokenName: 'accessToken',
  // token存储位置localStorage sessionStorage cookie
  storage: 'localStorage',
  routeStorage: 'sessionStorage',
  routeName: 'vue3-routes'
}

export default config
