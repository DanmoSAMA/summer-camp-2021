import './style/index.less';
import Vue from 'vue'; // 还不懂模块，先将就着用

let app = new Vue({
  el: "#todoapp",
  data: {
    todo: '',
    todoArr: [],
    todoNum: 0
  },
  methods: {
    insert: function () {
      this.todoArr.unshift(this.todo);
      this.todo = ''; // 清空input
      this.todoNum++;
    },
    delete: function () {
      this.todoArr.splice(0, 1);
    }
  }
})