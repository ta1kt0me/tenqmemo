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
    const form = new FormData();
    Array.from(event.dataTransfer.files).forEach((f) => {
      form.append('files[]', f, `${Date.now()}_${f.name}`);
    });
    $.ajax('/images', {
      method: 'post',
      data: form,
      processData: false,
      success: (data, status, xhr) => {
        console.log("success")
      },
      error: (xhr, status, error) => {
        console.log("error")
      },
      complete: (xhr, status) => {
        console.log("complete")
      },
    });
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
