import { Observer } from "../responsive/Observer.js";
import { Watcher } from "../responsive/Watcher.js";
class SelfVue {
  constructor(data, el, exp) {
    this.data = data;
    this.el = el;
    this.exp = exp;
    new Observer(data).observer();
    new Watcher(this, exp, (value) => {
      el.innerHTML = value;
    });
  }
}
export { SelfVue };
