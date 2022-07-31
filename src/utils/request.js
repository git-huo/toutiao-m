//引入
import axios from 'axios'

//克隆
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: 3000
})
export default request
