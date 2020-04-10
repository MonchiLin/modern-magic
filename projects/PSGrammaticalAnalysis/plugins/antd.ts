import Vue from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

Vue.config.productionTip = false
Vue.use(Antd)

Vue.prototype.$message.config({
  duration: 1,
  maxCount: 1
})
