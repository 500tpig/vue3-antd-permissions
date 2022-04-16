/**
 * @description 获取storage储存
 * @returns {string}
 */
export function getStorageItem(storage: string, key: string): string {
  if (storage) {
    if ('localStorage' === storage) {
      return localStorage.getItem(key) || ''
    } else if ('sessionStorage' === storage) {
      return sessionStorage.getItem(key) || ''
    } else {
      return localStorage.getItem(key) || ''
    }
  } else {
    return localStorage.getItem(key) || ''
  }
}

/**
 * @description 存储
 * @param accessToken
 * @returns {void|*}
 */
export function setStorageItem(storage: string, key: string, value: string): void {
  if (storage) {
    if ('localStorage' === storage) {
      return localStorage.setItem(key, value)
    } else if ('sessionStorage' === storage) {
      return sessionStorage.setItem(key, value)
    } else {
      return localStorage.setItem(key, value)
    }
  } else {
    return localStorage.setItem(key, value)
  }
}

/**
 * @description 移除accessToken
 * @returns {void|Promise<void>}
 */
export function removeStorageItem(storage: string, key: string): void {
  if (storage) {
    if ('localStorage' === storage) {
      return localStorage.removeItem(key)
    } else if ('sessionStorage' === storage) {
      return sessionStorage.clear()
    } else {
      return localStorage.removeItem(key)
    }
  } else {
    return localStorage.removeItem(key)
  }
}
