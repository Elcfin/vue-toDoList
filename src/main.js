import { createApp } from 'vue' /* 调用 createApp 返回一个应用实例 */
import App from './App.vue'
import axios from 'axios'

const app = createApp(App)

app.config.globalProperties.$http = axios
app.mount('.app')
