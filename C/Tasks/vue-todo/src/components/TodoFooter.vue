<template>
  <li id="footer">
    <ul>
      <a href="javascript:;" id="stati"> {{ undoneNum }} item left </a>
      <a
        href="javascript:;"
        class="btn"
        id="show-all-btn"
        @click="setState('All')"
        :class="{selected: footerState === 'All'}"
      >
        All
      </a>
      <a
        href="javascript:;"
        class="btn"
        id="show-active-btn"
        @click="setState('Active')"
        :class="{selected: footerState === 'Active'}"
      >
        Active
      </a>
      <a
        href="javascript:;"
        class="btn"
        id="show-completed-btn"
        @click="setState('Completed')"
        :class="{selected: footerState === 'Completed'}"
      >
        Completed
      </a>
      <a href="javascript:;" id="clear" v-show="doneNum > 0" @click="clearDone"> Clear completed </a>
    </ul>
  </li>
</template>

<script>
export default {
  name: "TodoFooter",
  props: ["todos", "undoneNum", "footerState"],
  computed: {
    doneNum() {
      return this.todos.length - this.undoneNum;
    }
  },
  methods: {
    setState(state) {
      this.$bus.$emit("setState", state);
    },
    clearDone() {
      this.$bus.$emit("clearDone");
    }
  },
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