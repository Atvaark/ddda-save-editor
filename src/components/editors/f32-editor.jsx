import React from 'react';

class F32Editor extends React.Component {
  render() {
    return <div>{this.props.data.value}</div>;
  }
}
F32Editor.propTypes = {
  data: React.PropTypes.object, // DDDAf32
};

export default F32Editor;
