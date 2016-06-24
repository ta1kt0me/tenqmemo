const assert = require('assert');
import { shallow } from 'enzyme';
import { Textarea, Editor } from '../../app/assets/javascripts/editor';

describe('Textarea', () => {
  it('has textarea', () => {
    const result = shallow(<Textarea body='foo' />);
    assert(result.find('textarea').length === 1);
  });
});

describe('Editor', () => {
  it('has Editor component', () => {
    sinon.stub(Textarea.prototype, 'componentDidMount').returns(true);
    sinon.stub(Textarea.prototype, 'handleChange').returns(true);
    const str = 'foo';
    document = jsdom('<!doctype html><html><body><div id="editor"></div></body></html>');
    Editor(str);
    assert(document.querySelector('#editor textarea').innerHTML === str);
  });
});