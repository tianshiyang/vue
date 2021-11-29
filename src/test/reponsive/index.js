import { SelfVue } from "../../responsive/SelfVue.js";
let data = {
  name: "张三",
  age: 22,
  children: [
    {
      childName: "王五",
      age: "1",
    },
    {
      childName: "赵六",
      age: "2",
    },
  ],
  hobby: {
    hobbyName: "play basketball",
    hasUtil: "basketball",
  },
};
let ele = document.querySelector("#app");
let selfVue = new SelfVue(data, ele, "name");
data.name = "lisi";
setTimeout(() => {
  data.name = "hahaha";
}, 2000);
