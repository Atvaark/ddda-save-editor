import React from 'react';

class S64Editor extends React.Component {
  render() {
    return <div>{this.props.data.value}</div>;
  }
}
S64Editor.propTypes = {
  data: React.PropTypes.object, // DDDAs64
};

export default S64Editor;
