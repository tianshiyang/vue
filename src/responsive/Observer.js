import { Dep } from "./Dep.js";
class Observer {
  constructor(data) {
    this.data = data;
    this.observer(data);
    this.dep = new Dep();
  }
  observer(data) {
    if (!data || typeof data !== "object") {
      // data不存在，或者data为基础数据类型
      return;
    }
    Object.keys(data).forEach((key) => {
      this.defineReactive(data, key, data[key]);
    });
  }
  defineReactive(data, key, val) {
    let self = this;
    // 递归
    this.observer(val);
    Object.defineProperty(data, key, {
      enumerable: true,
      configurable: true,
      get() {
        // Dep.target为当前Watcher的实例，它具有update，和get方法
        if (Dep.target) {
          // 将当前实例化的watcher，保存到Dep订阅者数组中
          self.dep.addSub(Dep.target);
        }
        return val;
      },
      set(newVal) {
        if (newVal === val) {
          return;
        }
        val = newVal;
        self.dep.notify();
      },
    });
  }
}
export { Observer };
