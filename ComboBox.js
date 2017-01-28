/**
 * Pass the ComboBox an element like this:
 *
 ** var element = document.getElementsByClassName('ComboBox')[0];
 ** var cb = new ComboBox(element, false);
 *
 * the second argument (true/false) is optional, when set to true, the styling of the elements is all yours.
 * Find the project on Github for more information:
 * https://github.com/ThibaultJanBeyer/ComboBox.js
 */

var ComboBox = function(container, customStyles) {
  this.container = container;
  this.container.className += ' cb--container';
  this.input = container.getElementsByTagName('input')[0];
  this.input.className += ' cb--input';
  this.select = container.getElementsByTagName('select')[0];
  this.select.className += ' cb--select';

  var optionZero = document.createElement('option');
  optionZero.innerHTML = '---';
  this.select.insertBefore(optionZero, this.select.options[0]);

  this.options = this.select.options;
  this.select.value = this.options[0].innerHTML;
  this.select.value = [];
  for (var i = 0; i < this.options.length; i++) {
    var element = this.options[i];
    element.className += ' cb--option';
  }

  this.input.setAttribute('aria-label', 'Special inputfield with '+this.options.length+' prefilled options available, use the down arrow key to chose one or write your own text.');
  this.select.setAttribute('aria-hidden', 'true');

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
  } else if(code === 'Enter') {
    if (this.select.value != '') {
      e.preventDefault();
      this.input.value = this.select.value;
      this.hideSelect();
    }
  } else {
    this.handleWriting(e.target.value);
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
  if(code === 'Escape') {
    this.select.blur();
    this.input.focus();
  } else if(e.target.value.substring(0,3) != '---' && e.target.value != '') {
    this.input.value = e.target.value;
  } else if(e.target.value != '') { 
    this.input.value = e.target.value.substring(4, e.target.value.length);
  }
  if(code === 'Enter') {
    this.select.blur();
    this.input.focus();
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
  this.select.setAttribute('aria-hidden', 'true');
  this.select.style.pointerEvents = 'none';
  this.select.style.opacity = 0;
  this.select.tabIndex = -1;
  return this;
};

ComboBox.prototype.showSelect = function() {
  this.select.setAttribute('aria-hidden', 'false');
  this.select.style.pointerEvents = 'all';
  this.select.style.opacity = 1;
  this.select.tabIndex = 0;
  return this;
};

ComboBox.prototype.createVisualHint = function() {
  this.hint = document.createElement('span');
  this.hint.setAttribute('aria-hidden', 'true');
  this.hint.className = 'cb--hint';
  this.hint.innerHTML = '▼';
  this.container.insertBefore(this.hint, this.input);
};

ComboBox.prototype.setStyles = function() {
  this.container.style.display = 'inline-block';
  this.container.style.position = 'relative';
  this.input.style.boxSizing = 'border-box';
  this.input.style.height = '100%';
  this.input.style.width = '100%';
  this.select.style.border = '1px solid lightgrey';
  this.select.style.borderTop = '0';
  this.select.style.left = '0';
  this.select.style.opacity = '0';
  this.select.style.pointerEvents = '0';
  this.select.style.position = 'absolute';
  this.select.style.top = '100%';
  this.select.style.width = '100%';
  this.hint.style.fontSize = '8px';
  this.hint.style.pointerEvents = 'none';
  this.hint.style.position = 'absolute';
  this.hint.style.right = '5%';
  this.hint.style.top = '25%';
  
  // this is inportant to get a list instead of a dropdown
  this.select.size = 4;
};
