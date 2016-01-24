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
            var data = serialize(text);
            var blob = new Blob([data], {type: "application/octet-stream"});
            filesaver.saveAs(blob, "DDDA.sav");
        } else {
            console.log('demo savegame not found');
        }
    };

    request.send();
};

window.onload = function() {
    test();
};