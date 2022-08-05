//封装本地存储态
class Storage {
  get(key) {
    //getItem（key：string）：string
    //JSON.parse 只能转化JSON字符串
    const value = localStorage.getItem(key)
    //如果是JSON，直接parse
    //如果不是直接返回value
    try {
      return JSON.parse(value)
    } catch (error) {
      return value
    }
  }
  set(key, value) {
    if (typeof value === 'object' && value !== null) {
      value = JSON.stringify(value)
    }
    localStorage.setItem(key, value)
  }
  remove() {
    localStorage.removeItem(key)
  }
}
export default new Storage()
