import filesaver from 'filesaver.js'
import DDDASave from './ddda-save'
import DDDASaveDom from './ddda-save-dom'

class App {
    constructor() {
        this.savedata = null;
    }

    /**
     * Parses the savegame and returns the content as a string.
     * @param {ArrayBuffer} buffer
     * @return {String}
     */
    parseSavegame(buffer) {
        const save = new DDDASave();
        save.parse(buffer); 
        return save.data;
    }

    /**
     * Parses the xml savegame and returns the content as an object.
     * @param {String} text
     * @return {Object}
     */
    parseSavegameData(text) {
        const parser = new DOMParser();
        const saveDocument = parser.parseFromString(text, "application/xml");

        const saveDom = new DDDASaveDom();
        const savedata = saveDom.parse(saveDocument);

        return savedata;
    }

    /**
     * Serializes the savedata and downloads it.
     * @param {Object} savedata
     */
    exportSavedata(savedata) { 
        const saveDom = new DDDASaveDom();
        const text = saveDom.serialize(savedata);

        const save = new DDDASave(text);
        const data = save.serialize();

        const blob = new Blob([data], {type: "application/octet-stream"});
        filesaver.saveAs(blob, "DDDA.sav");
    }

    /**
     * 
     * @param {Object} savedata
     */
    displaySavegameData(savedata) {
        document.getElementById('import-panel').style.display = 'none';
        document.getElementById('save-button').onclick = () => {
            this.exportSavedata(savedata);
        };

        const steamId = document.getElementById('steamid');
        steamId.value = savedata.mSteamID.value;
        steamId.onchange = (e) => {
            this.savedata.mSteamID.value = e.target.value;
        }

        document.getElementById('edit-panel').style.display = '';
    }

    /**
     * 
     * @param {ArrayBuffer} buffer
     */
    importSavegame(buffer) {
        const text = this.parseSavegame(buffer);
        const savedata = this.parseSavegameData(text);
        
        this.displaySavegameData(savedata);
    }

    /**
     * 
     * @param {File} file
     */
    readSavegame(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            this.importSavegame(e.target.result);
        };

        reader.readAsArrayBuffer(file);
    }

    /**
     * 
     */
    reset() {
        document.getElementById('edit-panel').style.display = 'none';
        document.getElementById('save-button').onclick = '';
        document.getElementById('load-input').value = '';    

        const steamId = document.getElementById('steamid');
        steamId.value = '';
        steamId.onchange = '';

        document.getElementById('import-panel').style.display = '';
    }

    /**
     * 
     */
    init() {
        document.getElementById('load-input').onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                this.readSavegame(file);
            }
        };

        document.getElementById('reset-button').onclick = (e) => {
            this.reset();
        };
    }

    /**
     * Downloads, imports and then exports the demo savegame.
     */
    test() {
        console.log('requesting demo savegame');
        const request = new XMLHttpRequest();
        request.open("GET", "DDDA.sav", true);
        request.responseType = "arraybuffer";
        request.onload = () => {
            if (request.status === 200) {
                console.log('demo savegame found');
                this.importSavegame(request.response);
            } else {
                console.log('demo savegame not found');
            }
        };

        request.send();
    }
}

const app = new App();

window.onload = function() {
    //app.test();
    app.init();
};