// Dep存放的是所有的watcher
class Dep {
  constructor() {
    this.subs = [];
  }
  static target = null;
  addSub(sub) {
    this.subs.push(sub);
  }
  notify() {
    this.subs.forEach((sub) => {
      // 每个sub都是对应HTML模板的watcher实例
      sub.update();
    });
  }
}
export { Dep };
