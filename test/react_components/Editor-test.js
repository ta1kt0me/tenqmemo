const assert = require('assert');
const { JSDOM } = require('jsdom');
import { shallow } from 'enzyme';
import { Textarea, Editor } from '../../app/frontend/javascripts/components/editor.js';

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
    const obj = { body: 'foo' };
    document = new JSDOM(`<!doctype html><html><body><div id="editor"></div></body></html>`).window.document;
    Editor(obj);
    assert(document.querySelector('#editor textarea').innerHTML === obj.body);
  });
});
