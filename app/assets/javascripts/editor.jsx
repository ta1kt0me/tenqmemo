import React from 'react'
import ReactDOM from 'react-dom'

var NoteTextArea = React.createClass({
  componentDidMount: function(event){
    App.note.preview(document.getElementById('note_body').value);
  },

  handleChange: function(event) {
    App.note.preview(event.target.value);
  },

  render: function(){
    return (
      <div className="col-md-6">
        <div className="form-group is-empty">
          <label className="control-label">Body</label>
          <textarea rows="35" className="form-control" data-behavior="writer" name="note[body]" id="note_body" onChange={this.handleChange} defaultValue={this.props.body}></textarea>
          <span className="material-input" />
        </div>
      </div>
    )
  }
});

var Preview = React.createClass({
  getInitialState: function(){
    return { text: this.props.body };
  },

  update: function(val){
    this.setState({text: val})
  },

  render: function(){
    return (
      <div className="col-md-6">
        <div className="form-group">
          <label className="control-label">Preview</label>
          <div className="preview" dangerouslySetInnerHTML={{__html: this.state.text}}></div>
        </div>
      </div>
    )
  }
});

var Markdown = React.createClass({
	render: function(){
    return (
      <div className="row">
        <NoteTextArea {...this.props}/>
        <Preview ref="preview" {...this.props} />
      </div>
    )
  }
})

export class Editor {
	constructor (element, props = {}) {
		this.element = element
		this._props = props
	}
	get props () {
		return this._props
	}
	set props (props) {
		Object.assign(this._props, props)
		return this.render()
	}
	render () {
		return ReactDOM.render(
			<Markdown {...this.props} />, this.element
		)
	}
}
