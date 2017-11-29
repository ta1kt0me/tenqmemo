import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';

export class Textarea extends React.Component {
  static get propTypes() {
    return {
      body: PropTypes.string,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      body: this.props.body,
    };
    this.handleChange = this.handleChange.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
  }

  componentDidMount() {
    App.note.preview(this.state.body);
  }

  handleChange(event) {
    this.setState({ body: event.target.value });
    App.note.preview(this.state.body);
  }

  handleDrop(event) {
    // TODO: loading
    const form = new FormData();
    Array.from(event.dataTransfer.files).forEach((f) => {
      form.append('upload_image[files][]', f, `${Date.now()}_${f.name}`);
    });

    Rails.ajax({
      type: 'POST',
      url: '/upload_images',
      dataType: 'json',
      data: form,
      success: (filenames) => {
        // TODO: replace value with url
        filenames.forEach((filename) => {
          console.log(filename);
        });
        console.log('success');
      },
      error: (error) => {
        // TODO: replace value with error message
        console.log(error);
        console.log('error');
      },
      complete: (xhr) => {
        console.log(xhr);
        console.log('complete');
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
