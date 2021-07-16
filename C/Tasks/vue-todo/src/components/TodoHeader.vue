<template>
  <div id="header">
    <span id="arrow" :class="{selected: this.isAll}">∨</span>
    <input
      type="text"
      placeholder="What needs to be done?"
      id="input"
      minlength="1"
      maxlength="300"
      @keyup.enter="add"
    />
  </div>
</template>

<script>
import {nanoid} from 'nanoid'

export default {
  name: "TodoHeader",
  data(){
    return {
      isAll: false
    }
  },
  methods: {
    add(event) {
      const todo = {id: nanoid(), title: event.target.value, done: false};
      this.$bus.$emit('receive',todo);
      event.target.value = "";
    }
  }
};
</script>

<style lang="less" scope>
#header {
  input {
    padding: 16px;
    font-size: 24px;
    min-width: 476px;
    height: 33.6px;
    line-height: 33.6px;
  }

  #arrow {
    font-size: 27px;
    color: #e6e6e6;
    padding-left: 16px;
    font-weight: bold;
    transition: color 0.1s;

    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }

  #arrow.selected {
    color: #737373;
  }
}
</style>