import React from 'react';
import ReactDOM from 'react-dom';
import { WithContext as ReactTags } from 'react-tag-input';

export class Renderer extends React.Component {
  static get propTypes() {
    return {
      tags: React.PropTypes.array,
    };
  }

  constructor(props) {
    super(props);
    this.state = {
      tags: this.props.tags,
      suggestions: ['foo', 'bar', 'baz', 'dooo'],
    };
    this.handleAddition = this.handleAddition.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(i) {
    const tags = this.state.tags;
    tags.splice(i, 1);
    this.setState({ tags });
  }

  handleAddition(tag) {
    const tags = this.state.tags;
    tags.push({
      id: tags.length + 1,
      text: tag,
    });
    this.setState({ tags });
  }

  render() {
    return (
      <div>
        <ReactTags
          tags={this.state.tags}
          suggestion={this.state.suggestions}
          handleAddition={this.handleAddition}
          handleDelete={this.handleDelete}
          classNames={{
            tagInput: 'tag-input',
            tag: 'label tag-label',
            remove: 'tag-remove',
          }}
        />
      </div>
    );
  }
}

export const Tag = (tags) =>
  ReactDOM.render(<Renderer tags={tags} />, document.getElementById('tag'));
