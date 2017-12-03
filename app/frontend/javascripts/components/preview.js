import PropTypes from 'prop-types';
import React from 'react';
import ReactDOM from 'react-dom';

export class Renderer extends React.Component {
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
  }

  update(val) {
    this.setState({ body: val });
  }

  render() {
    return (
      <div
        className="preview"
        dangerouslySetInnerHTML={{ __html: this.state.body }} // eslint-disable-line react/no-danger
      />
    );
  }
}

export const Preview = post =>
  ReactDOM.render(<Renderer body={post.body} />, document.getElementById('preview'));
