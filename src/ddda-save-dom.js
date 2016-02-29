var DDDAFactory = function() {
    this[DDDAbool.prototype.elemName] = DDDAbool;
    this[DDDAf32.prototype.elemName] = DDDAf32;
    this[DDDAs8.prototype.elemName] = DDDAs8;
    this[DDDAs16.prototype.elemName] = DDDAs16;
    this[DDDAs32.prototype.elemName] = DDDAs32;
    this[DDDAs64.prototype.elemName] = DDDAs64;
    this[DDDAu8.prototype.elemName] = DDDAu8;
    this[DDDAu16.prototype.elemName] = DDDAu16;
    this[DDDAu32.prototype.elemName] = DDDAu32;
    this[DDDAu64.prototype.elemName] = DDDAu64;
    this[DDDAstring.prototype.elemName] = DDDAstring;
    this[DDDAvector3.prototype.elemName] = DDDAvector3;
    this[DDDAtime.prototype.elemName] = DDDAtime;
    this[DDDAclass.prototype.elemName] = DDDAclass;
    this[DDDAclassref.prototype.elemName] = DDDAclassref;
    this[DDDAarray.prototype.elemName] = DDDAarray;
};
var DDDAValue = function(){
    this.value = null;
};
DDDAValue.prototype.parseNode = function (node) {
    var name = node.getAttribute('name');
    if (name) this.name = name;
    this.value = node.getAttribute('value');
    return this;
};
DDDAValue.prototype.serializeNode = function (doc) {
    var node = doc.createElement(this.elemName);
    if (this.name) node.setAttribute('name', this.name);
    node.setAttribute('value', this.value);
    return node;
};
var DDDAbool = function(){
    DDDAValue.call(this)
};
var DDDAf32 = function(){
    DDDAValue.call(this)
};
var DDDAs8 = function(){
    DDDAValue.call(this)
};
var DDDAs16 = function(){
    DDDAValue.call(this)
};
var DDDAs32 = function(){
    DDDAValue.call(this)
};
var DDDAs64 = function(){
    DDDAValue.call(this)
};
var DDDAu8 = function(){
    DDDAValue.call(this)
};
var DDDAu16 = function(){
    DDDAValue.call(this)
};
var DDDAu32 = function(){
    DDDAValue.call(this)
};
var DDDAu64 = function(){
    DDDAValue.call(this)
};
var DDDAstring = function(){
    DDDAValue.call(this)
};
var DDDAvector3 = function(){
    this.x = null;
    this.y = null;
    this.z = null;
};
DDDAvector3.prototype.parseNode = function (node) {
    var name = node.getAttribute('name');
    if (name) this.name = name;
    this.x = node.getAttribute('x');
    this.y = node.getAttribute('y');
    this.z = node.getAttribute('z');
    return this;
};
DDDAvector3.prototype.serializeNode = function (doc) {
    var node = doc.createElement(this.elemName);
    if (this.name) node.setAttribute('name', this.name);
    node.setAttribute('x', this.x);
    node.setAttribute('y', this.y);
    node.setAttribute('z', this.z);
    return node;
};
var DDDAtime = function(){
    this.year = null;
    this.month = null;
    this.day = null;
    this.hour = null;
    this.minute = null;
    this.second = null;
};
DDDAtime.prototype.parseNode = function (node) {
    var name = node.getAttribute('name');
    if (name) this.name = name;
    this.year = node.getAttribute('year');
    this.month = node.getAttribute('month');
    this.day = node.getAttribute('day');
    this.hour = node.getAttribute('hour');
    this.minute = node.getAttribute('minute');
    this.second = node.getAttribute('second');
    return this;
};
DDDAtime.prototype.serializeNode = function (doc) {
    var node = doc.createElement(this.elemName);
    if (this.name) node.setAttribute('name', this.name);
    node.setAttribute('year', this.year);
    node.setAttribute('month', this.month);
    node.setAttribute('day', this.day);
    node.setAttribute('hour', this.hour);
    node.setAttribute('minute', this.minute);
    node.setAttribute('second', this.second);
    return node;
};
var DDDAclass = function(){
    this.type = null;
};
DDDAclass.prototype.parseNode = function (node) {
    var name = node.getAttribute('name');
    if (name) this.name = name;
    this.type = node.getAttribute('type');
    node = node.firstChild;
    while (node) {
        if (node.nodeType == 1) {
            var memberType = DDDAclass.factory[node.tagName];
            var member = new memberType();
            member.parseNode(node);
            this[member.name] = member;
        }

        node = node.nextSibling;
    }
    return this;
};
DDDAclass.prototype.serializeNode = function (doc) {
    var node = doc.createElement(this.elemName);
    if (this.name) node.setAttribute('name', this.name);
    node.setAttribute('type', this.type);
    for (var property in this) {
        if (this.hasOwnProperty(property)) {
            var value = this[property];
            if (!value || typeof(value.serializeNode) !== 'function') {
                continue;
            }
            var childNode = value.serializeNode(doc);
            node.appendChild(childNode);
        }
    }    
    return node;
};
var DDDAclassref = function(){
    DDDAclass.call(this)
};
var DDDAarray = function(){
    this.type = null;
    this.count = 0;
    this.items = [];
};
DDDAarray.prototype.parseNode = function (node) {
    var name = node.getAttribute('name');
    if (name) this.name = name;
    this.type = node.getAttribute('type');
    this.count = node.getAttribute('count');
    this.items = [];
    node = node.firstChild;
    while (node) {
        if (node.nodeType == 1) {
            var itemType = DDDAarray.factory[node.tagName];
            var item = new itemType();
            item.parseNode(node);
            this.items.push(item);
        }

        node = node.nextSibling;
    }    
    return this;
};
DDDAarray.prototype.serializeNode = function (doc, parentNode) {
    var node = doc.createElement(this.elemName);
    if (this.name) node.setAttribute('name', this.name);   
    node.setAttribute('type', this.type);
    node.setAttribute('count', this.count);
    var childNode = null;
    for (var i = 0; i < this.items.length; i++) {
        childNode = this.items[i].serializeNode(doc);
        node.appendChild(childNode);
    };
    return node;
};

DDDAbool.prototype = Object.create(DDDAValue.prototype);
DDDAf32.prototype = Object.create(DDDAValue.prototype);
DDDAs8.prototype = Object.create(DDDAValue.prototype);
DDDAs16.prototype = Object.create(DDDAValue.prototype);
DDDAs32.prototype = Object.create(DDDAValue.prototype);
DDDAs64.prototype = Object.create(DDDAValue.prototype);
DDDAu8.prototype = Object.create(DDDAValue.prototype);
DDDAu16.prototype = Object.create(DDDAValue.prototype);
DDDAu32.prototype = Object.create(DDDAValue.prototype);
DDDAu64.prototype = Object.create(DDDAValue.prototype);
DDDAstring.prototype = Object.create(DDDAValue.prototype);
DDDAclassref.prototype = Object.create(DDDAclass.prototype);

DDDAValue.prototype.elemName = null;
DDDAbool.prototype.elemName = 'bool';
DDDAf32.prototype.elemName = 'f32';
DDDAs8.prototype.elemName = 's8';
DDDAs16.prototype.elemName = 's16';
DDDAs32.prototype.elemName = 's32';
DDDAs64.prototype.elemName = 's64';
DDDAu8.prototype.elemName = 'u8';
DDDAu16.prototype.elemName = 'u16';
DDDAu32.prototype.elemName = 'u32';
DDDAu64.prototype.elemName = 'u64';
DDDAstring.prototype.elemName = 'string';
DDDAvector3.prototype.elemName = 'vector3';
DDDAtime.prototype.elemName = 'time';
DDDAclass.prototype.elemName = 'class';
DDDAclassref.prototype.elemName = 'classref';
DDDAarray.prototype.elemName = 'array';

DDDAclass.factory = new DDDAFactory();
DDDAarray.factory = new DDDAFactory();

var DDDASaveDom = function(){};

/**
 * Converts the savegame DOM to an object.
 * @param {Document} saveDocument 
 * @return {Object}
 */
DDDASaveDom.prototype.parse = function (saveDocument) {
    var rootClass = new DDDAclass();
    rootClass.parseNode(saveDocument.documentElement);
    return rootClass;
};

/**
 * Converts  an object to a savegame DOM .
 * @param {Object} rootClass 
 * @return {Document}
 */
DDDASaveDom.prototype.serialize = function (rootClass) {
    var dom = document.implementation.createDocument('', null, null);
    var rootNode = rootClass.serializeNode(dom);    
    var pi = dom.createProcessingInstruction('xml', 'version="1.0" encoding="utf-8"');
    dom.appendChild(pi);
    dom.appendChild(rootNode);
    var serializer = new XMLSerializer();
    // The game doesn't indent the xml, it just separates tags with \n.
    // This regex works if the xml attribues don't contain the '>' character.
    return serializer.serializeToString(dom).replace(/>/g, ">\n");
};

module.exports = DDDASaveDom;