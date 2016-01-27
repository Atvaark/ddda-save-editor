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
    this.value = node.getAttribute('value');
    return this;
};
DDDAValue.prototype.serializeNode = function (doc, parentNode) {
    var node = doc.createElement(this.elemName);
    node.setAttribute('value', this.value);
    parentNode.appendChild(node);
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
    this.x = node.getAttribute('x');
    this.y = node.getAttribute('y');
    this.z = node.getAttribute('z');
    return this;
};
DDDAvector3.prototype.serializeNode = function (doc, parentNode) {    
    var node = doc.createElement(this.elemName);
    node.setAttribute('x', this.x);
    node.setAttribute('y', this.y);
    node.setAttribute('z', this.z);
    parentNode.appendChild(node);
};
var DDDAtime = function(){
    this.second = null;
    this.minute = null;
    this.hour = null;
    this.day = null;
    this.month = null;
    this.year = null;
};
DDDAtime.prototype.parseNode = function (node) {
    this.second = node.getAttribute('second');
    this.minute = node.getAttribute('minute');
    this.hour = node.getAttribute('hour');
    this.day = node.getAttribute('day');
    this.month = node.getAttribute('month');
    this.year = node.getAttribute('year');
    return this;
};
DDDAtime.prototype.serializeNode = function (doc, parentNode) {
    var node = doc.createElement(this.elemName);
    node.setAttribute('second', this.second);
    node.setAttribute('minute', this.minute);
    node.setAttribute('hour', this.hour);
    node.setAttribute('day', this.day);
    node.setAttribute('month', this.month);
    node.setAttribute('year', this.year);
    parentNode.appendChild(node);
};
var DDDAclass = function(){
    this.type = null;
};
DDDAclass.prototype.parseNode = function (node) {
    this.type = node.getAttribute('type');
    node = node.firstChild;
    while (node) {
        if (node.nodeType == 1) {
            var memberName = node.getAttribute('name');
            var memberType = DDDAclass.factory[node.tagName];
            var member = new memberType();
            member.parseNode(node);
            this[memberName] = member;
        }

        node = node.nextSibling;
    }
    return this;
};
DDDAclass.prototype.serializeNode = function (doc, parentNode) {
    var node = doc.createElement(this.elemName);
    node.setAttribute('type', this.type);
    for (var property in this) {
        if (this.hasOwnProperty(property)) {
            var value = this[property];
            if (!value || typeof(value.serializeNode) !== 'function') {
                continue;
            }

            value.serializeNode(doc, node);
        }
    }
    parentNode.appendChild(node);
};
var DDDAclassref = function(){
    DDDAclass.call(this)
};
var DDDAarray = function(){
    this.count = 0;
    this.type = null;
    this.items = [];
};
DDDAarray.prototype.parseNode = function (node) {
    this.count = node.getAttribute('count');
    this.type = node.getAttribute('type');
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
    node.setAttribute('count', this.count);
    node.setAttribute('type', this.type);
    for (var i = 0; i < this.items.length; i++) {
        this.items[i].serializeNode(doc, node);
    };
    parentNode.appendChild(node);
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
    console.log('converting');
    var rootClass = new DDDAclass();
    rootClass.parseNode(saveDocument.documentElement);
    console.log('converting done');
    return rootClass;
};

/**
 * Converts  an object to a savegame DOM .
 * @param {Object} rootClass 
 * @return {Document}
 */
DDDASaveDom.prototype.serialize = function (rootClass) {
    
};

module.exports = DDDASaveDom;