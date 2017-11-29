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
      body: this.props.body ? this.props.body : '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
    this.componentDidMount = this.componentDidMount.bind(this);
    this.updateBody = this.updateBody.bind(this);
  }

  componentDidMount() {
    App.note.preview(this.state.body);
  }

  updateBody(body) {
    this.setState({ body });
    App.note.preview(this.state.body);
  }

  handleChange(event) {
    this.updateBody(event.target.value);
  }

  handleDrop(event) {
    // TODO: loading
    const form = new FormData();
    const uploadFiles = Array.from(event.dataTransfer.files);
    const progressText = uploadFiles.map((f) => {
      const filename = `${Date.now()}_${f.name}`;
      form.append('upload_image[files][]', f, filename);
      return filename;
    }).map((name) => `![${name}](uploading...)`).join(`\n`);

    const progressBody = this.state.body.concat(`\n${progressText}`);
    this.updateBody(progressBody);

    Rails.ajax({
      type: 'POST',
      url: '/upload_images',
      dataType: 'json',
      data: form,
      success: (files) => {
        let body = this.state.body;
        files.forEach((file) => {
          body = body.replace(
            `![${file.name}](uploading...)`,
            `![${file.name}](${file.url})`
          );
        });
        this.updateBody(body);
      },
      error: (error) => {
        // TODO: replace value with error message
        console.log(error);
        console.log('error');
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
          value={this.state.body}
        ></textarea>
      </div>
    );
  }
}

export const Editor = note =>
  ReactDOM.render(<Textarea body={note.body} />, document.getElementById('editor'));
