export const authStorageConstants = {
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
  }
  
  const isBrowser = typeof window !== 'undefined'
  
  export const setLocalStorage = (name: string, value: any) => {
    if (isBrowser) {
      localStorage.setItem(name, JSON.stringify(value))
    }
  }
  
  export const getLocalStorage = (name: string) => {
    if (isBrowser) {
      const item = localStorage.getItem(name)
      return item ? JSON.parse(item) : null
    }
    return null
  }
  
  export const removeLocalStorage = (name: string) => {
    if (isBrowser) {
      localStorage.removeItem(name)
    }
  }
  
  export const AuthStorage = {
    setAccessToken: (accessToken: string) => {
      if (accessToken && isBrowser) {
        localStorage.setItem(authStorageConstants.accessToken, accessToken)
      }
    },
  
    setRefreshToken: (refreshToken: string) => {
      if (refreshToken && isBrowser) {
        localStorage.setItem(authStorageConstants.refreshToken, refreshToken)
      }
    },
  
    getAccessToken: () => {
      if (isBrowser) {
        return localStorage.getItem(authStorageConstants.accessToken)
      }
      return null
    },
  
    getRefreshToken: () => {
      if (isBrowser) {
        return localStorage.getItem(authStorageConstants.refreshToken)
      }
      return null
    },
  
    clearToken: () => {
      if (isBrowser) {
        localStorage.removeItem(authStorageConstants.accessToken)
        localStorage.removeItem(authStorageConstants.refreshToken)
      }
    },
  }
  