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

class Markdown extends React.Component {
  static get propTypes() {
    return {
      body: React.PropTypes.string,
    };
  }

  render() {
    return (
      <div className="row">
        <NoteTextArea body={this.props.body} />
      </div>
    );
  }
}

export const Editor = function Editor(body) {
  return ReactDOM.render(
    <Markdown body={body} />,
    document.getElementById('editor')
  );
};
