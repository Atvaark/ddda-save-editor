var filesaver = require('filesaver.js');

var DDDASave = require('./ddda-save')
var DDDASaveDom = require('./ddda-save-dom')

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
 * Displays the savegame as JSON.
 */
function parseText(text){
    var parser = new DOMParser();
    var saveDocument = parser.parseFromString(text, "application/xml");
    var saveDom = new DDDASaveDom();
    var root = saveDom.parse(saveDocument);

    var dom2 = document.implementation.createDocument('', 'test', null);
    root.serializeNode(dom2, dom2.documentElement);
    var xmlString = dom2.documentElement.innerHTML;
    document.body.appendChild(document.createTextNode(xmlString));
    
    //var text = JSON.stringify(root, null, 4);
    //var elem = document.createElement('div');
    //elem.innerHTML = text;
    //document.body.appendChild(elem);
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