var filesaver = require('filesaver.js');

var DDDASave = require('./ddda-save')
var DDDASaveDom = require('./ddda-save-dom')

/**
 * Parses the savegame and returns the content as a string.
 * @param {ArrayBuffer} buffer 
 * @return {String}
 */
function parseSavegame(buffer){
    var save = new DDDASave();
    save.parse(buffer); 
    return save.data;
};

/**
 * Parses the xml savegame and returns the content as an object.
 * @param {String} text 
 * @return {Object}
 */
function parseSavegameData(text){
    var parser = new DOMParser();
    var saveDocument = parser.parseFromString(text, "application/xml");
    var saveDom = new DDDASaveDom();
    var savedata = saveDom.parse(saveDocument);
    return savedata;
};

/**
 * Serializes the savegame content and returns it in a buffer.
 * @param {String} text 
 * @return {ArrayBuffer}
 */
function serializeSavegame(text){
    var save = new DDDASave(text);
    var data = save.serialize();
    return data;
};

/**
 * Serializes the savedata object as an xml string.
 * @param {Object} savedata 
 * @return {String}
 */
function serializeSavegameData(savedata) {
    var dom = document.implementation.createDocument('', 'root', null);
    savedata.serializeNode(dom, dom.documentElement);
    return dom.documentElement.innerHTML;
};

/**
 * 
 * @param {Object} savedata
 */
function displaySavegameData(savedata){
    document.getElementById('savegame-dropzone').style.display = 'none';
    document.getElementById('save-button').onclick = function() {
        var text = serializeSavegameData(savedata);
        var data = serializeSavegame(text);
        var blob = new Blob([data], {type: "application/octet-stream"});
        filesaver.saveAs(blob, "DDDA.sav");
    };    

    var steamId = document.getElementById('steamid');
    steamId.value = savedata.mSteamID.value;
    steamId.onchange = function (e) {
        savedata.mSteamID.value = e.target.value;
    };

    document.getElementById('savegame-content').style.display = '';
};

/**
 * 
 * @param {ArrayBuffer} buffer 
 */
function display(buffer) {
    var text = parseSavegame(buffer);
    var savedata = parseSavegameData(text);
    displaySavegameData(savedata);
};


/**
 * 
 * @param {File} file 
 */
function loadSavegame(file) {
    var reader = new FileReader();
    reader.onload = function(e) {
        display(e.target.result);
    };

    reader.readAsArrayBuffer(file);
};

/**
 * Downloads, reads and exports the demo savegame.
 */
function test() {
    console.log('requesting demo savegame');
    var request = new XMLHttpRequest();
    request.open("GET", "DDDA.sav", true);
    request.responseType = "arraybuffer";
    request.onload = function() {
        if (request.status === 200) {
            console.log('demo savegame found');
            display(request.response);
        } else {
            console.log('demo savegame not found');
        }
    };

    request.send();
};

function init() {
    document.getElementById('load-input').onchange = function (e) {
        var file = e.target.files[0];
        if (file) {
            loadSavegame(file);            
        }
    };
};

window.onload = function() {
    //test();
    init();
};
