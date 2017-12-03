import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';
import UploadImageOnDrop from './uploadImageOnDrop';

export class Textarea extends React.Component {
  static get propTypes() {
    return {
      body: PropTypes.string.isRequired,
    };
  }

  static progressText() {
    return '![uploading...]()';
  }

  constructor(props) {
    super(props);
    this.state = {
      body: this.props.body ? this.props.body : '',
    };
    this.handleChange = this.handleChange.bind(this);
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

  handleDropBeforeSend(files) {
    const progressBody = new Array(files.length).fill(Textarea.progressText()).join('\n');
    this.updateBody(this.state.body.concat(`\n${progressBody}`));
  }

  handleDropSuccess(data) {
    let { body } = this.state;
    body = body.replace(
      Textarea.progressText(),
      `![${data.name}](${data.url})`,
    );
    this.updateBody(body);
  }

  handleDropError(error) {
    let { body } = this.state;
    body = body.replace(
      Textarea.progressText(),
      `Fail uploading file because ${error} :-(`,
    );
    this.updateBody(body);
  }

  render() {
    return (
      <UploadImageOnDrop
        success={this.handleDropSuccess}
        error={this.handleDropError}
        beforeSend={this.handleDropBeforeSend}
      >
        <textarea
          rows="35"
          className="form-control"
          data-behavior="writer"
          name="note[body]"
          id="note_body"
          onChange={this.handleChange}
          value={this.state.body}
        />
      </UploadImageOnDrop>
    );
  }
}

export const Editor = note =>
  ReactDOM.render(<Textarea body={note.body} />, document.getElementById('editor'));
