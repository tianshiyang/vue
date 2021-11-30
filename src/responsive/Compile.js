import { Watcher } from "./Watcher.js";
class Compile {
  constructor(el, vm) {
    this.ele = document.querySelector(el);
    this.vm = vm;
    this.fragment = null; // createDocumentFragment创建的虚拟节点片段
    this.init();
  }

  init() {
    if (this.ele) {
      this.fragment = this.nodeToFragment(this.ele);
      this.compileElement(this.ele);
      this.ele.appendChild(this.fragment);
    } else {
      console.error("el不存在");
    }
  }

  nodeToFragment(ele) {
    // 递归获取所有子节点
    /*
     知识补充
      1. createDocumentFragment方法在遍历原来子节点并将原来子节点添加进fragment的时候，会删除要添加的节点
      2. createDocumentFragment()方法，是用来创建一个虚拟的节点对象，或者说，是用来创建文档碎片节点。它可以包含各种类型的节点，在创建之初是空的。
      3. DocumentFragment节点不属于文档树，继承的parentNode属性总是null
      4. 当请求把一个DocumentFragment节点插入文档树时，插入的不是DocumentFragment自身，而是它的所有子孙节点，即插入的是括号里的节点
     */
    let fragment = document.createDocumentFragment();
    let child = ele.firstChild;
    while (child) {
      fragment.appendChild(child);
      child = child.firstChild;
    }
    return fragment;
  }

  compileElement(ele) {
    let childNodes = ele.childNodes;
    childNodes.forEach((node) => {
      const reg = /\{\{(.*)\}\}/;
      let text = node.textContent;
      if (this.isElementNode(node)) {
        // 元素节点
        this.compileNode(node);
      } else if (this.isTextNode(node) && reg.test(text)) {
        // 文本节点
        this.compileText(node, reg.exec(text)[1]);
      }
      // 递归遍历所有子节点
      if (node.childNodes && node.childNodes.length) {
        this.compileElement(node);
      }
    });
  }

  compileNode(node) {
    // 主要针对node节点的attribute属性，判断有没有v-model等属性
    let nodeAttrs = node.attributes;
    Array.prototype.forEach.call(nodeAttrs, (attr) => {
      if (this.isDirective(attr.name)) {
        // 含有vue自带指令
        if (this.isModelAttr(attr.name)) {
          this.compileModel(node, attr.value);
        }
      }
    });
  }

  compileText(node, exp) {
    exp = exp.trim();
    let initText = this.vm.data[exp];
    this.updateText(node, initText);
    new Watcher(this.vm, exp, (value) => {
      this.updateText(node, value);
    });
  }

  updateText(node, value) {
    node.textContent = typeof value == "undefined" ? "" : value;
  }

  compileModel(node, exp) {
    let val = this.vm.data[exp];
    this.modelUpdate(node, exp, val);
    new Watcher(this.vm, exp, (value) => {
      this.modelUpdate(node, exp, value);
    });
    // input 的双向绑定
    node.addEventListener("input", (e) => {
      let newVal = e.target.value;
      if (val === newVal) {
        return;
      }
      this.vm.data[exp] = newVal;
      val = newVal;
    });
  }

  modelUpdate(node, exp, value) {
    node.value = typeof this.vm.data[exp] == "undefined" ? "" : value;
  }

  isModelAttr(attrName) {
    return (
      attrName.split("-").length === 2 && attrName.split("-")[1] === "model"
    );
  }

  isDirective(attrName) {
    return attrName.indexOf("v-") === 0;
  }

  isElementNode(node) {
    return node.nodeType === 1;
  }

  isTextNode(node) {
    return node.nodeType === 3;
  }
}

export { Compile };
