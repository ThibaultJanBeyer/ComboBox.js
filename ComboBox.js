/**
 * Pass the ComboBox an element like this:
 *
 ** var element = document.getElementsByClassName('ComboBox')[0];
 ** var cb = new ComboBox(element, false);
 *
 * the second argument (true/false) is optional, when set to true, the styling of the elements is all yours.
 */

var ComboBox = function(container, customStyles) {
  this.container = container;
  this.container.className += ' cb--container';
  this.input = container.getElementsByTagName('input')[0];
  this.input.className += ' cb--input';
  this.select = container.getElementsByTagName('select')[0];
  this.select.className += ' cb--select';
  this.options = this.select.options;
  this.select.value = this.options[0].innerHTML;
  this.select.value = [];

  this.hideSelect();
  this.addEventListeners();
  this.createVisualHint();

  if(!customStyles) this.setStyles();
};

ComboBox.prototype.addEventListeners = function() {
  this.input.addEventListener('focus', this.showSelect.bind(this));
  this.input.addEventListener('blur', this.hideSelect.bind(this));
  this.input.addEventListener('keyup', this.handleInput.bind(this));
  this.select.addEventListener('focus', this.showSelect.bind(this));
  this.select.addEventListener('blur', this.hideSelect.bind(this));
  this.select.addEventListener('change', this.handleSelection.bind(this));
  this.select.addEventListener('keypress', this.handleSelection.bind(this));
  this.select.addEventListener('click', this.handleSelection.bind(this));

  return this;
};

ComboBox.prototype.handleInput = function(e) {
  var code = this.getKey(e);
  if(code === 'ArrowDown') {
    this.select.focus();
  } else if(code === 'Escape') {
    this.hideSelect();
  } else {
    this.handleWriting(e.target.value)
  }

  return this;
};

ComboBox.prototype.handleWriting = function(text) {
  var option = this.isTextInOptions(text, this.options);
  if(option && text != '') {
    this.select.value = option;
  } else {
    var setText = (text != '') ? '--- ' + text : '---';
    this.options[0].innerHTML = setText;
    this.select.value = setText;
    this.select.value = [];
  }

  return this;
};

ComboBox.prototype.isTextInOptions = function(text, options) {
  for(var i = 1, il = options.length; i < il; i++) {
    if(text.toLowerCase() == options[i].value.substring(0, text.length).toLowerCase()) {
      return options[i].innerHTML;
    }
  }
  return false;
};

ComboBox.prototype.handleSelection = function(e) {
  var code = this.getKey(e);
  if(code === 'Enter' || code === 'Escape') {
    this.select.blur();
  } else if(e.target.value.substring(0,3) != '---') {
    this.input.value = e.target.value;
  } else {
    this.input.value = e.target.value.substring(4, e.target.value.length);
  }

  return this;
};

ComboBox.prototype.getKey = function(e) {
  if(e.key === 'Enter' || e.code === 'Enter' || e.keyCode === 13) {
    return 'Enter';
  } else if(e.key === 'Escape' || e.code === 'Escape' || e.keyCode === 27) {
    return 'Escape';
  } else if(e.key === 'ArrowDown' || e.code === 'ArrowDown' || e.keyCode === 40) {
    return 'ArrowDown';
  }
};

ComboBox.prototype.hideSelect = function() {
  this.select.style.opacity = 0;
  this.select.tabIndex = -1;
  return this;
};

ComboBox.prototype.showSelect = function() {
  this.select.style.opacity = 1;
  this.select.tabIndex = 0;
  return this;
};

ComboBox.prototype.createVisualHint = function() {
  this.hint = document.createElement('span');
  this.hint.className = 'cb--hint';
  this.hint.innerHTML = '▼';
  this.container.insertBefore(this.hint, this.input);
};

ComboBox.prototype.setStyles = function() {
  this.container.style =
    'display: inline-block;'+
    'position: relative;';
  this.input.style =
    'box-sizing: border-box;'+
    'height: 100%;'+
    'width: 100%;';
  this.select.style =
    'border: 1px solid lightgrey;'+
    'border-top: 0;'+
    'left: 0;'+
    'opacity: 0;'+
    'position: absolute;'+
    'top: 100%;'+
    'width: 100%;';
  this.hint.style = 
    'font-size: 8px;'+
    'pointer-events: none;'+
    'position: absolute;'+
    'right: 5px;'+
    'top: 5px;';
  
  // this is inportant to get a list instead of a dropdown
  this.select.size = 4;
};
