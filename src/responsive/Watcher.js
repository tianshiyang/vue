import { Dep } from "../responsive/Dep.js";
class Watcher {
  // vm当前实例(包括了method，data等)，exp监听的那个属性，callback回调函数，返回改变后的值，更新视图
  constructor(vm, exp, callback) {
    this.vm = vm;
    this.exp = exp;
    this.callback = callback;
    this.value = this.get(); // 这里的value是data中真实的数据
  }
  get() {
    // 只有创建的时候执行
    // this当前watcher实例，监听的是HTML模板中某一项可匹配的value值，即以{{  }}形式出现的
    Dep.target = this; // 这里的this为当前watcher的实例
    let value = this.vm.data[this.exp];
    Dep.target = null; // 释放自己
    return value;
  }
  update() {
    this.run();
  }
  run() {
    // 只有更新的时候执行
    // 现在this.vm.data[this.exp]中的值已经为最新的
    this.value = this.vm.data[this.exp];
    this.callback(this.value);
  }
}
export { Watcher };
