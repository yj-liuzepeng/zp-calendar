<!--
 * @Description: 
 * @Author: lzp
 * @Date: 2021-06-23 16:55:55
 * @LastEditTime: 2021-07-02 12:25:17
 * @LastEditors: xxx
-->
<template>
  <div id="calendar">
    <!-- 年份 月份 -->
    <div class="months">
      <div class="year-month">{{ currentYear }}年{{ currentMonth }}月</div>
      <div class="toggle-month">
        <span class="lt" @click="preMonth()">&lt;</span>
        <span class="ct" @click="initData()">今天</span>
        <span class="rt" @click="nextMonth()">&gt;</span>
      </div>
    </div>
    <!-- 星期 -->
    <ul class="weekdays">
      <li v-for="item in (fromsun ? weekDaysFromSun : weekDays)" :key="item">{{item}}</li>
    </ul>
    <!-- 日期 -->
    <ul class="days">
      <li v-for="(dayobject,i) in days" :key="i" @click="getClickDay(dayobject)">
        <span
          ref="cday"
          class="cday"
          :class="{'other-month': dayobject.cMonth!= currentMonth,
          'active': curDayMsg.date == dayobject.date}"
        >{{dayobject.cDay}}</span>

        <!-- 优先展示节日，其次，如果农历初一，展示当前农历月份，否则展示农历日期 -->
        <div
          v-if="showlunar"
          class="idaycn"
        >{{dayobject.festival ? dayobject.festival: (dayobject.IDayCn == '初一'? dayobject.IMonthCn:dayobject.IDayCn)}}</div>
        <slot></slot>
      </li>
    </ul>
  </div>
</template>
<script>
import calendar from './util/date'
export default {
  name: 'zpCalendar',
  data() {
    return {
      currentDay: 1,
      currentMonth: 1,
      currentYear: 2021,
      currentWeek: 1,
      days: [],
      curDayMsg: [],
      weekDays: ['一', '二', '三', '四', '五', '六', '日'],
      weekDaysFromSun: ['日', '一', '二', '三', '四', '五', '六'],
    }
  },
  props: {
    showlunar: {
      type: Boolean,
      default: false,
    },
    lines: {
      type: Number,
      default: 5,
    },
    fromsun: {
      type: Boolean,
      default: false,
    },
  },

  created() {
    this.initData()
  },

  methods: {
    // 初始化
    initData(cur) {
      let now, curMonthStartDay, curMonthStartWeek, curPageStartDay
      if (cur) {
        now = new Date(cur)
      } else {
        now = new Date()
      }
      this.currentYear = now.getFullYear()
      this.currentMonth = now.getMonth() + 1
      this.currentDay = now.getDay()
      // 获取当前月第一天
      curMonthStartDay = new Date(
        this.formatDate(now.getFullYear(), now.getMonth() + 1, 1)
      )
      // 当前月第一天是周几
      curMonthStartWeek = curMonthStartDay.getDay() // 1,2,3,4,5,6,0
      if (curMonthStartWeek == 0) {
        curMonthStartWeek = 7
      }
      // 日历当前页开始日期
      curPageStartDay =
        curMonthStartDay -
        (this.fromsun ? curMonthStartWeek : curMonthStartWeek - 1) *
          24 *
          60 *
          60 *
          1000
      // 循环获取日历当前页所有日期（7*this.lines \5/6\）
      this.days = []
      for (let i = 0; i < this.lines * 7; i++) {
        let year = new Date(
          curPageStartDay + i * 24 * 60 * 60 * 1000
        ).getFullYear()
        let month =
          new Date(curPageStartDay + i * 24 * 60 * 60 * 1000).getMonth() + 1
        let day = new Date(curPageStartDay + i * 24 * 60 * 60 * 1000).getDate()
        this.days.push(calendar.solar2lunar(year, month, day))
      }
      if (!cur) {
        this.curDayMsg = calendar.solar2lunar(
          this.currentYear,
          this.currentMonth,
          now.getDate()
        )
        this.$emit('dayMsg', this.curDayMsg)
      }
    },

    // 上一月
    preMonth() {
      this.currentMonth--
      if (this.currentMonth == 0) {
        this.currentMonth = 12
        this.currentYear--
      }
      this.initData(this.formatDate(this.currentYear, this.currentMonth, 1))
    },

    // 下一月
    nextMonth() {
      this.currentMonth++
      if (this.currentMonth == 13) {
        this.currentMonth = 1
        this.currentYear++
      }
      this.initData(this.formatDate(this.currentYear, this.currentMonth, 1))
    },

    // 点击日期
    getClickDay(el) {
      this.curDayMsg = el
      this.$emit('dayMsg', this.curDayMsg)
    },

    // 格式化 -> 2020-11-20
    formatDate(year, month, day) {
      if (month < 10) month = '0' + month
      if (day < 10) day = '0' + day
      return year + '-' + month + '-' + day
    },
  },
}
</script>
<style>
ul li {
  list-style-type: none;
  margin: 0;
  padding: 0;
}
#calendar {
  font-size: 0.75rem;
  width: 100%;
  height: 100%;
  margin: 0 auto;
  overflow: hidden;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.1),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
.months {
  display: flex;
  justify-content: space-around;
  margin-top: 3%;
  margin-bottom: 3%;
}
.months .year-month {
  margin-left: -10%;
  font-size: 0.875rem;
}
.months .toggle-month {
  width: 23%;
  margin-right: -10%;
  text-align: center;
  border: 1px solid #edeeee;
  cursor: pointer;
}
.months .toggle-month .lt,
.months .toggle-month .rt {
  display: inline-block;
  width: 24%;
  color: #bebdbe;
  text-align: center;
}
.months .toggle-month .ct {
  display: inline-block;
  width: 48%;
  text-align: center;
  border-right: 1px solid #edeeee;
  border-left: 1px solid #edeeee;
  color: #000;
}
.weekdays {
  padding: 0;
  display: flex;
  color: #999;
  justify-content: space-around;
}
.weekdays li {
  display: inline-block;
  width: 13.6%;
  text-align: center;
}
.days {
  margin: 0;
  padding: 1% 0;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.days li {
  display: inline-block;
  width: 14.2%;
  padding-bottom: 5%;
  padding-top: 2%;
  text-align: center;
  color: #000;
  cursor: pointer;
}
.vishidden {
  visibility: hidden;
}
.days li .active {
  display: inline-block;
  width: 1.5625rem;
  height: 1.5625rem;
  line-height: 1.5625rem;
  text-align: center;
  border-radius: 50%;
  background: #5cc18d !important;
  color: #fff;
}
.days li .other-month {
  color: gainsboro;
}
.days li .cday {
  display: inline-block;
  width: 1.5625rem;
  height: 1.5625rem;
  line-height: 1.5625rem;
  text-align: center;
}
.days li:hover .cday {
  border-radius: 50%;
  background: #e1e1e1;
  color: #fff;
}
.recday {
  display: inline-block;
  width: 1.5625rem;
  height: 1.5625rem;
  line-height: 1.5625rem;
  text-align: center;
  border-radius: 50%;
  background: #e1e1e1;
  color: #fff;
}
.idaycn {
  margin-top: 10%;
  color: #999;
}
</style>

