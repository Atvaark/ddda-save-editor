import React from 'react';

class TimeEditor extends React.Component {
  render() {
    return (
      <div>
        {this.props.data.year}
        {this.props.data.month}
        {this.props.data.day}
        {this.props.data.hour}
        {this.props.data.minute}
        {this.props.data.second}
      </div>
    );
  }
}
TimeEditor.propTypes = {
  data: React.PropTypes.object, // DDDAtime
};

export default TimeEditor;
