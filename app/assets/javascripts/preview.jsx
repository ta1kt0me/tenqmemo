import React from 'react';
import ReactDOM from 'react-dom';

const View = ({ body }) => (
  <div className="col-md-6">
    <div className="form-group">
      <label className="control-label">Preview</label>
      <div
        className="preview"
        dangerouslySetInnerHTML={{ __html: body }}
      ></div>
    </div>
  </div>
);

View.propTypes = {
  body: React.PropTypes.string,
};

class Markdown extends React.Component {
  static get propTypes() {
    return {
      body: React.PropTypes.string,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      body: this.props.body,
    };
  }

  update(val) {
    this.setState({ body: val });
  }

  render() {
    return (
      <div className="row">
        <View body={this.state.body} />
      </div>
    );
  }
}

export const Preview = function Preview(body) {
  return ReactDOM.render(
    <Markdown body={body} />,
    document.getElementById('preview')
  );
};
