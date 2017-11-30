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
    this.handleDropSuccess = this.handleDropSuccess.bind(this);
    this.handleDropError = this.handleDropError.bind(this);
    this.handleDropBeforeSend = this.handleDropBeforeSend.bind(this);
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

  progressText() {
    return '![uploading...]()';
  }

  handleDropBeforeSend(files) {
    const progressBody = new Array(files.length).fill(this.progressText()).join(`\n`);
    this.updateBody(this.state.body.concat(`\n${progressBody}`));
  }

  handleDropSuccess(data) {
    let body = this.state.body;
    body = body.replace(
      this.progressText(),
      `![${data.name}](${data.url})`
    );
    this.updateBody(body);
  }

  handleDropError(error) {
    let body = this.state.body;
    body = body.replace(
      this.progressText(),
      `Fail uploading file because ${error} :-(`
    );
    this.updateBody(body);
  }

  handleDrop(event) {
    event.stopPropagation();
    event.preventDefault();

    const files = Array.from(event.dataTransfer.files);
    this.handleDropBeforeSend(files);

    files.forEach((file) => {
      const filename = `${Date.now()}_${file.name}`;
      const form = new FormData();
      form.append('upload_image[file]', file, filename);

      Rails.ajax({
        type: 'POST',
        url: '/upload_images',
        dataType: 'json',
        data: form,
        success: this.handleDropSuccess,
        error: this.handleDropError,
      });
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
