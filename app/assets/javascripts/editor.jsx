import React from 'react';
import ReactDOM from 'react-dom';

class NoteTextArea extends React.Component {
  static get propTypes() {
    return {
      body: React.PropTypes.string,
    };
  }

  componentDidMount() {
    App.note.preview(document.getElementById('note_body').value);
  }

  handleChange(event) {
    App.note.preview(event.target.value);
  }

  render() {
    return (
      <div className="col-md-6">
        <div className="form-group is-empty">
          <label className="control-label">Body</label>
          <textarea
            rows="35"
            className="form-control"
            data-behavior="writer"
            name="note[body]"
            id="note_body"
            onChange={this.handleChange}
            defaultValue={this.props.body}
          ></textarea>
          <span className="material-input" />
        </div>
      </div>
    );
  }
}

const Preview = ({ body }) => (
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

Preview.propTypes = {
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
        <NoteTextArea body={this.props.body} />
        <Preview body={this.state.body} />
      </div>
    );
  }
}

export const Editor = function Editor(body) {
  return ReactDOM.render(
    <Markdown body={body} />,
    document.getElementById('target')
  );
};
