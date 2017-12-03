const assert = require('assert');
const { JSDOM } = require('jsdom');

import { shallow } from 'enzyme';
import { Renderer, Preview } from '../../app/frontend/javascripts/components/preview.js'

describe('Renderer', () => {
  it('has preview class', () => {
    const result = shallow(<Renderer body='hoge' />);
    assert(result.find('.preview').length === 1);
  });
});

describe('Preview', () => {
  it('has Preview component', () => {
    const obj = {body: 'foo'};
    document = new JSDOM('<!doctype html><html><body><div id="preview"></div></body></html>');
    Preview(obj);
    assert(document.querySelector('.preview').innerHTML === obj.body);
  });
});
