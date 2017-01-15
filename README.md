# ComboBox.js
ComboBox is a combination of input and select form-fields.

similar to the [datalist element in html5]([https://developer.mozilla.org/en/docs/Web/HTML/Element/datalist) or the [ComboBox dijit in dojo](https://dojotoolkit.org/reference-guide/1.10/dijit/form/ComboBox.html) but better:  
since it is written in vanilla.js also supporting legacy browsers.

|feature|**ComboBox.js**|datalist|dojo ComboBox|
|---|---|---|---|
|browser support|√|X|√|
|native code|√ (vanillajs)|√ (html5)|X (requires dojo)|
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

```javascript
var element = document.getElementById('MyComboBox');
var cb = new ComboBox(element, false);
```

Tadaaa! Enjoy your ComboBox :)



# Last Words

Don’t forget to star this repo and follow me on [github](https://github.com/ThibaultJanBeyer), [twitter](https://twitter.com/ThibaultBeyer) or [my blog](http://blog.thibaultjanbeyer.com) if you like the ComboBox.  
Found a bug? Open an [issue](https://github.com/ThibaultJanBeyer/ComboBox.js/issues) or make a pull requests!


