import React from 'react';

class StringEditor extends React.Component {
  render() {
    return <div>{this.props.data.value}</div>;
  }
}
StringEditor.propTypes = {
  data: React.PropTypes.object, // DDDAstring
};

export default StringEditor;
