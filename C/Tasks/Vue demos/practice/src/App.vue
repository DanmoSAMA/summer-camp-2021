<template>
  <div>
    <Person />
    <hr />
    <Counter />
  </div>
</template>

<script>
import Person from "./components/Person";
import Counter from "./components/Counter";

export default {
  name: "App",
  components: { Person, Counter },
};
</script>

<style>
</style>