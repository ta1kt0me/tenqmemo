import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';

export class Textarea extends React.Component {
  static get propTypes() {
    return {
      body: PropTypes.string,
    };
  }

  componentDidMount() {
    App.note.preview(document.getElementById('note_body').value);
  }

  handleChange(event) {
    App.note.preview(event.target.value);
  }

  handleDrop(event) {
    console.log(event);
    event.stopPropagation();
    event.preventDefault();
  }

  render() {
    return (
      <div onDrop={this.handleDrop}>
        <textarea
          rows="35"
          className="form-control"
          data-behavior="writer"
          name="note[body]"
          id="note_body"
          onChange={this.handleChange}
          defaultValue={this.props.body}
        ></textarea>
      </div>
    );
  }
}

export const Editor = note =>
  ReactDOM.render(<Textarea body={note.body} />, document.getElementById('editor'));
