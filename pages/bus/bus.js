const App = getApp();
import * as Rest from '../../utils/restUtil';
import allLine from './allLine';
Page({
  data: {
    inputShowed: false,
    inputVal: "",
    matchedBus: [],
    history: wx.getStorageSync('history') || [],
    names: wx.getStorageSync('allLines') || [],
    met:"../../static/image/metro.gif",
    ww:'',
    wh:'',
    olddistance:'',//上一次两个手指的距离
    newdistance: "",//本次两手指之间的距离，两个一减咱们就知道了滑动了多少，以及放大还是缩小（正负嘛）  
    diffdistance: '', //这个是新的比例，新的比例一定是建立在旧的比例上面的，给人一种连续的假象  
    Scale: 1,//图片放大的比例，
    oldscaleA:0,
    baseHeight: '',       //原始高  
    baseWidth: '', 
    height:'',
    width:'',
    canshow:false,
  },

  onLoad: function () {
    var vm = this;
    let allLines = wx.getStorageSync('allLines');
    // console.log(allLine.allLine)
    App.getUserInfo((userInfo) => {
      vm.setData({ userInfo });
      // Rest.post('/api/user/add', userInfo, () => { });
      if (!allLines.length) {
        let d = allLine.allLine;
        const lines = d.split(',');
        wx.setStorage({ key: "allLines", data: lines });
        allLines = lines;
        vm.setData({ names: allLines });
        // Rest.get('/bus/names/all', (res) => {
        //   const { data } = res;
        //   const lines = data.names.split(',');
        //   wx.setStorage({ key: "allLines", data: lines });
        //   allLines = lines;
        //   vm.setData({ names: allLines });
        // });
      }
    });
  },
onReady(){
  wx.getSystemInfo({
    success: (res) => {
      this.setData({
        ww: res.windowWidth,
        wh: res.windowHeight,
        height: res.windowHeight,
        width: res.windowHeight,
        baseHeight: res.windowHeight,
        baseWidth: res.windowHeight,
        
      });
    }
  })
  var context = wx.createCanvasContext('firstCanvas')
  context.drawImage(this.data.met, 0, 0,this.data.ww,this.data.wh);
  context.draw();
},
  onShareAppMessage: function () {
    return {
      title: 'ChouChouLoveCandy',
      path: '/pages/bus/bus'
    }
  },

  onHide: function () {
    this.setData({
      inputShowed: false,
      inputVal: "",
      matchedBus: [],
      history: wx.getStorageSync('history') || []
    });
  },

  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },

  hideInput: function () {
    this.setData({
      inputVal: "",
      matchedBus: [],
      inputShowed: false
    });
  },

  clearInput: function () {
    this.setData({
      inputVal: "",
      matchedBus: []
    });
  },

  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value,
      matchedBus: this.checkBusName(this.data.names, e.detail.value)
    });
  },

  selectBusName: function (e) {
    this.setData({
      inputVal: e.target.id,
      matchedBus: []
    });
  },

  checkBusName: function (data, key) {
    if (!key.length || !data) return [];
    return data.filter(item =>item.includes(key));
  },

  bindOnClickHistory: function (e) {
    const { name } = e.target.dataset;
    wx.request({
      method: 'GET',
      url: `https://www.choulovecandy.cn/busname/${name}`,
      success: (res) => {
        // console.log(res)
        wx.setStorage({ key: "sid", data: res.data.sid });
    if (name) {
      wx.navigateTo({
        url: '../bus/busDetail?name=' + name
      });
    }
      }
    })
  },

  bindOnClearAll: function () {
    var vm = this;
    wx.removeStorage({
      key: 'history',
      success: function (res) {
        vm.setData({ history: [] });
      }
    });
  },

  bindOnClearHistoryItem: function (e) {
    const { history } = this.data;
    var index = history.findIndex(i => i === e.target.dataset.name);
    history.splice(index, 1);
    wx.setStorage({
      key: "history",
      data: history
    });
    this.setData({ history });
  },

  bindOnSearch: function () {
    const { history, inputVal, names } = this.data;
    if (!inputVal.length) return;
    if (names.indexOf(inputVal) < 0) {
      App.showModal('提示', '哎呀, 没有找到您查询的路线～', () => { });
    } else {
      wx.request({
        method: 'GET',
        url: `https://www.choulovecandy.cn/busname/${inputVal}`,
        success: (res) => {
          // console.log(res)
          wx.setStorage({ key: "sid", data: res.data.sid });
          wx.navigateTo({
            url: '../bus/busDetail?name=' + inputVal
          });
        }
      })
      if (!history.includes(inputVal)) {
        if (history.length >= 8) {
          history.splice(history.length - 1, 1);
        }
        history.unshift(inputVal);
      }
      this.setData({ history });
      wx.setStorage({ key: "history", data: history });
      // wx.setStorage({ key: "sid", data: history });
      
     
    }
  },
  scroll: function (e) {
    var _this = this;
    // console.log(e)
    //当e.touches.length等于1的时候，表示是单指触摸，我们要的是双指
    if (e.touches.length == 2) {//两个手指滑动的时候
      var xMove = e.touches[1].clientX - e.touches[0].clientX;//手指在x轴移动距离
      var yMove = e.touches[1].clientY - e.touches[0].clientY;//手指在y轴移动距离
      var distance = Math.sqrt(xMove * xMove + yMove * yMove);//根据勾股定理算出两手指之间的距离 
      if (_this.data.olddistance == 0) {
        _this.setData({
          olddistance : distance,
        })
      } else {
        _this.setData({
          olddistance: _this.data.newdistance,
          newdistance: distance,
          diffdistance: _this.data.newdistance - _this.data.olddistance,
          Scale: _this.data.oldscaleA + 0.005 * _this.data.diffdistance//这条公式是我查阅资料后找到的，按照这条公式计算出来的比例来处理图片，能给用户比较好的体验
        })
        if (_this.data.Scale > 10) {//放大的最大倍数
          return;
        } else if (_this.data.Scale < 1) {//缩小不能小于当前
          return;
        }
        //刷新.wxml ，每次相乘，都是乘以图片的显示宽高
        // console.log(_this.data.Scale)
        _this.setData({
          height: _this.data.baseHeight * _this.data.Scale,
          width: _this.data.baseWidth * _this.data.Scale,
          oldscaleA: _this.data.Scale
        })


      }
    }
  },
  endTou: function (e) {
    this.setData({
      olddistance:0
    })
  },
  openS(){
    this.setData({
      canshow:true
    })
  },
  closeS() {
    this.setData({
      canshow: false
    })
  }
})