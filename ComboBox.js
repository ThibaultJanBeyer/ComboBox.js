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

  this.value = this.input.value;

  var optionZero = document.createElement('option');
  optionZero.innerHTML = '---';
  this.select.insertBefore(optionZero, this.select.options[0]);

  this.options = this.select.options;
  for (var i = 0; i < this.options.length; i++) {
    var element = this.options[i];
    element.className += ' cb--option';
  }

  this.input.setAttribute('aria-label', 'Special inputfield with '+this.options.length+' prefilled options available, use the down/up arrow keys to chose one or write your own text.');
  this.select.setAttribute('aria-hidden', 'true');

  this.addEventListeners();
  this.createVisualHint();

  this.hideSelect();
  if(!customStyles) this.setStyles();
};

ComboBox.prototype.addEventListeners = function() {
  this.input.addEventListener('focus', this.showSelect.bind(this));
  this.input.addEventListener('blur', this.hideSelect.bind(this));
  this.input.addEventListener('keyup', this.handleInput.bind(this));

  this.select.addEventListener('focus', this.showSelect.bind(this));
  this.select.addEventListener('change', this.handleSelection.bind(this));
  this.select.addEventListener('keydown', this.handleSelection.bind(this));
  this.select.addEventListener('click', function(e) { this.handleSelection(e, 'click'); }.bind(this));
  this.select.addEventListener('blur', function(e) {
    this.hideSelect();

    if(!this.preventTriggerSelection) {
    this.triggerSelection();
    } else { 
      this.preventTriggerSelection = false;
    }

  }.bind(this));

  return this;
};

ComboBox.prototype.handleInput = function(e) {
  var code = this.getKey(e);
  if(code === 'ArrowDown') {
    this.handleWriting(e.target.value);
    this.select.focus();
  } else if(code === 'Escape') {
    this.hideSelect();
  } else if(code === 'Enter' && !this.preventDoubleEnter) {
    this.setValue(this.select.value, 'hideSelect');
    this.triggerSelection('force');
  } else {
    this.preventDoubleEnter = false;
    this.handleWriting(this.input.value);
  }

  return this;
};

ComboBox.prototype.handleWriting = function(text) {
  this.value = text;
  var option = this.isTextInOptions(text, this.options);
  if(option && text != '') {
    this.setOptionZero(text);
    this.select.value = option;

    // if the text is absolutely equal to the option, trigger a selection
    if(text.length === option.length) this.triggerSelection();
  } else {
    this.select.value = this.setOptionZero(text);
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

ComboBox.prototype.setOptionZero = function(text) {
  var setText = (text != '') ? '--- ' + text : '---';
  this.options[0].innerHTML = setText;
  return setText;
};

ComboBox.prototype.handleSelection = function(e, click) {
  var code = this.getKey(e);
  if(code === 'Escape') {
    this.preventTriggerSelection = true;
    this.setValue(this.options[0].value, 'hideSelect');
    // the selection might have changed by user, so to reset
    // the preselection we have to check the input text again
    this.handleWriting(this.value);
  } else if(code === 'Enter') {
    this.preventDoubleEnter = true;
    this.setValue(e.target.value, 'hideSelect');
  } else {
    this.setValue(e.target.value, false);
  }

  if(click) this.triggerSelection('force');

  return this;
};

ComboBox.prototype.setValue = function(value, hideSelect) {
  if(!value || value == '') return this;  // do nothing if value is empty

  if(value.substring(0, 3) != '---') {  // check if value is not the fallback option
    this.input.value = value;
  } else {  // if it is, don’t add the '--- '
    this.input.value = value.substring(4, value.length);
  }

  if(hideSelect) {
    this.input.focus();
    this.hideSelect();
  }

  this.value = this.input.value;

  return this;
};

ComboBox.prototype.getKey = function(e) {
  if(!e) return false;

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
  this.container.style.overflow = 'hidden';
  this.select.style.top = '0';
  this.select.style.left = '-10000px';
  this.select.style.pointerEvents = 'none';
  this.select.style.opacity = 0;

  return this;
};

ComboBox.prototype.showSelect = function() {
  this.select.setAttribute('aria-hidden', 'false');
  this.container.style.overflow = 'visible';
  this.select.style.top = '100%';
  this.select.style.left = '0';
  this.select.style.pointerEvents = 'all';
  this.select.style.opacity = 1;

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
  this.container.style.verticalAlign = 'top';
  this.container.style.position = 'relative';
  this.container.style.overflow = 'hidden';
  this.input.style.boxSizing = 'border-box';
  this.input.style.height = '100%';
  this.input.style.width = '100%';
  this.select.style.border = '1px solid lightgrey';
  this.select.style.borderTop = '0';
  this.select.style.position = 'absolute';
  this.select.style.top = '100%';
  this.select.style.width = '100%';
  this.hint.style.fontSize = '8px';
  this.hint.style.pointerEvents = 'none';
  this.hint.style.position = 'absolute';
  this.hint.style.right = '5%';
  this.hint.style.top = '50%';
  this.hint.style.lineHeight = '0.1';

  // this makes the down arrow key the only way to select the dropdown via keyboard
  this.select.tabIndex = -1;
  // this is inportant to get a list instead of a dropdown
  this.select.size = 4;
};

// setup the onSelect handler passed by user
ComboBox.prototype.onSelect = function(cb) {
  this.cb = cb;
  this.handleInput(this.value);
  return this;
};

ComboBox.prototype.triggerSelection = function(force) {
  if(force || this.value !== this.previousValue) {
    this.cb(this);
    this.previousValue = this.value;
  }

  return this;
};
