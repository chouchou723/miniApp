// 获取全局应用程序实例对象
const app = getApp()

// 创建页面实例对象
Page({
  /**
   * 页面的初始数据
   */
  data: {
    boards: [
      { key: 'in_theaters' },
      { key: 'coming_soon' },
      { key: 'top250' }
      // { key: 'weekly' },
      // { key: 'new_movies' },
      // { key: 'us_box', name: '北美票房榜' }
    ],
    loading: true,
    dis:true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    // console.log(app.douban)
    app.showLoading('加载中');
    const promises = this.data.boards.map(board => {
      return app.data.douban.find(board.key, 1, 10)
        .then(d => {
          board.title = d.title
          board.movies = d.subjects
          app.hideLoading();
          return board
        })
    })
    Promise.all(promises).then(boards => this.setData({ boards: boards, loading: false,dis:false }))
  },
  onShareAppMessage: function () {
    return {
      title: 'ChouChouLoveCandy',
      path: '/pages/board/board'
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {
    // TODO: onReady
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // TODO: onShow
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    // TODO: onHide
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    // TODO: onUnload
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
    // TODO: onPullDownRefresh
  }
})
