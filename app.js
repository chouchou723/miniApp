//app.js
const douban = require('./utils/douban.js')
import * as CONSTANT from './utils/constant';
import * as Rest from './utils/restUtil';
App({
  data:{
    douban: douban,
  },
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  showModal(title = CONSTANT.MODAL_TIPS, content = CONSTANT.SERVER_ERROR, cb) {
    wx.showModal({
      title,
      content,
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          cb();
        }
      }
    });
  },
  getUserInfo: function (cb) {
    const vm = this;
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      wx.login({
        success: function () {
          wx.getUserInfo({
            success: function (res) {
              vm.globalData.userInfo = res.userInfo
              typeof cb == "function" && cb(vm.globalData.userInfo)
            }
          })
        }
      })
    }
  },
  showLoading(title = '查询中', icon = 'loading') {
    wx.showToast({
      title,
      icon
    });
  },
  hideLoading() {
    wx.hideToast();
  },
  globalData: {
    userInfo: null
  }
})