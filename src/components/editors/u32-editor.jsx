import React from 'react';

class U32Editor extends React.Component {
  render() {
    return <div>{this.props.data.value}</div>;
  }
}
U32Editor.propTypes = {
  data: React.PropTypes.object, // DDDAu32
};

export default U32Editor;
