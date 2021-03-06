require('./dom-mock')('<html><body></body></html>');

var jsdom = require('mocha-jsdom');
var assert = require('assert');
var Toolbar = require('../src/toolbar.jsx').default;
var ReactTestUtils = require('react-dom/test-utils'); 


describe('<Toolbar />', function() {

  jsdom({ skipWindowCheck: true });

  before('render and locate element', function() {
    this.toolBar = ReactTestUtils.renderIntoDocument(
      <Toolbar />
    );

    this.inputElement = React.findDOMNode(this.toolBar);
  });

  it('should contain header', function() {
    var divText = ReactTestUtils.findRenderedDOMComponentWithTag(this.toolBar, 'h4');  
    assert.equal(divText.textContent, 'Toolbox');
  });

  it('should display default options when none are passed in', function() {
    assert.equal(this.inputElement.querySelector('ul').children.length, this.toolBar.state.items.length);
  });

  it('should display certain toolbar items that are passed in', function() {
    var items = [{
      key: 'Header',
      name: 'Header Text',
      icon: 'fa fa-header',
      static: true,
      content: 'Placeholder Text...'
    },
    {
      key: 'Paragraph',
      name: 'Paragraph',
      static: true,
      icon: 'fa fa-paragraph',
      content: 'Placeholder Text...'
    }];
    
    this.toolBar = ReactTestUtils.renderIntoDocument(
      <Toolbar items={items} />
    );

    this.inputElement = React.findDOMNode(this.toolBar);

    assert.equal(this.inputElement.querySelector('ul').children.length, items.length);
  })
});