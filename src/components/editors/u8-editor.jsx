import React from 'react';

class U8Editor extends React.Component {
  render()
    return <div>{this.props.data.value}</div>;
  }
}
U8Editor.propTypes = {
  data: React.PropTypes.object, // DDDAu8
};

export default U8Editor;
