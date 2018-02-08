// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    loading: true,
    movie: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(params) {
    app.data.douban.findOne(params.id)
      .then(d => {
        this.setData({ title: d.title, movie: d, loading: false })
        wx.setNavigationBarTitle({ title: d.title})
      })
      .catch(e => {
        this.setData({ title: '获取数据异常', movie: {}, loading: false })
        console.error(e)
      })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    wx.setNavigationBarTitle({ title: this.data.title })
  },

  onShareAppMessage() {
    return {
      title: this.data.title,
      desc: '喜欢就多多分享吧~',
      path: '/pages/item/item?id=' + this.data.id
    }
  }
})
