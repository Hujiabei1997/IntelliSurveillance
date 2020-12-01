
let container = new Vue({
  el: '#container',
  data () {
    return {
      // 视频监控列表数据
      info_video: [],
      video_selected: '',
      // 直播流url数据
      url_live: ["1http://223.2.45.73/live_hls/video.m3u8",
        "2http://223.2.45.73/live_hls/video.m3u8",
        "3http://223.2.45.73/live_hls/video.m3u8",
        "4http://223.2.45.73/live_hls/video.m3u8",
        "5http://223.2.45.73/live_hls/video.m3u8",
        "6http://223.2.45.73/live_hls/video.m3u8",
        "7http://223.2.45.73/live_hls/video.m3u8",
        "8http://223.2.45.73/live_hls/video.m3u8",
        "9http://223.2.45.73/live_hls/video.m3u8",
        "10http://223.2.45.73/live_hls/video.m3u8",
        "11http://223.2.45.73/live_hls/video.m3u8"],
      // 当前选择的直播流url
      url_choose:[],
      // 当前页面展示的直播流url
      url_current:[],
      // 控制开关值
      value: [],
      // 当前开启视频的总数
      count: 0,
      // 控制每页显示条数
      size: 4,
      // 当前展示的页码
      currentPage: 1,
      // 定义一个图用于保存关闭视频时记录对应视频的下标
      map: new Map(),
      // 2 * 2 和 3 * 3布局下的video长宽不同
      wi: false,
      he: false,
      // 动态改变video所占百分比,因为每个video需要独立，所以以数组的形式独立设置
      percent_wi: [],
      percent_he: [],
      // 用于判断此时视频的尺寸是大还是小 大为true 小为false
      video_size: true,
      // 控制视频选中的中间变量
      video_choose_num: 999,
      // 控制视频分析窗口
      video_analysis_dialog: false,
      analysis_content: ['test','helmet'],
      analysis_on: []
    }
  },
  created() {
    // 请求视频监控数据
    axios
      .get(url + 'getCameraInfo')
      .then(function (response) {
        // 获取摄像头名称信息
        container.info_video = response.data.data.name;
        // 获取直播流url
        /*container.url_live = response.data.data.name
        console.log("container.url_live")*/
        // 将每一个摄像头的初始开关值都设置为false
        for (var i=0;i<container.info_video.length;i++) {
          container.value[i] = false;
          container.percent_wi.push('45%');
          container.percent_he.push('44%');
        }
      })
      .catch(function (error) { // 请求失败处理
        console.log(error);
        //video.$message.error('请求视频监控列表失败！');
      });
  },
  methods: {
    // 每页显示9个视频
    small: function () {
      this.size = 9;
      this.video_size = false;
      this.percent_wi.splice(0,100);
      this.percent_he.splice(0,100);
      for (var i=0;i<container.info_video.length;i++) {
        this.percent_wi.push('30.5%');
        this.percent_he.push('29%');
      }
      // 改变页面布局时动态调整url_current
      this.change_size();
      // 通过改变icon图标颜色，标识提示用户当前选择的布局结构为2*2还是3*3
      var small_button = document.getElementById("small");
      small_button.style.color = "green";
      var big_button = document.getElementById("big");
      big_button.style.color = "whitesmoke";
    },
    // 每页显示4个视频
    big: function () {
      this.size = 4;
      this.video_size = true;
      this.percent_wi.splice(0,100);
      this.percent_he.splice(0,100);
      for (var i=0;i<container.info_video.length;i++) {
        this.percent_wi.push('45%');
        this.percent_he.push('44%');
      }
      // 改变页面布局时动态调整url_current
      this.handleCurrentChange();
      var big_button = document.getElementById("big");
      big_button.style.color = "green";
      var small_button = document.getElementById("small");
      small_button.style.color = "whitesmoke";
    },
    // 改变开关状态时判断此时用户开启的开关数量
    count_change: function (i) {
      if(this.value[i] === true){
        this.count++;
        // 增加视频时的控制数组
        this.url_choose.push(this.url_live[i]);
        // 减少视频时为寻找对应下标创建的map
        this.map.set(i, this.url_live[i])
        // 改变当前显示的url_current
        this.handleCurrentChange();
        // 当选中url数目增加使得新增页时跳转到那一页
        if (this.count % this.size === 1 && this.count !== 1) {
          this.currentPage++;
          this.handleCurrentChange();
        }
        console.log(this.map);
        console.log(this.url_choose);
      }
      else{
        this.count--;
        // map删除下标为i的<key, value>，并遍历map更新url_choose数组,d为遍历时map的每一个value
        this.map.delete(i);
        // 先清除再push
        this.url_choose.splice(0,100)
        this.map.forEach(d=>{
          this.url_choose.push(d)
        });
        this.handleCurrentChange();
        if (this.count % this.size === 0 && this.count !== 0) {
          this.currentPage--;
          this.handleCurrentChange();
        };
        console.log(this.url_current);
        console.log(this.url_choose);
      }
    },
    // 页数改变、增加或减少视频数量和页面布局 由小到大时 根据当前开启视频总数、当前每页展示视频数和当前页数重新计算url_current
    handleCurrentChange: function () {
      this.url_current.splice(0,100)
      var j = 0;
      // 设置一个常量c作为当前展示视频url数组的上界
      var c;
      if (this.currentPage * this.size < this.count){
        c = this.currentPage * this.size
      }
      else {
        c = this.count
      }
      for (var k = (this.currentPage-1) * this.size; k < c; k++){
        this.url_current[j] = this.url_choose[k];
        j++;
      }
    },
    // 改变布局结构大小 由大到小时 url_current改变
    change_size: function () {
      var j = 0;
      // 设置一个常量c作为当前展示视频url数组的上界
      var c;
      if (this.currentPage * this.size < this.count){
        c = this.currentPage * this.size
      }
      else {
        c = this.count
      }
      // 根据当前不同的视频数量选择调整布局后的布局
      if (this.count > 9){
        console.log(this.count)
        console.log(this.currentPage)
        console.log((this.currentPage-1) * this.size)
        // 先清除url_current
        this.url_current.splice(0,100);
        // 解决第一次切换小布局和后面切换小布局之间的差异
        if ((this.currentPage-1) * this.size < this.count){
          for (var k = (this.currentPage-1) * this.size; k < c; k++){
            this.url_current[j] = this.url_choose[k];
            j++;
          }
        }
        else {
          for (var k = (this.currentPage-2) * this.size; k < c; k++){
            this.url_current[j] = this.url_choose[k];
            j++;
          }
        }
      }
      else {
        this.url_current.splice(0,100);
        for (var k = 0; k < c; k++){
          this.url_current[j] = this.url_choose[k];
          j++;
        }
      }
      //console.log(this.url_current)
    },
    // 控制video的hover效果
    mouse_over: function (i, j) {
      if (this.video_size === true) {
        this.percent_wi.splice(i, 1, '46%');
        this.percent_he.splice(i, 1, '45%');
      } else {
        this.percent_wi.splice(i, 1, '31.5%');
        this.percent_he.splice(i, 1, '30%');
      }
    },
    mouse_out: function (i) {
      if (this.video_size === true){
        this.percent_wi.splice(i, 1, '45%');
        this.percent_he.splice(i, 1, '44%');
      }
      else{
        this.percent_wi.splice(i, 1, '30.5%');
        this.percent_he.splice(i, 1, '29%');
      }
    },
    // 点击左边侧边栏实现对应视频标签的突出显示,并消除上一次选择的结果
    video_choose: function (i) {
      console.log(i);
      console.log(this.video_choose_num )
      if (this.video_size === true){
        this.currentPage = Math.floor(i / 4) + 1;
      }
      else {
        this.currentPage = Math.floor(i / 9) + 1;
      }
      // 重新计算url_current
      this.handleCurrentChange();
      console.log(this.currentPage);
      if (this.currentPage > 1 && this.video_size === true){
        i = i % 4;
        if (this.video_choose_num % 3 !== 0){
          this.video_choose_num = this.video_choose_num % 4;
        }
      }
      if (this.currentPage > 1 && this.video_size === false){
        i = i % 9;
        if (this.video_choose_num % 8 !== 0){
          this.video_choose_num = this.video_choose_num % 9;
        }
        this.currentPage = i / 9 + 1;
      }
      if (this.video_size === true) {
        this.percent_wi.splice(this.video_choose_num, 1, '45%');
        this.percent_he.splice(this.video_choose_num, 1, '44%');
      } else {
        this.percent_wi.splice(this.video_choose_num, 1, '30.5%');
        this.percent_he.splice(this.video_choose_num, 1, '29%');
      }
      if (this.video_size === true) {
        this.percent_wi.splice(i, 1, '46%');
        this.percent_he.splice(i, 1, '45%');
      } else {
        this.percent_wi.splice(i, 1, '31.5%');
        this.percent_he.splice(i, 1, '30%');
      }
      this.video_choose_num = i;
    },
    commit_analysis: function () {
      this.video_analysis_dialog = false
      // 发起post请求功能待完成
      console.log(this.analysis_on)
    },
    cancel_analysis: function () {
      this.analysis_on.splice(0,100)
      this.video_analysis_dialog = false
    },
    video_analysis_switch: function () {
      this.video_analysis_dialog = true;
      /*axios
        .get('http://172.21.213.208:8080//getAnalysisTask')
        .then(function (response) {
          video_analysis.analysis_content = response.data.data
          video_analysis.video_analysis_dialog = true
          console.log(video_analysis.analysis_content)
        })
        .catch(function (error) { // 请求失败处理
          console.log(error);
          //video.$message.error('请求视频监控列表失败！');
        });*/
    }
  }
})
