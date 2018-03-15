// 获取全局应用程序实例对象
const app = getApp();
// 创建页面实例对象
Page({
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
    r5:[1,2,3,4,5],
    r4:[1,2,3,4],
    r3:[1,2,3],
    r2:[1,2],
    r1:[1],
    r0:[]
  },
  onLoad() {
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
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {
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
    Promise.all(promises).then(boards => this.setData({ boards: boards, loading: false, dis: false }))
  }
})
