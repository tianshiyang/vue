import { Dep } from "./Dep.js";
class Observer {
  constructor(data) {
    this.data = data;
    this.observer(data);
    this.dep = new Dep();
  }
  observer(data) {
    if (!data || typeof data !== "object") {
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
        // Dep.target当前Watcher的实例
        if (Dep.target) {
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
