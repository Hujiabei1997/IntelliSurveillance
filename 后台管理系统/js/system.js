let container = new Vue({
    el: '#container1',
    data() {
      return {
        location: "北一区5号",
        time: "Jun 13 21:24:52",
        info: "未佩戴安全帽",
        status: "未处理!",
        eventdialogvisible: false,
        warningdialogVisible: false,
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
        },
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
        }],
        viewData: [{
          location: '信息',
          time: '信息',
          info: '信息',
          status: '信息'
        }, {
          location: '信息',
          time: '信息',
          info: '信息',
          status: '信息'
        }, {
          location: '信息',
          time: '信息',
          info: '信息',
          status: '信息'
        }, {
          location: '信息',
          time: '信息',
          info: '信息',
          status: '信息'
        }],
        // 控制添加视点表单出现与隐藏
        dialogFormVisible:false,
        // 表单数据
        form: {
          location: '',
          time: '',
          info: '',
          status: ''
        },
        // 图片索引
        url: 'img/helmet.jpeg',
        srcList: ['img/helmet.jpeg']
      }
    },

    created() {

    },
    methods: {
      // 单个删除事件函数
      delete_event: function () {
        this.$confirm('此操作将删除预警事件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.gridData.splice(3,1);
        }).catch(() => {});
      },
      // 批量删除函数-1个月
      delete_one: function () {
        this.$confirm('此操作将删除一个月内预警事件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.gridData.splice(0,100);
        }).catch(() => {});
      },
      // 添加视点表单出现
      view_add_visible: function () {
        this.dialogFormVisible = true;
      },
      // 添加视点信息
      view_add: function () {
        console.log(this.form);
        this.viewData.push(this.form);
        this.dialogFormVisible = false;
      },
      // 删除视点
      delete_view: function () {
        this.$confirm('此操作将删除该视点, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.viewData.splice(3,1);
        }).catch(() => {});
      }
    }
  }
)
