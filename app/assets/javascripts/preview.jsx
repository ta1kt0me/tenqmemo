import React from 'react';
import ReactDOM from 'react-dom';

export class Renderer extends React.Component {
  static get propTypes() {
    return {
      body: React.PropTypes.string,
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
        dangerouslySetInnerHTML={{ __html: this.state.body }}
      ></div>
    );
  }
}

export const Preview = (post) => {
  return ReactDOM.render(
    <Renderer body={post.body} />,
    document.getElementById('preview')
  );
};
