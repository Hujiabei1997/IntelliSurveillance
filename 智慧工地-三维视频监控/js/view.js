/**
 * 获取视点集数据
 * */
let view = new Vue({
  el: '#view',
  data () {
    return {
      // 视点集列表数据
      info_view: [],
      view_selected: ''
    }
  },
  created() {
    // 请求视点集列表数据
    axios
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
