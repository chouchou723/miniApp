// pages/form/form.js
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
    tip: '',
    userName: '',
    psw: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
    formSubmit: function (e) {
      if (e.detail.value.userName.length == 0 || e.detail.value.psw.length == 0) {
        this.setData({
          tip: '提示：用户名和密码不能为空！',
          userName: '',
          psw: ''
        })
      } else {
        var that = this
        that.setData({
          userName: e.detail.value.userName,
          psw: e.detail.value.psw
        })
      }
    },
    Reset: function () {
      this.setData({
        tip: '',
        userName: '',
        psw: ''
      })
    }
  }
})
