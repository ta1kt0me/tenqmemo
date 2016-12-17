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
      text: tag,
    });
    this.setState({ tags });
  }

  render() {
    return (
      <div>
        <ReactTags
          tags={this.state.tags}
          suggestions={this.state.suggestions}
          handleAddition={this.handleAddition}
          handleDelete={this.handleDelete}
          classNames={{
            suggestions: 'suggestions',
            tagInputField: 'tag-input-field form-control',
            tagInput: 'tag-input form-group',
            tag: 'label tag-label normal-font',
            remove: 'tag-remove',
          }}
        />
        {this.state.tags.map((tag, index) => {
          return <input key={'new_tag_'+index} name="note[tag_names][]" type="hidden" value={tag.text} />;
        })}
      </div>
    );
  }
}

export const Tag = (tags) =>
  ReactDOM.render(<Renderer tags={tags} />, document.getElementById('tag'));
