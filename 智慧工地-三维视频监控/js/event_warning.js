/**
 * 当日事件和事件预警对话框
 * */
let event_dialog = new Vue({
  el: '#event_dialog',
  data: {
    location: "北一区5号",
    time: "Jun 13 21:24:52",
    info: "未佩戴安全帽",
    status: "未处理!",
    eventdialogvisible: false,
    gridData: [{
      location: '北一区5号',
      time: 'Jun 13 21:24:52',
      info: '未佩戴安全帽',
      status: '已处理'
    }, {
      location: '北一区5号',
      time: 'Jun 13 21:24:52',
      info: '未佩戴安全帽',
      status: '已处理'
    }, {
      location: '北一区5号',
      time: 'Jun 13 21:24:52',
      info: '未佩戴安全帽',
      status: '已处理'
    }, {
      location: '北一区7号',
      time: 'Jun 13 17:24:52',
      info: '未佩戴安全帽',
      status: '未处理'
    }]
  },
  methods: {
    // 字体颜色动态改变函数
    cellStyle: function ({row}) {
      if(row.status === "未处理"){
        return "color:red";
      }
      else{
        return "";
      }
    },
    // 确认处理信息对话框
    handle: function () {
      this.$confirm('此操作将预警事件置于已处理状态, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
          this.gridData[3].status = "已处理";
      }).catch(() => {});
    },
    // 弹出分析视频帧函数
    analysis_result: function () {
      warning_dialog.warningdialogVisible = true;
    }
  }
})

// 预警模块对话框
let warning_dialog = new Vue({
  el: '#warning_dialog',
  data: {
    warningdialogVisible: false,
    /*location: "北一区5号",
    time: "Jun 13 21:24:52",
    info: "未佩戴安全帽",*/
    warning_info: {
      data: {
        camera_name: "南大街人民公园",
        time: "Jun 13 21:24:52",
        frame_url: 'img/helmet.jpeg'
      },
      analysis_result: {
        top: '',
        bottom: '',
        left: '',
        right: '',
        confidence: 0.9
      },
    }
  },
  methods: {
    invisiblewarning: function () {
      this.warningdialogVisible = false
      sim_warning.status = "已处理!"
      document.getElementById('state').style.color = 'green';
    }
  }
})

