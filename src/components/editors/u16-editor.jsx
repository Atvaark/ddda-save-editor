import React from 'react';

class U16Editor extends React.Component {
  render() {
    return <div>{this.props.data.value}</div>;
  }
}
U16Editor.propTypes = {
  data: React.PropTypes.object, // DDDAu16
};

export default U16Editor;
