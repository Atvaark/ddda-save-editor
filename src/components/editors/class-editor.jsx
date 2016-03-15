import React from 'react';

// import U64Editor from 'components/editors/u64-editor.jsx';

class ClassEditor extends React.Component {
  renderMember(member) {
    switch (member.elementName) {
      // case 'u64': return <U64Editor key={member.name} data={member} />;
      case 'class': return <ClassEditor key={member.name} data={member} />;
      default: return <div key={member.name} >{member.elementName} {member.name} {member.toString()}</div>;
    }
  }

  render() {
    const members = this.props.data.members.map(m => this.renderMember(m));
    return (
      <div className="panel panel-default">
        <div className="panel-heading">{this.props.data.type}</div>
        <div className="panel-body">
          {members}
        </div>
      </div>);
  }
}
ClassEditor.propTypes = {
  data: React.PropTypes.object, // DDDAclass
};

export default ClassEditor;
