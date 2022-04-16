import http from '@/service'
import { ResType } from '../index'
interface LoginParam {
  password: string
  username: string
}

export function login(data: LoginParam): Promise<ResType<unknown>> {
  return http.post('/master/api/v0/user/login', data)
}
