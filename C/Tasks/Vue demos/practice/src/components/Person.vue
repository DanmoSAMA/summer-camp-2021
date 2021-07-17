<template>
  <div>
    <p>输入姓名、职业、年龄：</p>
    <input type="text" v-model="name" />
    <input type="text" v-model="job" />
    <input type="text" v-model="age" />
    <button @click="addPerson">确定</button>
    <br /><br />
    <ul>
      <li v-for="item in personInfo" :key="item.id">
        姓名：{{ item.name }}，职业：{{ item.job }}，年龄：{{ item.age }}
      </li>
    </ul>
    <h2>san值加100等于：{{ sanity + 100 }}</h2>
  </div>
</template>

<script>
import { nanoid } from "nanoid";
import { mapState } from "vuex";
export default {
  name: "Person",
  data() {
    return {
      personInfo: [
        {
          id: nanoid(),
          name: "神乃木庄龙",
          job: "律师、检察官",
          age: 36,
        },
        {
          id: nanoid(),
          name: "成步堂龙一",
          job: "律师",
          age: 28,
        },
        {
          id: nanoid(),
          name: "御剑怜恃",
          job: "检察官",
          age: 28,
        },
        {
          id: nanoid(),
          name: "绫里真宵",
          job: "灵媒师",
          age: 23,
        },
      ],
      name: "",
      job: "",
      age: "",
    };
  },
  computed: {
    ...mapState(['sanity', 'perNum']),
  },
  methods: {
    addPerson() {
      let personObj = {
        id: nanoid(),
        name: this.name,
        job: this.job,
        age: this.age,
      };
      this.personInfo.push(personObj);
      this.$store.commit('ADDPER');
    },
  },
};
</script>

<style scope>
input {
  width: 80px;
  height: 20px;
  line-height: 20px;
  margin-right: 10px;
}
</style>