# ComboBox.js
ComboBox is a combination of input and select form-fields.

similar to the [datalist element in html5]([https://developer.mozilla.org/en/docs/Web/HTML/Element/datalist) or the [ComboBox dijit in dojo](https://dojotoolkit.org/reference-guide/1.10/dijit/form/ComboBox.html) but better:  
since it is written in plain vanilla JavaScript. It was written with accessibility in mind and also supports legacy browsers (as ie8).

|feature|**ComboBox.js**|datalist|dojo ComboBox|
|---|---|---|---|
|browser support|√|X|√|
|no dependency|√|√ (html5)|X (requires dojo)|
|lightweight|√|√|X|
|accessible|√|√|√|

try it out: https://thibaultjanbeyer.github.io/ComboBox.js/  
play with it: http://codepen.io/ThibaultJanBeyer/pen/rjLgEL

# Setup

##Add ComboBox.js to your project:

```html
<script src="https://thibaultjanbeyer.github.io/ComboBox.js/cb.min.js"></script>
```

##Write your html:
- (recommended) keep this structure
- (mandatory) make sure that there is a wrapping container

```html
<div id="MyComboBox">
  <input type="text">
    <select>
      <option>Black</option>
      <option>Blue</option>
      <option>Red</option> 
      <option>Orange</option>
    </select>
</div>
```

##Turn it into a ComboBox:
- (mandatory) Pass a single dom-node as first argument.
- (optional, not recommended) set the second argument to true for full style controll.

```javascript
var element = document.getElementById('MyComboBox');
var cb = new ComboBox(element, false);
```

Tadaaa! Enjoy your ComboBox :)  

![ComboBox Example](http://kit.thibaultjanbeyer.com//assets/github/ComboBox.gif)  

# Listening to changes (callback)

The ComboBox provides a cool way to listen for changes. Just use `.onSelect` like so:

```javascript
// grab element
var element = document.getElementById('MyComboBox');
// initiate the ComboBox
var cb = new ComboBox(element, false);
// listen for user selections
cb.onSelect(function(e) {
  // do stuff
  console.log(e);
});
// e is the ComboBox object. Thus:
// e.value is the selection as a string.
```

# Last Words

Don’t forget to star this repo and follow me on [github](https://github.com/ThibaultJanBeyer), [twitter](https://twitter.com/ThibaultBeyer) or [my blog](http://blog.thibaultjanbeyer.com) if you like the ComboBox.  
Found a bug? Open an [issue](https://github.com/ThibaultJanBeyer/ComboBox.js/issues) or make a pull requests!


