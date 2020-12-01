/**
 * 获取视频监控数据
 * */
let video = new Vue({
  el: '#video',
  data () {
    return {
      // 视频监控列表数据
      info_video: [],
      on_off_selected: []
    }
  },
    created() {
    // 请求视频监控列表数据
    axios
      .get(url + 'getVideoCameraSet')
      .then(function (response) {
        video.info_video = response.data;
        console.log(video.info_video);
        //video.info_storage = video.info_video;
       /*  for(var i = 0; i < video.info_storage.length; i++) {
            video_name.name_live.push("暂无选择监控");
         }*/
      })
      .catch(function (error) { // 请求失败处理
        console.log(error);
        //video.$message.error('请求视频监控列表失败！');
      });
  },
  methods:{
    // 监听用户选择开启的
    video_change: function () {
      //console.log(this.on_off_selected);
     for (var i = 0; i < this.on_off_selected.length; i++){
       video_name.name_live.splice(i, 1, this.info_video[this.on_off_selected[i]])
     }
      video_name.name_live.splice(this.on_off_selected.length,　1000,)
      menu.menu_view_video = video_name.name_live
      //console.log(video_name.name_live);
      //console.log(video.info_video);
      //console.log(video.info_storage);
    },

  }
})
