/**
 * 开发环境：development
 * 生产环境：production
 * 测试环境：test
 */
let BASE_URL = ''
const TIME_OUT = 10000
if (process.env.NODE_ENV === 'development') {
  BASE_URL = 'http://192.168.85.5:8000'
} else if (process.env.NODE_ENV == 'production') {
  BASE_URL = 'http://192.168.85.5:8000'
} else {
  BASE_URL = 'http://192.168.85.5:8000'
}

export { BASE_URL, TIME_OUT }
