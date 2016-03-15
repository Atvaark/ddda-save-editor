import React from 'react';

import DDDASave from 'ddda/ddda-save.js';
import DDDASaveDom from 'ddda/ddda-save-dom.js';

class ImportPanel extends React.Component {
  constructor(props) {
    super(props);
    this.handleFileChange = this.handleFileChange.bind(this);
    this.state = {
      file: null,
      text: null,
      progress: null,
      error: null
    };
  }

  /**
   * Parses the savegame and returns the content as a string.
   * @param {ArrayBuffer} buffer
   * @return {String}
   */
  parseSavegame(buffer) {
    this.setState({
      text: 'Parsing file',
      progress: {
        current: 4,
        max: 10
      }
    });
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
    this.setState({
      text: 'Parsing savegame 1',
      progress: {
        current: 6,
        max: 10
      }
    });
    const parser = new DOMParser();
    const saveDocument = parser.parseFromString(text, 'text/xml');

    this.setState({
      text: 'Parsing savegame 2',
      progress: {
        current: 8,
        max: 10
      }
    });
    const saveDom = new DDDASaveDom();
    const savedata = saveDom.parse(saveDocument);

    return savedata;
  }

  /**
   *
   * @param {ArrayBuffer} buffer
   */
  importSavegame(buffer) {
    const text = this.parseSavegame(buffer);
    const savedata = this.parseSavegameData(text);

    this.setState({
      text: 'Done',
      progress: {
        current: 10,
        max: 10
      }
    });

    if (this.props.onImport) {
      this.props.onImport(savedata);
    }
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

    this.setState({
      file,
      text: 'Reading file',
      progress: {
        current: 2,
        max: 10
      },
      error: null
    });
    reader.readAsArrayBuffer(file);
  }

  handleFileChange(event) {
    const file = event.target.files[0];

    if (file) {
      this.readSavegame(file);
    } else {
      this.setState({
        file: null,
        text: null,
        progress: null,
        error: null
      });
    }
  }

  render() {
    let error;
    if (this.state.error) {
      error = <div className="alert alert-danger" role="alert">{this.state.error}</div>;
    }

    let progress;
    if (this.state.progress) {
      const percentage = `${((this.state.progress.current / this.state.progress.max) * 100)}%`;
      const status = `${this.state.text} ${percentage} complete`;
      progress = (
        <div className="progress">
          <div className="progress-bar" role="progressbar" style={{ width: percentage }} >
            {status}
          </div>
        </div>
      );
    }

    return (
      <div id="import-panel" className="panel panel-primary">
        <div className="panel-heading">Import DDDA.sav</div>
        <div className="panel-body">
          <div>
            {error}
            {progress}
            <label htmlFor="load-input">File</label>
            <input id="load-input" type="file" className="btn btn-default btn-file" onChange={this.handleFileChange} />
            <h3>Hints</h3>
            <ol>
              <li>Savegames can be found here:
                <i>%ProgramFiles(x86)%&#92;Steam&#92;userdata&#92;%userid%&#92;367500&#92;remote&#92;DDDA.sav </i>
                <span className="label label-info">Info</span>
              </li>
              <li>Your savegame will <b>not</b> be uploaded to a server. <span className="label label-info">Info</span></li>
              <li>Create a backup before using edited savegames. <span className="label label-warning">Warning</span></li>
              <li>Editing pawn data incorrectly can prevent it from being hired. <span className="label label-warning">Warning</span></li>
            </ol>
          </div>
        </div>
      </div>
    );
  }
}
ImportPanel.propTypes = {
  onImport: React.PropTypes.func,
};

export default ImportPanel;
