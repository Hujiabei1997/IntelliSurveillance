/**
 * 视频数据和视点集数据
 * 下拉框数据集
 * */
let view_video = new Vue({
  el: '#view_video',
  data () {
    return {
      // 视点集和视频列表数据
      info_view_video: [],
      view_video_selected: ''
    }
  },
  /*created() {
    view_video.info_view_video = video.info_video.concat(view.info_view)
    console.log(view_video.info_view_video)
  },*/
  methods: {
    find_dialog_visible(value){
      if (value === 11){
        color = "red"
        // 先移除再添加
        map.removeOverlay(rectangle1)
        rectangle1 = Sector1(point1,15,30,60,"blue",0,color,0.5)
        map.addOverlay(rectangle1);
        map.centerAndZoom(point1, 25);
      }
      if(value === 0){
        color1 = "red"
        color2 = "black"
        // 将上一个点移除，后面可借助中间变量实现记录上次操作的点
        map.removeOverlay(rectangle1)
        rectangle1 = Sector1(point1,15,30,60,"blue",0,color2,0.5)
        map.addOverlay(rectangle1);

        map.removeOverlay(rectangle2)
        rectangle2 = Sector1(point2,15,90,120,"blue",0,color1,0.5)
        map.addOverlay(rectangle2);
        map.centerAndZoom(point2, 25);
      }
    }
  }
})

/**
 * 侧边栏菜单数据集
 * */
let menu = new Vue({
  el: '#menu',
  data () {
    return {
      // 视点集和视频列表数据
      menu_view_video: [],
      //view_video_selected: ''
      value:[]
    }
  },
  methods: {
    info_dialog_visible: function () {
      dialog_info.dialoginfoVisible = true
    },
    control: function(value) {
      if(value === 11){
        color = "red"
        // 先移除再添加
        map.removeOverlay(rectangle1)
        rectangle1 = Sector1(point1,15,30,60,"blue",0,color,0.5)
        map.addOverlay(rectangle1);
        map.centerAndZoom(point1, 25);
      }
      if(value === 0){
        color1 = "red"
        color2 = "black"
        // 将上一个点移除，后面可借助中间变量实现记录上次操作的点
        map.removeOverlay(rectangle1)
        rectangle1 = Sector1(point1,15,30,60,"blue",0,color2,0.5)
        map.addOverlay(rectangle1);

        map.removeOverlay(rectangle2)
        rectangle2 = Sector1(point2,15,90,120,"blue",0,color1,0.5)
        map.addOverlay(rectangle2);
        map.centerAndZoom(point2, 25);
      }
    }
  }
})

/**
 * 获取视点集数据
 * */
let view = new Vue({
  el: '#view',
  data () {
    return {
      // 视点集列表数据
      info_view: [],
    }
  },
  async created() {
    // 请求视点集列表数据
    await axios
      .get(url + 'getAllViewpointNames')
      .then(function (response) {
        view.info_view = response.data;
        console.log(view.info_view);
      })
      .catch(function (error) { // 请求失败处理
        console.log(error);
        // view.$message.error('请求视点集列表失败！');
      });
  }
})

/**
 * 获取视频监控数据
 * */
let camera = new Vue({
  el: '#camera',
  data () {
    return {
      // 视频监控列表数据
      info: [],
      info_name:[]
    }
  },
 async created() {
    // 请求视频监控数据
    await axios
      .get(url + 'getCameraInfo')
      .then(function (response) {
        camera.info = response.data.data;
        /*video.info_video = video.info_video.concat(view.info_view)*/
        camera.info_name = camera.info.name
        console.log(camera.info_name);
        // 合并视点数据和监控数据
        view_video.info_view_video = camera.info_name.concat(view.info_view)
        menu.menu_view_video = view_video.info_view_video
        console.log(view_video.info_view_video)
        console.log(menu.menu_view_video)
      })
      .catch(function (error) { // 请求失败处理
        console.log(error);
        //video.$message.error('请求视频监控列表失败！');
      });
  }
})










