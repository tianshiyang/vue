import { Observer } from "../responsive/Observer.js";
import { Compile } from "../responsive/Compile.js";
class SelfVue {
  constructor(options) {
    // option为vue的配置项，其中包括了el，data等
    this.data = options.data;
    this.el = options.el;
    // 监听器
    new Observer(this.data).observer();
    // 解析器
    new Compile(this.el, this);// 这里的this为当前vue实例，感兴趣的可以自行打印下看看
  }
}
export { SelfVue };
