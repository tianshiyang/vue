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
      // sub是每个watcher的实例
      sub.update();
    });
  }
}
export { Dep };
