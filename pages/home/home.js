// pages/home/home.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    formSubmit: function (e) {
      console.log('form发生了submit事件，携带数据为：', e.detail.value)
    },
    formReset: function () {
      console.log('form发生了reset事件')
    },
    onPullDownRefresh(){
      console.log('开始刷新')
    }
  }
})
