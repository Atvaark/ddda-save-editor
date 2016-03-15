import React from 'react';

class S8Editor extends React.Component {
  render() {
    return <div>{this.props.data.value}</div>;
  }
}
S8Editor.propTypes = {
  data: React.PropTypes.object, // DDDAs8
};

export default S8Editor;
