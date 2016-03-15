import React from 'react';

class U64Editor extends React.Component {
  render() {
    return <div>{this.props.data.value}</div>;
  }
}
U64Editor.propTypes = {
  data: React.PropTypes.object, // DDDAu64
};

export default U64Editor;
