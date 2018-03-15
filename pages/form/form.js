//form.js
const app = getApp();
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
  },
  //事件处理函数
  next() {
    if(this.data.count===0){
      clearInterval(this.data.can)
      this.setData({
        count:1,
        motto:'Marry Day',
        ot:'2017/02/18 12:00',
        can: setInterval(this.changeTime, 1000)});
      this.changeTime();
    }else{
      clearInterval(this.data.can)
      this.setData({
        count: 0,
        motto: 'Love Story Start',
        ot: '2015/12/19 12:00',
        can: setInterval(this.changeTime, 1000)
      });
      this.changeTime();
    }
  },
  changeTime(){
    let a = this.data.ot;
    let c = (new Date() - new Date(a));
    let b = Math.floor((new Date() - new Date(a)) / 3600 / 24 / 1000);
    // console.log(Math.floor((c % 3600000) / 60000).length)
    this.setData({
      now: b,
      hour: Math.floor(c / 3600000 % 24) <10  ? '0' + Math.floor(c / 3600000 % 24) : Math.floor(c / 3600000 % 24),
      minute: Math.floor((c % 3600000) / 60000)< 10 ? '0' + Math.floor((c % 3600000) / 60000) : Math.floor((c % 3600000) / 60000) ,
      second: Math.floor(((c % 3600000) % 60000) / 1000) < 10 ? '0' + Math.floor(((c % 3600000) % 60000) / 1000) : Math.floor(((c % 3600000) % 60000) / 1000)
    })
  },
  onUnload:function(){
    clearInterval(this.data.can)
  },
  onLoad: function () {
    this.setData({
      can: setInterval(this.changeTime, 1000)
    })
    this.changeTime();
  },
  onShareAppMessage: function () {
    return {
      title: 'ChouChouLoveCandy',
      path: '/pages/form/form'
    }
  },
  primary(){
    wx.requestPayment({
      'timeStamp': '',
      'nonceStr': '',
      'package': '',
      'signType': 'MD5',
      'paySign': '',
      'success': function (res) {
      },
      'fail': function (res) {
      }
    })
  }
})
