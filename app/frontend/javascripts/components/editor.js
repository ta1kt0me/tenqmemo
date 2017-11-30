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
    const uploadFiles = Array.from(event.dataTransfer.files);
    const progressText = new Array(uploadFiles.length).fill('![uploading...]()').join(`\n`);
    const progressBody = this.state.body.concat(`\n${progressText}`);
    this.updateBody(progressBody);

    uploadFiles.forEach((file) => {
      const filename = `${Date.now()}_${file.name}`;
      const form = new FormData();
      form.append('upload_image[file]', file, filename);

      Rails.ajax({
        type: 'POST',
        url: '/upload_images',
        dataType: 'json',
        data: form,
        success: (uploadedFile) => {
          let body = this.state.body;
          body = body.replace(
            '![uploading...]()',
            `![${uploadedFile.name}](${uploadedFile.url})`
          );
          this.updateBody(body);
        },
        error: (error) => {
          let body = this.state.body;
          body = body.replace(
            '![uploading...]()',
            `Fail uploading file because ${error} :-(`
          );
          this.updateBody(body);
        },
      });
      event.stopPropagation();
      event.preventDefault();
    });
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
