/**
 * 视频分析功能
 * */
let video_analysis = new Vue({
  el: '#video_analysis',
  data () {
    return {
      // 控制视频分析窗口
      video_analysis_dialog: true,
      analysis_content: [],
      analysis_on: []
    }
  },
  methods: {
      commit_analysis: function () {
        this.video_analysis_dialog = false
        // 发起post请求功能待完成
        console.log(this.analysis_on)
      },
      cancel_analysis: function () {
        this.analysis_on.splice(0,100)
        this.video_analysis_dialog = false
      }
  }
})
