<template>
  <div>
    <h1>当前的san值为：{{ sanity }}</h1>
    <h2>Person的总人数是：{{ perNum }}</h2>
    <button @click="addSanity">点击增加sanity</button>
  </div>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
  name: "Counter",
  data() {
    return {};
  },
  computed: {
    ...mapState(['sanity', 'perNum']),
  },
  methods: {
    ...mapMutations({ addSanity: "ADDSAN" }),
  },
};
</script>

<style scope>
</style>