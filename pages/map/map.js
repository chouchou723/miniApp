// pages/map/map.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    mapCtx:{},
    polyline: [{
      points: [{
        longitude: 121.448918,
        latitude: 31.191698
      }, {
          longitude: 121.448064,
          latitude: 31.226665
        } ],
      color: "#FF0000DD",
      width: 2,
      dottedLine: true
    }],
    controls: [{
      id: 1,
      iconPath: '../../static/image/loc.png',
      position: {
        left: 0,
        top: 671 - 30,
        width: 30,
        height: 30
      },
      clickable: true
    }]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    regionchange(e) {
      console.log(e.type)
    },
    markertap(e) {
      console.log(e.markerId)
    },
    controltap(e) {
      this.mapCtx.moveToLocation()
    },
    onReady: function (e) {
      // 使用 wx.createMapContext 获取 map 上下文
      this.mapCtx = wx.createMapContext('map');
      // console.log(1)
    },
  }
})
