import * as Rest from '../../utils/restUtil';

const App = getApp();

Page({
  data: {
    name: '',
    stopId: '',
    direction: 0,
    tips: '',
    busInfo: {},
    stations: {},
    stationsLeft: {},
    stationsRight: {},
    noShow: true,
    selected:0,
  },
  onLoad: function (option) {
    var vm = this;
    var name = option.name;
    if (!name.length) return;

    Rest.get(
      '/api/bus/' + encodeURIComponent(name),
      (res) => {
        if (res.statusCode === 200) {
          const { lineResults0, lineResults1, busLine } = res.data;
          const { start_stop, end_stop, end_earlytime, end_latetime, start_earlytime, start_latetime } = busLine;
          const stationsLeft = Object.assign({}, lineResults0, {
            start: start_stop,
            end: end_stop,
            earlytime: start_earlytime,
            latetime: start_latetime
          });
          const stationsRight = Object.assign({}, lineResults1, {
            start: end_stop,
            end: start_stop,
            earlytime: end_earlytime,
            latetime: end_latetime
          });
          vm.setData({ name, stations: stationsLeft, stationsLeft, stationsRight, noShow: false, busInfo: busLine });
        } else {
          App.showModal('提示', '哎呀，服务器开小差了～刷新一下吧～', () => { wx.navigateBack() });
          vm.setData({ noShow: true });
        }
      }
    );
  },

  onShareAppMessage() {
    const { name } = this.data;
    return {
      title: name + '-上海Bus',
      path: 'pages/bus/busDetail?name=' + name
    }
  },

  onClickSwitch: function (e) {
    const vm = this;
    const { stationsRight, stationsLeft } = vm.data;
    const stations = !vm.data.direction ? stationsRight : stationsLeft;
    const direction = !vm.data.direction ? 1 : 0;
    vm.setData({ stations, direction, stopId: '', tips: '' });
  },

  bindClickStop: function (e) {
    const vm = this;
    console.log(e)
    const { name, direction, busInfo } = vm.data;
    const lineId = busInfo.line_id;
    const stopId = e.target.id;
    const ss = e.target.dataset.idd-0;
    let stopIdd = ss < 10 ? ss + '.' :ss;
    const sid = wx.getStorageSync('sid');
// this.setData({stopId,tips:"暂未查到信息"})
    // console.log(e)
    if (stopId!=''){

    App.showLoading();
    wx.request({
      url: `https://www.choulovecandy.cn/bus/${sid}/${direction}/${stopIdd}`,
      success:res=>{
        // console.log(res)
        let tips = '';
        let data = res.data
        App.hideLoading();
        if (data.error == '-2' || data.error == '0'){
          tips = '暂未发车';
        }else{
          tips = '车牌:' + data[0].terminal + ', 剩余' + data[0].stopdis + '站, 约' + Math.ceil(data[0].time / 60) + '分钟';
        }
        vm.setData({ stopId, tips });
      }
    })
    }else{
      vm.setData({ stopId });
    }
    // Rest.get(
    //   '/api/busstop/' + encodeURIComponent(name) + '/' + lineId + '/' + stopId + '/' + direction,
    //   (res) => {
    //     let tips = '';
    //     const { data } = res;
    //     if (data.cars.length) {
    //       const { terminal, stopdis, time } = data.cars[0];
    //       if (time !== 'null') {
    //         tips = '车牌:' + terminal + ', 剩余' + stopdis + '站, 约' + Math.ceil(time / 60) + '分钟';
    //       }
    //     App.hideLoading();
    //     }
    //     vm.setData({ stopId, tips });
    //   }
    // );
  }
})