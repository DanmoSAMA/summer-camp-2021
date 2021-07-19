<template>
  <ul id="main">
    <Item
      v-for="item in todos"
      :key="item.id"
      :todo="item"
      v-show="
        footerState === 'All' ||
        (footerState === 'Active' && !item.done) ||
        (footerState === 'Completed' && item.done)
      "
    />
    <TodoFooter
      :todos="todos"
      :undoneNum="undoneNum"
      :footerState="footerState"
    />
  </ul>
</template>

<script>
import Item from "./Item.vue";
import TodoFooter from "./TodoFooter.vue";

export default {
  name: "List",
  components: { Item, TodoFooter },
  props: ["todos", "undoneNum", "footerState"],
};
</script>

<style lang="less" scope>
#main {
  margin: 0;
}
</style>