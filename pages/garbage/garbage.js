// pages/garbage/garbage.js
const App = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputVal:'',
    title: '',
    desc: '',
    list: '',
    content:'',
    type:''
  },
  bindViewTap: function () {
    console.log(1)
    this.checkNewList()
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value,
    });
  },
  checkNewList: function () {
    var vm = this;
    const { inputVal } = this.data;
    console.log(inputVal)
    App.showLoading();
    wx.request({
      method: 'GET',
      url: `https://www.choulovecandy.cn/searchGarbage/${inputVal}`,
      success: (res) => {
        // console.log(res)

        const { data } = res;
        // const lines = data.allLines;
        // if (lines.indexOf(inputVal) < 0) {
          App.hideLoading();
if(!data.title){
  App.showModal('', '哎呀, 没有查到哟～请自行百度啦~', () => { vm.setData({ inputVal:''}) });
}
        //   App.showModal('提示', '哎呀, 没有找到您查询的路线～', () => { });
        // } else {
        //   vm.searchAndJump();
        // }
        // wx.setStorage({ key: "allLines", data: lines });
        let c = data.content.split('：')[1]
        let type = data.title === '有害垃圾' ? 1 : data.title === '可回收物' ? 2 : data.title === '湿垃圾' ?3:4
        let color = data.title === '有害垃圾' ? '#d73723' : data.title === '可回收物' ? '#00457C' : data.title === '湿垃圾' ? '#653F34' : '#2A2925'
        vm.setData({
          type:type,content: c, desc: data.desc, list: data.list, title: data.title,color:color
         });
         console.log(vm.data)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: 'ChouChouLoveCandy',
      path: '/pages/garbage/garbage'
    }
  },
})