import { Observer } from "../responsive/Observer.js";
import { Compile } from "../responsive/Compile.js";
class SelfVue {
  constructor(options) {
    this.data = options.data;
    this.el = options.el;
    // this.exp = exp;
    new Observer(this.data).observer();
    new Compile(this.el, this);
  }
}
export { SelfVue };
