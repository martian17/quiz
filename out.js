(() => {
  // node_modules/.pnpm/github.com+martian17+htmlgen@20285340c5f351fa860e4bb889b6b44f4e3cccf7/node_modules/htmlgen/dist/maplist.js
  var MapList = class {
    constructor() {
      this.objmap = /* @__PURE__ */ new Map();
      this.head = null;
      this.tail = null;
      this.length = 0;
    }
    get size() {
      return this.objmap.size;
    }
    push_back(elem) {
      if (this.has(elem))
        this.delete(elem);
      let ref = {
        prev: null,
        next: null,
        elem
      };
      this.objmap.set(elem, ref);
      if (this.tail === null) {
        this.head = ref;
        this.tail = ref;
      } else {
        this.tail.next = ref;
        ref.prev = this.tail;
        this.tail = ref;
      }
    }
    pop_back() {
      let tail = this.tail;
      if (tail === null) {
        console.log("warning: trying to pop an empty list");
        return void 0;
      }
      this.tail = tail.prev;
      if (this.tail !== null)
        this.tail.next = null;
      this.objmap.delete(tail.elem);
      return tail.elem;
    }
    push_front(elem) {
      if (this.has(elem))
        this.delete(elem);
      console.log("inserting front: ", elem);
      if (this.head === null) {
        this.push_back(elem);
      } else {
        this.insertBefore(elem, this.head.elem);
      }
    }
    pop_front() {
      if (this.head === null) {
        return void 0;
      } else {
        let h = this.head.elem;
        this.delete(h);
        return h;
      }
    }
    delete(elem) {
      if (!this.objmap.has(elem)) {
        console.log("warning: trying to delete an empty element");
        return;
      }
      let ref = this.objmap.get(elem);
      if (ref.prev === null) {
        this.head = ref.next;
      } else {
        ref.prev.next = ref.next;
      }
      if (ref.next === null) {
        this.tail = ref.prev;
      } else {
        ref.next.prev = ref.prev;
      }
      this.objmap.delete(elem);
    }
    has(elem) {
      return this.objmap.has(elem);
    }
    getNext(elem) {
      if (!this.objmap.has(elem)) {
        throw new Error("Error: trying to get an element that does not exist");
      }
      let ref = this.objmap.get(elem);
      if (ref.next === null)
        return void 0;
      return ref.next.elem;
    }
    getPrev(elem) {
      if (!this.objmap.has(elem)) {
        throw new Error("Error: trying to get an element that does not exist");
      }
      let ref = this.objmap.get(elem);
      if (ref.prev === null)
        return void 0;
      return ref.prev.elem;
    }
    getHead() {
      if (this.head === null) {
        return void 0;
      }
      return this.head.elem;
    }
    getTail() {
      if (this.tail === null) {
        return void 0;
      }
      return this.tail.elem;
    }
    insertBefore(elem1, elem2) {
      if (!this.objmap.has(elem2)) {
        console.log("warning: trying to insert before a non-member element");
        return;
      }
      if (elem1 === elem2) {
        console.log("Warning: trying to insert before itself");
        return;
      }
      if (this.has(elem1))
        this.delete(elem1);
      let ref2 = this.objmap.get(elem2);
      let ref1 = {
        prev: ref2.prev,
        next: ref2,
        elem: elem1
      };
      this.objmap.set(elem1, ref1);
      let ref0 = ref2.prev;
      ref2.prev = ref1;
      if (ref0 === null) {
        this.head = ref1;
      } else {
        ref0.next = ref1;
      }
    }
    insertAfter(elem1, elem2) {
      if (!this.objmap.has(elem1)) {
        console.log("warning: trying to insert after a non-member element");
        return;
      }
      if (elem1 === elem2) {
        console.log("Warning: trying to insert after itself");
        return;
      }
      if (this.has(elem2))
        this.delete(elem2);
      let ref1 = this.objmap.get(elem1);
      let ref2 = {
        prev: ref1,
        next: ref1.next,
        elem: elem2
      };
      this.objmap.set(elem2, ref2);
      let ref3 = ref1.next;
      ref1.next = ref2;
      if (ref3 === null) {
        this.tail = ref2;
      } else {
        ref3.prev = ref2;
      }
    }
    foreach(cb) {
      let ref = this.head;
      while (ref !== null) {
        let next = ref.next;
        cb(ref.elem);
        ref = next;
      }
    }
    clear() {
      this.head = null;
      this.tail = null;
      this.objmap.clear();
    }
    replace(elem, rep) {
      let ref = this.objmap.get(elem);
      if (!ref) {
        throw new Error("element does not exist");
      }
      ref.elem = rep;
      this.objmap.delete(elem);
      this.objmap.set(rep, ref);
      return elem;
    }
    toArray() {
      let arr = [];
      this.foreach((elem) => {
        arr.push(elem);
      });
      return arr;
    }
    [Symbol.iterator]() {
      let ref = this.head;
      return {
        next: () => {
          if (ref === null)
            return { done: true };
          let ref0 = ref;
          ref = ref.next;
          return { value: ref0.elem, done: false };
        }
      };
    }
    *loopRange(a, b) {
      if (!a)
        return;
      if (this.head === null)
        return;
      let ref = this.objmap.get(a);
      while (ref && ref.elem !== b) {
        let next = ref.next;
        yield ref.elem;
        ref = next;
      }
    }
    loop() {
      return this.loopRange(this.getHead());
    }
    loopUntil(elem) {
      return this.loopRange(this.getHead(), elem);
    }
    loopFrom(elem) {
      return this.loopRange(elem);
    }
    //reverse loops
    *loopReverseRange(a, b) {
      if (!a)
        return;
      if (this.head === null)
        return;
      let ref = this.objmap.get(a);
      while (ref && ref.elem !== b) {
        let prev = ref.prev;
        yield ref.elem;
        ref = prev;
      }
    }
    loopReverse() {
      return this.loopReverseRange(this.getTail());
    }
    loopReverseUntil(elem) {
      return this.loopReverseRange(this.getTail(), elem);
    }
    loopReverseFrom(elem) {
      return this.loopReverseRange(elem);
    }
    getNth(n) {
      if (n >= this.size || n < 0) {
        return void 0;
      }
      let ref = this.head;
      for (let i = 0; i < n; i++) {
        if (!ref)
          return;
        ref = ref.next;
      }
      if (!ref)
        return;
      return ref.elem;
    }
    // Aliases
    push(elem) {
      this.push_back(elem);
    }
    pop() {
      this.pop_back();
    }
  };

  // node_modules/.pnpm/github.com+martian17+htmlgen@20285340c5f351fa860e4bb889b6b44f4e3cccf7/node_modules/htmlgen/dist/index.js
  var BaseELEM = class _BaseELEM {
    constructor() {
      this.parent = null;
    }
    static fromElement(e2) {
      if (this === _BaseELEM) {
        let elem2;
        switch (e2.nodeType) {
          case 1:
            elem2 = new ELEM();
            break;
          case 2:
            elem2 = new AttributeELEM();
            break;
          case 3:
            elem2 = new TextELEM();
            break;
          case 4:
            elem2 = new DataSectionELEM();
            break;
          case 5:
            elem2 = new EntityPreferenceELEM();
            break;
          case 6:
            elem2 = new EntityELEM();
            break;
          case 7:
            elem2 = new ProcessingInstructionELEM();
            break;
          case 8:
            elem2 = new CommentELEM();
            break;
          case 9:
            elem2 = new DocumentELEM();
            break;
          case 10:
            elem2 = new DocumentTypeELEM();
            break;
          case 11:
            elem2 = new DocumentFragmentELEM();
            break;
          case 12:
            elem2 = new NotationELEM();
            break;
          default:
            throw new Error(`Unknown node type ${e2.nodeType}`);
        }
        elem2.e = e2;
        if (e2.nodeType === 1) {
          for (const child of e2.childNodes) {
            elem2.children.push(_BaseELEM.fromElement(child));
          }
        }
        return elem2;
      }
      const elem = new this();
      elem.e = e2;
      if (elem instanceof ELEM) {
        for (const child of e2.childNodes) {
          elem.children.push(_BaseELEM.fromElement(child));
        }
      }
      return elem;
    }
    remove() {
      if (this.parent) {
        this.parent.removeChild(this);
      } else if (this.e.parentNode) {
        console.log("Warning: removing an element through raw dom");
        this.e.parentNode.removeChild(this.e);
      }
      return this;
    }
  };
  var AttributeELEM = class extends BaseELEM {
    constructor() {
      super(...arguments);
      this.nodeType = 2;
    }
  };
  var TextELEM = class extends BaseELEM {
    constructor() {
      super(...arguments);
      this.nodeType = 3;
    }
  };
  var DataSectionELEM = class extends BaseELEM {
    constructor() {
      super(...arguments);
      this.nodeType = 4;
    }
  };
  var EntityPreferenceELEM = class extends BaseELEM {
    constructor() {
      super(...arguments);
      this.nodeType = 5;
    }
  };
  var EntityELEM = class extends BaseELEM {
    constructor() {
      super(...arguments);
      this.nodeType = 6;
    }
  };
  var ProcessingInstructionELEM = class extends BaseELEM {
    constructor() {
      super(...arguments);
      this.nodeType = 7;
    }
  };
  var CommentELEM = class extends BaseELEM {
    constructor() {
      super(...arguments);
      this.nodeType = 8;
    }
  };
  var DocumentELEM = class extends BaseELEM {
    constructor() {
      super(...arguments);
      this.nodeType = 9;
    }
  };
  var DocumentTypeELEM = class extends BaseELEM {
    constructor() {
      super(...arguments);
      this.nodeType = 10;
    }
  };
  var DocumentFragmentELEM = class extends BaseELEM {
    constructor() {
      super(...arguments);
      this.nodeType = 11;
    }
  };
  var NotationELEM = class extends BaseELEM {
    constructor() {
      super(...arguments);
      this.nodeType = 12;
    }
  };
  var getELEM = function(nname, attrs, inner, style) {
    if (nname instanceof BaseELEM)
      return nname;
    if (typeof nname === "string")
      return ELEM.create(nname, attrs, inner, style);
    return BaseELEM.fromElement(nname);
  };
  var ELEMList = class extends MapList {
    getInstance(e2) {
      for (let child of this.loop()) {
        if (child.e === e2)
          return child;
      }
      return void 0;
    }
  };
  var ELEM = class _ELEM extends BaseELEM {
    constructor(nname, attrs, inner, style) {
      super();
      this.nodeType = 1;
      this.parent = null;
      this.children = new ELEMList();
      if (!nname)
        return;
      this.e = document.createElement(nname);
      if (attrs)
        this.setAttrs(attrs);
      if (inner)
        this.setInner(inner);
      if (style)
        this.setStyle(style);
    }
    static create(nname, attrs, inner, style) {
      const elem = new _ELEM();
      elem.e = document.createElement(nname);
      if (attrs)
        elem.setAttrs(attrs);
      if (inner)
        elem.setInner(inner);
      if (style)
        elem.setStyle(style);
      return elem;
    }
    setAttrs(attrs) {
      for (let key in attrs) {
        this.e.setAttribute(key, attrs[key]);
      }
    }
    setStyle(style) {
      for (let key in style) {
        this.e.style[key] = style[key];
      }
    }
    setInner(inner) {
      this.children.clear();
      this.e.innerHTML = inner;
      let childNodes = this.e.childNodes;
      for (let i = 0; i < childNodes.length; i++) {
        let child = BaseELEM.fromElement(childNodes[i]);
        if (!child)
          continue;
        child.parent = this;
        this.children.push(child);
      }
      return this;
    }
    push_back(a, b, c, d) {
      const elem = getELEM(a, b, c, d);
      elem.remove();
      elem.parent = this;
      this.children.push(elem);
      this.e.appendChild(elem.e);
      return elem;
    }
    pop_back() {
      let elem = this.children.getTail();
      elem === null || elem === void 0 ? void 0 : elem.remove();
      return elem;
    }
    push_front(a, b, c, d) {
      const elem = getELEM(a, b, c, d);
      elem.remove();
      elem.parent = this;
      this.children.push_front(elem);
      if (this.e.children.length === 0) {
        this.e.appendChild(elem.e);
      } else {
        this.e.insertBefore(elem.e, this.e.children[0]);
      }
      return elem;
    }
    pop_front() {
      let elem = this.children.getHead();
      elem === null || elem === void 0 ? void 0 : elem.remove();
      return elem;
    }
    attr(key, value) {
      if (typeof key !== "string") {
        this.setAttrs(key);
        return;
      }
      this.e.setAttribute(key, value);
      return this;
    }
    style(key, value) {
      if (typeof key !== "string") {
        this.setStyle(key);
        return;
      }
      this.e.style[key] = value;
    }
    removeChild(elem) {
      this.children.delete(elem);
      this.e.removeChild(elem.e);
      elem.parent = null;
      return this;
    }
    insertBefore(a, b, c, d) {
      if (b instanceof BaseELEM) {
        const elem1 = a;
        const elem2 = b;
        elem1.remove();
        this.e.insertBefore(elem1.e, elem2.e);
        this.children.insertBefore(elem1, elem2);
        elem1.parent = this;
        return elem1;
      } else {
        const parent = this.parent;
        if (!parent) {
          throw new Error("parent to the node not defined");
        }
        const elem1 = getELEM(a, b, c, d);
        parent.insertBefore(elem1, this);
        return elem1;
      }
    }
    insertAfter(a, b, c, d) {
      if (b instanceof BaseELEM) {
        const elem1 = a;
        const elem2 = b;
        let next = this.children.getNext(elem1);
        if (next === void 0) {
          return this.push_back(elem2);
        } else {
          return this.insertBefore(elem2, next);
        }
      } else {
        let parent = this.parent;
        if (!parent) {
          throw new Error("parent to the node not defined");
        }
        const elem1 = getELEM(a, b, c, d);
        return parent.insertAfter(this, elem1);
      }
    }
    replaceChild(elem, rep) {
      this.insertAfter(elem, rep);
      elem.remove();
      return rep;
    }
    replaceInPlace(elem) {
      if (this.parent) {
        this.parent.replaceChild(this, elem);
      } else {
        elem.remove();
        const parent = this.e.parentNode;
        if (!parent)
          return;
        parent.removeChild(this.e);
        parent.appendChild(elem.e);
      }
    }
    on(evt, cb) {
      this.e.addEventListener(evt, cb);
      return cb;
    }
    off(evt, cb) {
      this.e.removeEventListener(evt, cb);
      return cb;
    }
    once(evt) {
      let that = this;
      let cbs = [];
      for (let i = 1; i < arguments.length; i++) {
        let cb = arguments[i];
        let evtfunc = function(cb2, e2) {
          for (let i2 = 0; i2 < cbs.length; i2++) {
            that.e.removeEventListener(evt, cbs[i2]);
          }
          cbs = [];
          cb2(e2);
        }.bind(null, cb);
        cbs.push(evtfunc);
        this.e.addEventListener(evt, evtfunc);
      }
      return {
        remove: function() {
          for (let i = 0; i < cbs.length; i++) {
            that.e.removeEventListener(evt, cbs[i]);
          }
        }
      };
    }
    getX() {
      let e2 = this.e;
      return e2.offsetLeft;
    }
    getY() {
      let e2 = this.e;
      return e2.offsetTop;
    }
    getWidth() {
      let e2 = this.e;
      return e2.offsetWidth;
    }
    getHeight() {
      let e2 = this.e;
      return e2.offsetHeight;
    }
    getNext() {
      if (!this.parent) {
        throw new Error("unsupported operation: parent not registered");
      }
      return this.parent.children.getNext(this);
    }
    getPrev() {
      if (!this.parent) {
        throw new Error("unsupported operation: parent not registered");
      }
      return this.parent.children.getPrev(this);
    }
    getDescendent(e2) {
      let chain = [];
      while (e2 !== this.e) {
        chain.push(e2);
        if (e2.parentNode) {
          e2 = e2.parentNode;
        } else {
          throw new Error("getDescendent: Not a descendent");
        }
      }
      let elem = this;
      while (chain.length !== 0) {
        const e3 = chain.pop();
        elem = elem.children.getInstance(e3);
      }
      return elem;
    }
    query(query) {
      const e2 = this.e.querySelector(query);
      if (!e2)
        return void 0;
      return this.getDescendent(e2);
    }
    queryAll(query) {
      let that = this;
      return [...this.e.querySelectorAll(query)].map((e2) => that.getDescendent(e2));
    }
    get rect() {
      return this.e.getBoundingClientRect();
    }
    get prev() {
      return this.getPrev();
    }
    get next() {
      return this.getNext();
    }
    get head() {
      return this.children.getHead();
    }
    get tail() {
      return this.children.getTail();
    }
    add(a, b, c, d) {
      return this.push_back(a, b, c, d);
    }
    push(a, b, c, d) {
      return this.push_back(a, b, c, d);
    }
    pop() {
      return this.pop_back();
    }
    class(classname) {
      this.e.classList.add(classname);
    }
    id(id) {
      this.attr("id", id);
    }
  };

  // main.js
  var e = ELEM.create(document.body);
  console.log(e);
})();
