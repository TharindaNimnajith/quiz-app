import {authStoreKey} from '../config/main.config'

const setLocalStorageItem = async (key, obj) => {
  try {
    await localStorage.setItem(key, JSON.stringify(obj))
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

const removeFromLocalStorage = async key => {
  try {
    await localStorage.removeItem(key)
    return true
  } catch (error) {
    console.error(error)
    return false
  }
}

const checkUserInLocalStorage = () => {
  try {
    const data = getFromLocalStorage(authStoreKey)
    if (data) {
      return {
        status: true,
        result: data
      }
    } else {
      return {
        status: false
      }
    }
  } catch (error) {
    console.error(error)
    return {
      status: false
    }
  }
}

const getFromLocalStorage = key => {
  try {
    return JSON.parse(localStorage.getItem(key))
  } catch (error) {
    console.error(error)
    return false
  }
}

export {
  setLocalStorageItem,
  removeFromLocalStorage,
  checkUserInLocalStorage
}
