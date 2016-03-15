import React from 'react';

class BoolEditor extends React.Component {
  render() {
    return <div>{this.props.data.value}</div>;
  }
}
BoolEditor.propTypes = {
  data: React.PropTypes.object, // DDDAbool
};

export default BoolEditor;
