var DDDASaveDom = function(){};

/**
 * Converts the savegame DOM to an object.
 * @param {Document} saveDocument 
 * @return {Object}
 */
DDDASaveDom.prototype.parse = function (saveDocument) {
    console.log('converting');
    var root = this.parseClassNodeMembers(saveDocument);
    console.log('converting done');
    return root;
};

/**
 * Converts a savegame DOM node to an object with type and members.
 * @param {Element} node
 * @return {Object}
 */
DDDASaveDom.prototype.parseClassNode = function (node) {
    var value = this.parseClassNodeMembers(node);
    node.type = node.getAttribute('type');
    return value;
}

/**
 * Converts a savegame DOM node to an object with members.
 * @param {Document|Element} node
 * @return {Object}
 */
DDDASaveDom.prototype.parseClassNodeMembers = function (node) {
    var value = {};
    node = node.firstChild;
    while (node) {
        if (node.nodeType == 1) {
            var memberName = node.getAttribute('name');
            value[memberName] = this.parseNode(node);
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
DDDASaveDom.prototype.parseNode = function (node) {
    /*
     * value types:
     * bool
     * f32
     * s8 / s16 / s32 / s64
     * u8 / u16 / u32 / u64
     * string
     * 
     * structure types:
     * vector3 (f32 x,y,z)
     * time (s32 day, hour, minute, month, second, year)
     * class (string type)
     * classref (string type)
     * array (s32 count, string type)
     */
    var value = null;
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
            value = this.parseClassNode(node);
            break;
        case 'array':
            value = [];
            node = node.firstChild;
            while (node) {
                if (node.nodeType == 1) {
                    value.push(this.parseNode(node));
                }

                node = node.nextSibling;
            }

            break;
        default:
            console.error('unknown node: ' + node.tagName);
    }

    return value;
};

module.exports = DDDASaveDom;