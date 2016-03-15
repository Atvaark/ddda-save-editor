import React from 'react';

class Vector3Editor extends React.Component {
  render() {
    return (
      <div>
        {this.props.data.x}
        {this.props.data.y}
        {this.props.data.z}
      </div>
    );
  }
}
Vector3Editor.propTypes = {
  data: React.PropTypes.object, // DDDAvector3
};

export default Vector3Editor;
