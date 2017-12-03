import React from 'react';
import { shallow } from 'enzyme';
import { Textarea, Editor } from '../../app/frontend/javascripts/components/editor';

const assert = require('assert');
const { JSDOM } = require('jsdom');

describe('Textarea', () => {
  before(() => sinon.stub(Textarea.prototype, 'componentDidMount').returns(true));
  after(() => Textarea.prototype.componentDidMount.restore());

  it('has textarea', () => {
    const result = shallow(<Textarea body="foo" />);
    assert(result.find('textarea').length === 1);
  });
});

describe('Editor', () => {
  before(() => {
    sinon.stub(Textarea.prototype, 'componentDidMount').returns(true);
    sinon.stub(Textarea.prototype, 'handleChange').returns(true);
  });

  after(() => {
    Textarea.prototype.handleChange.restore();
    Textarea.prototype.componentDidMount.restore();
  });

  it('has Editor component', () => {
    const obj = { body: 'foo' };
    document = new JSDOM('<!doctype html><html><body><div id="editor"></div></body></html>').window.document;
    Editor(obj);
    assert(document.querySelector('#editor textarea').innerHTML === obj.body);
  });
});
