NAME

zp-calendar

USE

```
npm i zp-calendar
yarn add zp-calendar
```

| 参数      | 说明                                                                                 |
| --------- | ------------------------------------------------------------------------------------ |
| showlunar | 是否显示农历及节日，默认不显示，加上 showlunar 显示                                  |
| fromsun   | 周起始日，默认周一开始，加上 fromsun 则从周日开始                                    |
| lines     | 日历行数，默认当前日历页显示 5 行（35 天），可设置 属性 lines=‘6’ 显示 6 行（42 天） |

| 方法名 | 说明                                                         |
| ------ | :----------------------------------------------------------- |
| dayMsg | @dayMsg="getDayMsg"         getDayMsg(day) { console.log('日期信息', day)  }       获取日期 |

