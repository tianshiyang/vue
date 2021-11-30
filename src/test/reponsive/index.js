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
let selfVue = new SelfVue({
  el: "#app",
  data: data,
});
