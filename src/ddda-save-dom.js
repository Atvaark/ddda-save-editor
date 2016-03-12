class DDDAValue {
  constructor() {
    this.value = null;
  }

  static get elementName() {
    return null;
  }

  parseNode(node) {
    const name = node.getAttribute('name');
    if (name) this.name = name;
    this.value = node.getAttribute('value');
    return this;
  }

  serializeNode(doc) {
    const node = doc.createElement(this.elemName);
    if (this.name) node.setAttribute('name', this.name);
    node.setAttribute('value', this.value);
    return node;
  }
}

class DDDAbool extends DDDAValue {
  static get elementName() {
    return 'bool';
  }
}

class DDDAf32 extends DDDAValue {
  static get elementName() {
    return 'f32';
  }
}

class DDDAs8 extends DDDAValue {
  static get elementName() {
    return 's8';
  }
}

class DDDAs16 extends DDDAValue {
  static get elementName() {
    return 's16';
  }
}

class DDDAs32 extends DDDAValue {
  static get elementName() {
    return 's32';
  }
}

class DDDAs64 extends DDDAValue {
  static get elementName() {
    return 's64';
  }
}

class DDDAu8 extends DDDAValue {
  static get elementName() {
    return 'u8';
  }
}

class DDDAu16 extends DDDAValue {
  static get elementName() {
    return 'u16';
  }
}

class DDDAu32 extends DDDAValue {
  static get elementName() {
    return 'u32';
  }
}

class DDDAu64 extends DDDAValue {
  static get elementName() {
    return 'u64';
  }
}

class DDDAstring extends DDDAValue {
  static get elementName() {
    return 'string';
  }
}

class DDDAvector3 {
  constructor() {
    this.x = null;
    this.y = null;
    this.z = null;
  }

  static get elementName() {
    return 'vector3';
  }

  parseNode(node) {
    const name = node.getAttribute('name');
    if (name) this.name = name;
    this.x = node.getAttribute('x');
    this.y = node.getAttribute('y');
    this.z = node.getAttribute('z');
    return this;
  }

  serializeNode(doc) {
    const node = doc.createElement(this.elemName);
    if (this.name) node.setAttribute('name', this.name);
    node.setAttribute('x', this.x);
    node.setAttribute('y', this.y);
    node.setAttribute('z', this.z);
    return node;
  }
}

class DDDAtime {
  constructor() {
    this.year = null;
    this.month = null;
    this.day = null;
    this.hour = null;
    this.minute = null;
    this.second = null;
  }

  static get elementName() {
    return 'time';
  }

  parseNode(node) {
    const name = node.getAttribute('name');
    if (name) this.name = name;
    this.year = node.getAttribute('year');
    this.month = node.getAttribute('month');
    this.day = node.getAttribute('day');
    this.hour = node.getAttribute('hour');
    this.minute = node.getAttribute('minute');
    this.second = node.getAttribute('second');
    return this;
  }

  serializeNode(doc) {
    const node = doc.createElement(this.elemName);
    if (this.name) node.setAttribute('name', this.name);
    node.setAttribute('year', this.year);
    node.setAttribute('month', this.month);
    node.setAttribute('day', this.day);
    node.setAttribute('hour', this.hour);
    node.setAttribute('minute', this.minute);
    node.setAttribute('second', this.second);
    return node;
  }
}

class DDDAclass {
  constructor() {
    this.type = null;
  }

  static get elementName() {
    return 'class';
  }

  parseNode(node, factory) {
    const name = node.getAttribute('name');
    if (name) this.name = name;
    this.type = node.getAttribute('type');

    let currentNode = node.firstChild;
    while (currentNode) {
      if (currentNode.nodeType === Node.ELEMENT_NODE) {
        const MemberType = factory[currentNode.tagName];
        const member = new MemberType();
        member.parseNode(currentNode, factory);
        this[member.name] = member;
      }

      currentNode = currentNode.nextSibling;
    }
    return this;
  }

  serializeNode(doc) {
    const node = doc.createElement(this.elemName);
    if (this.name) node.setAttribute('name', this.name);
    node.setAttribute('type', this.type);
    for (const property in this) {
      if (this.hasOwnProperty(property)) {
        const value = this[property];
        if (!value || typeof(value.serializeNode) !== 'function') {
          continue;
        }
        const childNode = value.serializeNode(doc);
        node.appendChild(childNode);
      }
    }
    return node;
  }
}

class DDDAclassref extends DDDAclass {
  static get elementName() {
    return 'classref';
  }
}

class DDDAarray {
  constructor() {
    this.type = null;
    this.count = 0;
    this.items = [];
  }

  static get elementName() {
    return 'array';
  }

  parseNode(node, factory) {
    const name = node.getAttribute('name');
    if (name) this.name = name;
    this.type = node.getAttribute('type');
    this.count = node.getAttribute('count');
    this.items = [];
    let currentNode = node.firstChild;
    while (currentNode) {
      if (currentNode.nodeType === Node.ELEMENT_NODE) {
        const ItemType = factory[currentNode.tagName];
        const item = new ItemType();
        item.parseNode(currentNode, factory);
        this.items.push(item);
      }

      currentNode = currentNode.nextSibling;
    }
    return this;
  }

  serializeNode(doc) {
    const node = doc.createElement(this.elemName);
    if (this.name) node.setAttribute('name', this.name);
    node.setAttribute('type', this.type);
    node.setAttribute('count', this.count);
    let childNode = null;
    for (let i = 0; i < this.items.length; i++) {
      childNode = this.items[i].serializeNode(doc);
      node.appendChild(childNode);
    }
    return node;
  }
}

class DDDAFactory {
  constructor() {
    this[DDDAbool.elementName] = DDDAbool;
    this[DDDAf32.elementName] = DDDAf32;
    this[DDDAs8.elementName] = DDDAs8;
    this[DDDAs16.elementName] = DDDAs16;
    this[DDDAs32.elementName] = DDDAs32;
    this[DDDAs64.elementName] = DDDAs64;
    this[DDDAu8.elementName] = DDDAu8;
    this[DDDAu16.elementName] = DDDAu16;
    this[DDDAu32.elementName] = DDDAu32;
    this[DDDAu64.elementName] = DDDAu64;
    this[DDDAstring.elementName] = DDDAstring;
    this[DDDAvector3.elementName] = DDDAvector3;
    this[DDDAtime.elementName] = DDDAtime;
    this[DDDAclass.elementName] = DDDAclass;
    this[DDDAclassref.elementName] = DDDAclassref;
    this[DDDAarray.elementName] = DDDAarray;
  }
}

class DDDASaveDom {
   /**
   * Converts the savegame DOM to an object.
   * @param {Document} saveDocument
   * @return {Object}
   */
  parse(saveDocument) {
    const factory = new DDDAFactory();
    const rootClass = new DDDAclass();
    rootClass.parseNode(saveDocument.documentElement, factory);
    return rootClass;
  }

  /**
   * Converts  an object to a savegame DOM .
   * @param {Object} rootClass
   * @return {Document}
   */
  serialize(rootClass) {
    const dom = document.implementation.createDocument('', null, null);
    const rootNode = rootClass.serializeNode(dom);
    const pi = dom.createProcessingInstruction('xml', 'version="1.0" encoding="utf-8"');
    dom.appendChild(pi);
    dom.appendChild(rootNode);
    const serializer = new XMLSerializer();
    // The game doesn't indent the xml, it just separates tags with \n.
    // This regex works if the xml attribues don't contain the '>' character.
    return serializer.serializeToString(dom).replace(/>/g, '>\n');
  }
}

export default DDDASaveDom;
