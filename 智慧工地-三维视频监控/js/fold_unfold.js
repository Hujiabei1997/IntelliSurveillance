/**
 * 控制侧边栏展开与关闭
 * */
let fold_div = new Vue({
  el: '#fold_div',
  data () {
    return {
    }
  },
  methods: {
    foldaside: function () {
      var aside = document.getElementById("aside");
      var aside2= document.getElementById("aside2");
      var fold = document.getElementById("fold");
      var unfold = document.getElementById("unfold");
      aside.style.display = "none";
      aside2.style.display = "none";
      fold.style.display = "none";
      unfold.style.display = "inline";
    }
  }
})


let unfold_div = new Vue({
  el: '#unfold_div',
  data () {
    return {
    }
  },
  methods: {
    unfoldaside: function () {
      var aside = document.getElementById("aside");
      var aside2= document.getElementById("aside2");
      var fold = document.getElementById("fold");
      var unfold = document.getElementById("unfold");
      aside.style.display = "inline";
      aside2.style.display = "inline";
      fold.style.display = "inline";
      unfold.style.display = "none";
    }
  }
})
