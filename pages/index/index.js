//index.js
const app = getApp();
Page({
  data: {
    zoomIn:0,
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    arrayL: [{ id: '1', itemName: '爱の电影', path: '../../static/image/food.png', url: '../board/board' }, { id: '2', itemName: '爱の公交', path: '../../static/image/food2.png', url: '../bus/bus' }, 
      { id: '3', itemName: '爱の画廊', path: '../../static/image/food3.png', url: '../pic/pic' }, { id: '4', itemName: '爱の计时', path: '../../static/image/food4.png', url: '../form/form'}]
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../form/form'
    })
  },
  next(event) {
    this.setData({ zoomIn: event.target.dataset.hi});
    wx.navigateTo({
      url: event.target.dataset.hi
    })
    // setTimeout(()=>{

    // this.setData({ zoomIn: 0 })
    // },1000)
  },
  onShareAppMessage: function () {
    return {
      title: 'ChouChouLoveCandy',
      path: '/pages/index/index'
    }
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onHide() {
    this.setData({ zoomIn: 0 })
  }, 
  getUserInfo: function (e) {//手动获取
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo ,
      hasUserInfo: true
    })
  }
})
