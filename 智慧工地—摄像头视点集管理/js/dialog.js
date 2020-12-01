
/**
 * 显示信息对话框
 * */
var dialog_info = new Vue({
  el: '#dialog_info',
  data: {
    dialoginfoVisible: false,
    formLabelWidth: '80px',
    value:true,
    form: {
      // 相机名
      name: '北广场东高杆灯85号',
      // 分辨率
      image_width: 800,
      image_height: 600,
      // 焦距
      f: 200,
      // 方位角
      azimuth: 30
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
});

/**
 * 显示视频对话框
 * */
var dialog_video = new Vue({
  el: '#dialog_video',
  data: {
    name:"北一区视点1",
    location:"北一区升旗台左侧",
    dialogvideoVisible: false,
  },
  methods: {
  }
});
