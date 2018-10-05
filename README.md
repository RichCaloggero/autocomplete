# Accessible Autocomplete ( typeahead ) widget

## Demos

- [demo (aria-activedescendant)](https://RichCaloggero.github.io/autocomplete/autocomplete-activedescendant.html)
- [demo (roving tabindex)](https://RichCaloggero.github.io/autocomplete/autocomplete.html)


I wrote this because I've found very few, if any, accessible autocomplete widgets in the wild, especially ones which support multiselect.

This is written in 100% native javascript (no frameworks or external libraries required).

## Required html

These classes add behavior to existing markup.  The markup you must include has the following form:

```
<div class="autocomplete" id="myAutocomplete">
<div class="combobox multiselect" id="myCombobox">
<!-- label any way you like; I always use wrapped labels if I can since it eliminates the need for IDs -->
<label>choose:
<input type="text">
</label>

<!-- add a wrapper with role of application if you like; it makes handling escape seemless, but produces a small extra announcement each time the list is focused -->
<div role="application">
<ul class="suggestions" role="listbox"></ul>
</div>

</div><!-- .combobox -->

<div class="message" aria-live="polite">
</div>
</div><!-- .autocomplete -->
```

### Events

- select or unselect on listbox option: bubbles
- change on listbox option: bubbles
- focusin on listbox option: bubbles
- done on autocomplete container: bubbles

### Required classes

- autocomplete: on the widget container
- combobox: on the combobox container (contains the input field and suggestions list)
- suggestions: on the suggestions list
- message: on the message container (also requires live region markup as shown above)


## Add appropriate CSS

Include the scripts as shown in the demo and style as appropriate.

