/**
 * 侧边栏菜单数据集
 * */
let menu = new Vue({
  el: '#menu',
  data () {
    return {
      // 视点集和视频列表数据
      menu_view_video: [],
      //view_video_selected: '',
    }
  },
  methods: {
    video_analysis_switch: function () {
      axios
        .get('http://172.21.213.208:8080//getAnalysisTask')
        .then(function (response) {
          video_analysis.analysis_content = response.data.data
          video_analysis.video_analysis_dialog = true
          console.log(video_analysis.analysis_content)
        })
        .catch(function (error) { // 请求失败处理
          console.log(error);
          //video.$message.error('请求视频监控列表失败！');
        });
    },
  }
})
