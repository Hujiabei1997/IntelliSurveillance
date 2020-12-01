/**
 * 模拟当日事件实时统计和事件预警功能
 * */
let sim_event = new Vue({
  el: '#event',
  data () {
    return {
      num: 0,
      timer: ''
    }
  },
  methods: {
    get() {
      if (warning_dialog.warning_info.analysis_result.confidence > 0.8){
        this.num = this.num + 1;
        warning_dialog.warningdialogVisible = true;
      }
    },
    eventdialogvisible: function () {
      $(document).ready(function(){
        var c=document.getElementById("myCanvas");
        //var ctx=c.getContext("2d");
        /*ctx.fillStyle="#FF0000";
        ctx.fillRect(20,200,15,75);*/
      })
      event_dialog.eventdialogvisible = true
    }
  },
  mounted() {
    this.timer = setTimeout(this.get, 1000000);
  },
  beforeDestroy() {
    clearTimeout(this.timer);
  }
})

let sim_warning = new Vue({
  el: '#warning',
  data () {
    return {
      location: "北一区5号",
      time: "Jun 13 21:24:52",
      info: "未佩戴安全帽",
      status: "未处理!"
    }
  },
  methods: {
    warningtdialogvisible: function () {
      warning_dialog.warningdialogVisible = true
    }
  }
})
