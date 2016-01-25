var filesaver = require('filesaver.js');

var DDDASave = require('./ddda-save')

/**
 * Parses the savegame and returns the content of it.
 * @param {ArrayBuffer} buffer 
 * @return {String}
 */
function parse(buffer){
    var save = new DDDASave();
    save.parse(buffer); 
    return save.data;
};

/**
 * Serializes the savegame content and returns it in a buffer.
 * @param {String} text 
 * @return {ArrayBuffer}
 */
function serialize(text){
    var save = new DDDASave(text);
    var data = save.serialize();
    return data;
};

/**
 * Converts the savegame DOM to an object.
 * @param {Document} saveDocument 
 * @return {Object}
 */
function parseSaveDom(saveDocument) {
    console.log('converting');
    var root = parseSaveDomClassNode(saveDocument);
    console.log('converting done');
    return root;
};

/**
 * Converts a savegame DOM node to an object with members.
 * @param {Document|Element} node
 * @return {Object}
 */
function parseSaveDomClassNode(node) {
    var value = {};
    node = node.firstChild;
    while (node) {
        if (node.nodeType == 1) {
            var memberName = node.getAttribute('name');
            value[memberName] = parseSaveDomNode(node);
        }

        node = node.nextSibling;
    }

    return value;
}

/**
 * Converts a savegame DOM node to an object, array or base type.
 * @param {Element} node
 * @return {Object|Number|String|Boolean|Array}
 */
function parseSaveDomNode(node) {
    /*
     * value types:
     * bool
     * f32
     * s8 / s16 / s32 / s64
     * u8 / u16 / u32 / u64
     * string
     * 
     * structure types:
     * 
     * vector3 (f32 x,y,z)
     * time (s32 day, hour, minute, month, second, year)
     * class (string type)
     * classref (string type)
     * array (s32 count, string type)
     */

    var value;
    switch(node.tagName) {
        case 'bool':
        case 'f32':
        case 's8':
        case 's16':
        case 's32':
        case 'u8':
        case 'u16':
        case 'u32':
            // TODO: map tagName -> constructor(string)
            value = node.getAttribute('value');
            break;

        case 's64':
        case 'u64':
        case 'string':
            value = node.getAttribute('value');
            break;

        case 'vector3':
            // TODO: Convert to float
            value = {
                x: node.getAttribute('x'),
                y: node.getAttribute('y'),
                z: node.getAttribute('z')
            };
            break;
        case 'time':
            // TODO: Convert to Number
            value = {
                second: node.getAttribute('second'),
                minute: node.getAttribute('minute'),
                hour: node.getAttribute('hour'),
                day: node.getAttribute('day'),
                month: node.getAttribute('month'),
                year: node.getAttribute('year'),
            };
            break;
        case 'class':
        case 'classref':
            value = parseSaveDomClassNode(node);
            value.type = node.getAttribute('type');
            break;
        case 'array':
            value = [];
            node = node.firstChild;
            while (node) {
                if (node.nodeType == 1) {
                    value.push(parseSaveDomNode(node));
                }

                node = node.nextSibling;
            }

            break;
        default:
            console.error('unknown node: ' + node.tagName);
            value = null;
    }

    return value;
};

/**
 * Returns the first element with the provided name.
 * @param {Document} saveDocument 
 * @return {String|Array} names
 */
function getElementByNames(saveDocument, names) {
    if (typeof names === "string") {
        names = [names];
    } else if (Array.isArray(names) && names.length === 0){
        return null;
    }

    var element = saveDocument;
    var selector = "";
    for (var i = 0; i < names.length; i++) {
        selector = "[name='" + names[i] + "']";
        element = element.querySelector(selector);
        if (!element){
            break;
        }
    };

    return element;
}

function parseText(text){
    var parser = new DOMParser();
    var saveDocument = parser.parseFromString(text, "application/xml");
    var root = parseSaveDom(saveDocument);
    var roots = JSON.stringify(root, null, 4);

    var elem = document.createElement('span');
    elem.innerHTML = roots;
    document.body.appendChild(elem);
};

/**
 * Downloads, reads and exports the demo savegame.
 */
function test(){
    console.log('requesting demo savegame');
    var request = new XMLHttpRequest();
    request.open("GET", "DDDA.sav", true);
    request.responseType = "arraybuffer";
    request.onload = function() {
        if (request.status === 200) {
            console.log('demo savegame found');

            var text = parse(request.response);
            parseText(text);
            return;
            // var data = serialize(text);
            // var blob = new Blob([data], {type: "application/octet-stream"});
            // filesaver.saveAs(blob, "DDDA.sav");
        } else {
            console.log('demo savegame not found');
        }
    };

    request.send();
};

window.onload = function() {
    test();
};