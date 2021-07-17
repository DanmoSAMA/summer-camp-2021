<template>
  <ul id="main">
    <Item v-for="todo in todos" :key="todo.id" :todo="todo" />
    <TodoFooter :todos="todos" />
  </ul>
</template>

<script>
import Item from "./Item.vue";
import TodoFooter from "./TodoFooter.vue";
import { nanoid } from "nanoid";

export default {
  name: "List",
  components: { Item, TodoFooter },
  data() {
    return {
      todos: [
        { id: nanoid(), title: "写代码", done: false },
        { id: nanoid(), title: "吃饭", done: false },
        { id: nanoid(), title: "睡觉", done: true },
      ],
    };
  },
  mounted() {
    this.$bus.$on("receive", (data) => {
      // console.log("我是List组件，收到了数据", data);
      if (data.title === "") return;
      this.todos.unshift(data);
    });
    this.$bus.$on("handleCheck", (data) => {
      this.todos.forEach((todo) => {
        if (todo.id === data) {
          todo.done = !todo.done;
          // console.log("done值取反了");
        }
      });
    });
    this.$bus.$on("handleDelete", (data) => {
      this.todos.forEach((todo) => {
        if (todo.id === data) {
          // console.log("item即将被删除");
          this.todos = this.todos.filter((todo) => todo.id !== data);
        }
      });
    });
  },
  beforeDestroy() {
    this.$bus.$off("receive");
  },
};
</script>

<style lang="less" scope>
#main {
  margin: 0;
}
</style>