<!--
 * @Description: 
 * @Author: lzp
 * @Date: 2021-06-25 13:09:48
 * @LastEditTime: 2021-07-02 11:01:23
 * @LastEditors: xxx
-->
<template>
  <div id="app">
    <div class="zbox">
      <zp-calendar showlunar @dayMsg="getDayMsg"></zp-calendar>
    </div>
  </div>
</template>

<script>
import zpCalendar from '../packages/index'
export default {
  name: 'App',
  components: { zpCalendar },
  methods: {
    getDayMsg(day) {
      console.log('日期信息', day)
    },
  },
}
</script>

<style>
.zbox {
  width: 400px;
  height: 500px;
}
</style>
