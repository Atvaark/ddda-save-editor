import React from 'react';

class S32Editor extends React.Component {
  render() {
    return <div>{this.props.data.value}</div>;
  }
}
S32Editor.propTypes = {
  data: React.PropTypes.object, // DDDAs32
};

export default S32Editor;
