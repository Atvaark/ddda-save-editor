import React from 'react';

class S16Editor extends React.Component {
  render() {
    return <div>{this.props.data.value}</div>;
  }
}
S16Editor.propTypes = {
  data: React.PropTypes.object, // DDDAs16
};

export default S16Editor;
