<template>
  <div id="wrapper">
    <h1 id="title">todos</h1>
    <div id="todoapp">
      <TodoHeader />
      <List />
    </div>
  </div>
</template>

<script>
import TodoHeader from "./components/TodoHeader";
import List from "./components/List";

export default {
  name: "App",
  components: { TodoHeader, List },
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