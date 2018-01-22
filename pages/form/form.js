//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    ot:'2015/12/19 20:00',
    now:'',
    hour:'',
    minute: '',
    second: '',
    can:{},
    count:0,
    motto: 'Love Story Start',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    arrayL: [{ id: '1', itemName: '美食', path: '../../static/image/food.jpg', url: '../home/home' }, { id: '1', itemName: '地图', path: '../../static/image/food2.jpg', url: '../map/map' },
    { id: '1', itemName: '记录', path: '../../static/image/food3.png', url: '../home/home' }, { id: '1', itemName: '关于', path: '../../static/image/food4.png', url: '../pic/pic' }]
  },
  //事件处理函数
  bindViewTap: function () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  next() {
    console.log(this.count)
    if(this.data.count===0){
      this.setData({
        count:1,
        motto:'Marry Day',
        ot:'2017/02/18 12:00'});
      
    }else{
      this.setData({
        count: 0,
        motto: 'Love Story Start',
        ot: '2015/12/19 12:00'
      });
    }
  },
  changeTime(){
    let a = this.data.ot;
    let c = (new Date() - new Date(a));
    let b = Math.ceil((new Date() - new Date(a)) / 3600 / 24 / 1000)
    this.setData({
      now: b,
      hour: Math.floor(c / 3600000),
      minute: Math.floor((c % 3600000) / 60000),
      second: Math.floor(((c % 3600000) % 60000) / 1000)
    })
  },
  onUnload:function(){
    clearInterval(this.data.can)
  },
  onLoad: function () {
    this.can = setInterval(this.changeTime, 1000)
    this.changeTime();
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
