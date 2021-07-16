<template>
  <li id="footer">
    <ul>
      <a href="javascript:;" id="stati"> {{ doneTotal }} item left </a>
      <a href="javascript:;" class="btn selected" id="show-all-btn"> All </a>
      <a href="javascript:;" class="btn" id="show-active-btn"> Active </a>
      <a href="javascript:;" class="btn" id="show-completed-btn"> Completed </a>
      <a href="javascript:;" id="clear"> Clear completed </a>
    </ul>
  </li>
</template>

<script>
export default {
  name: "TodoFooter",
  props: ["todos"],
  computed: {
    doneTotal() {
      // return this.todos.filter(todo => !todo.done).length;
      return this.todos.reduce((pre, current) => pre + (!current.done ? 1 : 0), 0); // 第二个参数是统计的初始值
    },
    isAll() {
      return this.todos.length === this.doneTotal;
    }
  }
};
</script>

<style lang="less" scope>
#footer {
  border-top: 1px solid #ededed;
  height: 40px;
  line-height: 40px;
  padding: 0 20px;

  ul {
    a {
      display: inline-block;
      font: 16px "Helvetica Neue", Helvetica, Arial, sans-serif;
      color: #777;
    }

    a:first-child {
      cursor: default;
      margin-right: 60px;
    }

    a.btn {
      margin-right: 10px;
      padding: 3px 8px;
    }

    a.selected {
      outline: 1px solid #ecd5d5;
    }

    a#clear {
      margin-right: 0;
      margin-left: 22px;
      display: none;
    }

    a#clear.appear {
      display: inline-block;
    }

    a#clear:hover {
      text-decoration: underline;
    }
  }
}
</style>