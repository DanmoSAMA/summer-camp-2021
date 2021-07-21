<template>
  <div id="wrapper">
    <h1 id="title">todos</h1>
    <div id="todoapp">
      <TodoHeader :todos="todos" :undoneNum="undoneNum" />
      <List :todos="todos" :undoneNum="undoneNum" :footerState="footerState" />
    </div>
  </div>
</template>

<script>
import TodoHeader from "./components/TodoHeader";
import List from "./components/List";
import axios from "axios";

export default {
  name: "App",
  components: { TodoHeader, List },
  data() {
    return {
      todos: [],
      footerState: "All", // 'All', 'Active', 'Completed'
    };
  },
  computed: {
    undoneNum() {
      let undoneNum = 0;
      this.todos.forEach((item) => {
        if (!item.done) undoneNum++;
      });
      return undoneNum;
    },
  },
  mounted() {
    axios({
      url: "http://127.0.0.1:3000/get",
      method: "get",
    })
      .then((res) => {
        console.log(res.data);
        this.todos = res.data;
      })
      .catch((err) => {
        console.error(err);
      });

    this.$bus.$on("addTodo", (data) => {
      if (data.title === "") return;
      this.todos.unshift(data);
      // 改变todos时发送ajax
      axios({
        url: "http://127.0.0.1:3000/update",
        method: "post",
        data: {
          todos: this.todos,
        },
      });
    });
    this.$bus.$on("handleCheck", (data) => {
      this.todos.forEach((todo) => {
        if (todo.id === data) {
          todo.done = !todo.done;
        }
      });
      // 改变todos时发送ajax
      axios({
        url: "http://127.0.0.1:3000/update",
        method: "post",
        data: {
          todos: this.todos,
        },
      });
    });
    this.$bus.$on("handleDelete", (data) => {
      this.todos.forEach((todo) => {
        if (todo.id === data) {
          this.todos = this.todos.filter((todo) => todo.id !== data);
        }
      });
      // 改变todos时发送ajax
      axios({
        url: "http://127.0.0.1:3000/update",
        method: "post",
        data: {
          todos: this.todos,
        },
      });
    });
    this.$bus.$on("selectAll", () => {
      let doneNum = 0;
      this.todos.forEach((todo) => {
        if (todo.done) doneNum++;
      });
      if (doneNum !== this.todos.length) {
        this.todos.forEach((todo) => {
          todo.done = true;
        });
      } else {
        this.todos.forEach((todo) => {
          todo.done = false;
        });
      }
      // 改变todos时发送ajax
      axios({
        url: "http://127.0.0.1:3000/update",
        method: "post",
        data: {
          todos: this.todos,
        },
      });
    });
    this.$bus.$on("setState", (state) => {
      this.footerState = state;
    });
    this.$bus.$on("clearDone", () => {
      let leftTodos = new Array();
      this.todos.forEach((item) => {
        if (!item.done) {
          leftTodos.push(item);
        }
      });
      this.todos = leftTodos;
      // 改变todos时发送ajax
      axios({
        url: "http://127.0.0.1:3000/update",
        method: "post",
        data: {
          todos: this.todos,
        },
      });
    });
  },
};
</script>

<style lang="less">
body {
  margin: 0;
  padding: 0;
  background-color: #f5f5f5;
  font-weight: 100;

  li {
    list-style-type: none;
  }

  ul {
    padding: 0;
  }

  a {
    color: #000;
    text-decoration: none;
  }

  input {
    outline: none;
    border: none;
  }

  ::-webkit-input-placeholder {
    /* WebKit browsers */
    color: #e6e6e6;
    font-size: 24px;
    font-style: italic;
  }

  ::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: #e6e6e6;
    font-size: 24px;
    font-style: italic;
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10+ */
    color: #e6e6e6;
    font-size: 24px;
    font-style: italic;
  }
}

#wrapper {
  width: 550px;
  margin: 0 auto;
  padding-bottom: 100px;

  #title {
    color: #e8d7d7;
    font-size: 105px;
    font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
    margin: 0;
    font-weight: 100;
    text-align: center;
  }

  #todoapp {
    background-color: #fff;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.2);

    #main {
      margin: 0;
    }
  }
}
</style>