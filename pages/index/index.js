//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Welcome To Our World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    arrayL: [{ id: '1', itemName: '美食', path: '../../static/image/food.jpg', url: '../home/home' }, { id: '1', itemName: '地图', path: '../../static/image/food2.jpg', url: '../map/map' }, 
      { id: '1', itemName: '记录', path: '../../static/image/food3.png', url: '../pic/pic' }, { id: '1', itemName: '关于', path: '../../static/image/food4.png', url: '../form/form'}]
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  next(event) {
    // wx.chooseImage({
    //   count: 1, // 默认9
    //   sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    //   sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    //   success: function (res) {
    //     // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
    //     var tempFilePaths = res.tempFilePaths;
    //     wx.previewImage({
    //       current: tempFilePaths, // 当前显示图片的http链接
    //       urls: tempFilePaths // 需要预览的图片http链接列表
    //     })
    //   }
    // })
    console.log(event)
    wx.navigateTo({
      url: event.target.dataset.hi
    })
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
  getUserInfo: function (e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
