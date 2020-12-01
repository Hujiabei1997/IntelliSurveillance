/**
 * 获取视频直播流url
 * 通过url获取服务器端直播流数据
 * */

/**
 * 获取直播流url
 * */
let video_live_url = new Vue({
  el: '#video_live_url',
  data () {
    return {
      // 直播流url数据
      info_live: ["http://223.2.45.73/live_hls/video.m3u8",
                  "http://223.2.45.73/live_hls/video.m3u8",
                  "http://223.2.45.73/live_hls/video.m3u8",
                  "http://223.2.45.73/live_hls/video.m3u8",
                  "http://223.2.45.73/live_hls/video.m3u8",
                  "http://223.2.45.73/live_hls/video.m3u8"],
      //直播流url索引
      i1: 0,
      i2: 1,
      i3: 2,
    }
  },
  created() {
    // 请求直播流url数据
    axios
      .get('http://223.2.41.241:8080/getAllVideoCameraUrls')
      .then(function (response) {
        video_live_url.info_live = response.data;
        console.log(video_live_url.info_live);
      })
      .catch(function (error) { // 请求失败处理
        console.log(error);
        //live.$message.error('请求直播流资源失败!');
      });
  }
})

/**
 * 通过url获取直播流
 * */
let video_live = new Vue({
  el: '#video_live',
  data: {
    // web页面展示直播流url
      videoSrc1: video_live_url.info_live[video_live_url.i1],
      videoSrc2: video_live_url.info_live[video_live_url.i2],
      videoSrc3: video_live_url.info_live[video_live_url.i3],
      video1:{},
      video2:{},
      video3:{}
  },
  mounted() {
    this.video1 = document.getElementById('video1');
    this.video2 = document.getElementById('video2');
    this.video3 = document.getElementById('video3');
    // hls控制直播流播放
    if (Hls.isSupported()) {
      var hls = new Hls();
      hls.loadSource(this.videoSrc1);
      hls.loadSource(this.videoSrc2);
      hls.loadSource(this.videoSrc3);
      hls.attachMedia(this.video1);
      hls.attachMedia(this.video2);
      hls.attachMedia(this.video3);
      hls.on(Hls.Events.MANIFEST_PARSED, function() {
        this.video1.play();
        this.video2.play();
        this.video3.play();
      });
    }
    else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = videoSrc;
      video.addEventListener('loadedmetadata', function() {
        this.video1.play();
        this.video2.play();
        this.video3.play();
      });
    }
  },
  methods: {
    // 实现视频标签向左循环
    switch_video_left: function () {
      // 直播流url数组对应下标自减
      video_live_url.i1 = video_live_url.i1 - 3
      video_live_url.i2 = video_live_url.i2 - 3
      video_live_url.i3 = video_live_url.i3 - 3
      video_name.name_i1 = video_name.name_i1 -3
      video_name.name_i2 = video_name.name_i2 -3
      video_name.name_i3 = video_name.name_i3 -3
      // 判断当下标小于0时重新开始从右往左显示数据
      if(video_live_url.i1 < 0 || video_live_url.i2 < 0 || video_live_url.i3 < 0) {
        /*video_live_url.i3 = video_live_url.info_live.length - 1
        video_live_url.i2 = video_live_url.info_live.length - 2
        video_live_url.i1 = video_live_url.info_live.length - 3
        video_name.name_i1 = video_live_url.info_live.length - 3
        video_name.name_i2 = video_live_url.info_live.length - 2
        video_name.name_i3 = video_live_url.info_live.length - 1*/
        if(video_name.name_live.length === 2){
          video_name.name_i2 = video_name.name_live.length - 1
          video_name.name_i1 = video_name.name_live.length - 2
          video_name.name_i3 = 2
        }
        else if (video_name.name_live.length === 1){
          video_name.name_i1 = video_name.name_live.length - 1
          video_name.name_i2 = 1
          video_name.name_i3 = 2
        }
        else {
          /*video_live_url.i3 = video_name.name_live.length - 1
          video_live_url.i2 = video_name.name_live.length - 2
          video_live_url.i1 = video_name.name_live.length - 3*/
          video_name.name_i1 = 0;
          video_name.name_i2 = 1;
          video_name.name_i3 = 2;
          video_name.name_i1 = video_name.name_live.length - 3
          video_name.name_i2 = video_name.name_live.length - 2
          video_name.name_i3 = video_name.name_live.length - 1
        }
      }
      console.log(video_name.name_i1)
      console.log(video_name.name_i2)
      console.log(video_name.name_i3)
      /*console.log(video_live_url.i1)
      console.log(video_live_url.i2)
      console.log(video_live_url.i3)*/
    },
    // 实现视频标签向右循环
    switch_video_right: function () {
      // 直播流url数组取模自加
      if (video_name.name_live.length === 2) {
        //video_live_url.i1 = (video_live_url.i1 + 3) % video_live_url.info_live.length
        //video_live_url.i2 = (video_live_url.i2 + 3) % video_live_url.info_live.length
        //video_live_url.i3 = (video_live_url.i3 + 3) % video_live_url.info_live.length
        video_name.name_i1 = (video_name.name_i1 + 2) % video_name.name_live.length
        video_name.name_i2 = (video_name.name_i2 + 2) % video_name.name_live.length
        video_name.name_i3 = 2
      }
      else if(video_name.name_live.length === 1) {
        video_name.name_i1 = (video_name.name_i1 + 1) % video_name.name_live.length
        video_name.name_i2 = 1
        video_name.name_i3 = 2
      }
      else {
        video_name.name_i1 = 0;
        video_name.name_i2 = 1;
        video_name.name_i3 = 2;
        video_name.name_i1 = (video_name.name_i1 + 3) % video_name.name_live.length
        video_name.name_i2 = (video_name.name_i2 + 3) % video_name.name_live.length
        video_name.name_i3 = (video_name.name_i3 + 3) % video_name.name_live.length
      }
      /*console.log(video_live_url.info_live[video_live_url.i1])
      console.log(video_live_url.info_live[video_live_url.i2])
      console.log(video_live_url.info_live[video_live_url.i3])*/
    }
  }
})

/**
 * 根据显示视频进行视频名称标注
 * */
let video_name = new Vue({
  el: '#video_name',
  data () {
    return {
      // 直播流名称
      name_live: [],
      name_i1: 0,
      name_i2: 1,
      name_i3: 2
    }
  }
})
