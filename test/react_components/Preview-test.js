const assert = require('assert');
import { shallow } from 'enzyme';
import { Renderer, Preview } from '../../app/assets/javascripts/preview'

describe('Renderer', () => {
  it('has preview class', () => {
    const result = shallow(<Renderer body='hoge' />);
    assert(result.find('.preview').length === 1);
  });
});

describe('Preview', () => {
  it('has Preview component', () => {
    const str = 'foo';
    document = jsdom('<!doctype html><html><body><div id="preview"></div></body></html>');
    Preview(str);
    assert(document.querySelector('.preview').innerHTML === str);
  });
});
