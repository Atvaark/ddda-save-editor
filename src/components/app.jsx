import React from 'react';

import ImportPanel from 'components/import-panel.jsx';
import EditPanel from 'components/edit-panel.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleImport = this.handleImport.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.state = {
      savedata: null
    };
  }

  handleImport(savedata) {
    this.setState({
      savedata
    });
  }

  handleCancel() {
    this.setState({
      savedata: null
    });
  }

  render() {
    return (
      <div>
        <div className="page-header">
            <h1>ddda-save-editor <small>Dragon's Dogma: Dark Arisen savegame editor</small></h1>
        </div>
        {
          this.state.savedata
            ? <EditPanel initialSavedata={this.state.savedata} onCancel={this.handleCancel} />
            : <ImportPanel onImport={this.handleImport} />
        }
      </div>
    );
  }
}

export default App;
