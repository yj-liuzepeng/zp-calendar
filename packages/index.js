/*
 * @Description: 日历组件   0.0.1
 * @Author: lzp
 * @Date: 2021-06-25 13:26:54
 * @LastEditTime: 2021-06-25 15:45:01
 * @LastEditors: xxx
 */
import zpCalendar from './calendar/index.vue'

/* istanbul ignore next */
zpCalendar.install = function(Vue) {
  Vue.component(zpCalendar.name, zpCalendar)
}

export default zpCalendar
