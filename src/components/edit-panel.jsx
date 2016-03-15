import React from 'react';

import filesaver from 'filesaver.js';
import DDDASave from 'ddda/ddda-save.js';
import DDDASaveDom from 'ddda/ddda-save-dom.js';

// import ClassEditor from 'components/editors/class-editor.jsx';

class EditPanel extends React.Component {
  constructor(props) {
    super(props);
    this.handleExport = this.handleExport.bind(this);
    this.handleReset = this.handleReset.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      savedata: props.initialSavedata
    };
  }

  /**
   * Serializes the savedata and downloads it.
   * @param {Object} savedata
   */
  handleExport() {
    const saveDom = new DDDASaveDom();
    const text = saveDom.serialize(this.state.savedata);

    const save = new DDDASave(text);
    const data = save.serialize();

    const blob = new Blob([data], { type: 'application/octet-stream' });
    filesaver.saveAs(blob, 'DDDA.sav');
  }

  handleReset() {
    this.state = {
      savedata: this.props.initialSavedata
    };
  }

  handleCancel() {
    if (this.props.onCancel) {
      this.props.onCancel();
    }
  }

  handleChange(event) {
    // HACK
    this.state.savedata.mSteamID.value = event.target.value;
    this.setState({
      savedata: this.state.savedata
    });
  }

  render() {
    return (
      <div id="edit-panel" className="panel panel-primary">
        <div className="panel-heading">Edit</div>
        <div className="panel-body">
          {
            /*
            <ClassEditor data={this.state.savedata} />
            */
          }
          <div className="form-group form-inline">
            <label htmlFor="steamid">SteamId</label>
            <input id="steamid"
              type="text"
              name="steamid"
              className="form-control"
              value={this.state.savedata.mSteamID.value}
              onChange={this.handleChange}
            />
          </div>
          <div className="panel-footer">
            <button id="save-button" className="btn btn-primary" onClick={this.handleExport}>Save DDDA.sav</button>
            <button id="reset-button" className="btn btn-default" onClick={this.handleReset}>Reset</button>
            <button id="reset-button" className="btn btn-default" onClick={this.handleCancel}>Cancel</button>
          </div>
        </div>
      </div>
    );
  }
}
EditPanel.propTypes = {
  initialSavedata: React.PropTypes.object, // DDDAclass
  onCancel: React.PropTypes.func
};

export default EditPanel;
