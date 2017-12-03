import PropTypes from 'prop-types';
import React from 'react';

export default class UpLoadImageOnDrop extends React.Component {
  static get propTypes() {
    return {
      children: PropTypes.node.isRequired,
      beforeSend: PropTypes.func.isRequired,
      success: PropTypes.func.isRequired,
      error: PropTypes.func.isRequired,
    };
  }

  constructor(props) {
    super(props);
    this.handleDrop = this.handleDrop.bind(this);
  }

  handleDrop(event) {
    event.stopPropagation();
    event.preventDefault();

    const files = Array.from(event.dataTransfer.files);
    this.props.beforeSend(files);

    files.forEach((file) => {
      const filename = `${Date.now()}_${file.name}`;
      const form = new FormData();
      form.append('upload_image[file]', file, filename);

      Rails.ajax({
        type: 'POST',
        url: '/upload_images',
        dataType: 'json',
        data: form,
        success: this.props.success,
        error: this.props.error,
      });
    });
  }

  render() {
    return (
      <div onDrop={this.handleDrop}>
        {this.props.children}
      </div>
    );
  }
}
