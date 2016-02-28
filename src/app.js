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
 * Serializes the savedata and downloads it.
 * @param {Object} savedata
 */
function exportSavedata(savedata) { 
    var saveDom = new DDDASaveDom();
    var text = saveDom.serialize(savedata);

    var save = new DDDASave(text);
    var data = save.serialize();

    var blob = new Blob([data], {type: "application/octet-stream"});
    filesaver.saveAs(blob, "DDDA.sav");
};

/**
 * 
 * @param {Object} savedata
 */
function displaySavegameData(savedata) {
    document.getElementById('savegame-dropzone').style.display = 'none';
    document.getElementById('save-button').onclick = (function() {
        return function(){
            exportSavedata(savedata);
        };
    })();

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
function importSavegame(buffer) {
    var text = parseSavegame(buffer);
    var savedata = parseSavegameData(text);
    
    displaySavegameData(savedata);
};

/**
 * 
 * @param {File} file
 */
function readSavegame(file) {
    var reader = new FileReader();
    reader.onload = function(e) {
        importSavegame(e.target.result);
    };

    reader.readAsArrayBuffer(file);
};

/**
 * 
 */
function reset() {
    document.getElementById('savegame-content').style.display = 'none';
    document.getElementById('save-button').onclick = '';

    var steamId = document.getElementById('steamid');
    steamId.value = '';
    steamId.onchange = '';

    document.getElementById('savegame-dropzone').style.display = '';
};

/**
 * 
 */
function init() {
    document.getElementById('load-input').onchange = function (e) {
        var file = e.target.files[0];
        if (file) {
            readSavegame(file);
        }
    };

    document.getElementById('reset-button').onclick = function () {
        reset();
    };    
};

/**
 * Downloads, imports and then exports the demo savegame.
 */
function test() {
    console.log('requesting demo savegame');
    var request = new XMLHttpRequest();
    request.open("GET", "DDDA.sav", true);
    request.responseType = "arraybuffer";
    request.onload = function() {
        if (request.status === 200) {
            console.log('demo savegame found');
            importSavegame(request.response);
        } else {
            console.log('demo savegame not found');
        }
    };

    request.send();
};

window.onload = function() {
    //test();
    init();
};