# Accessible Autocomplete ( typeahead ) widget

## Demo

[demo] (https://RichCaloggero.github.io/autocomplete/autocomplete.html)


I wrote this because I've found very few, if any, accessible autocomplete widgets in the wild, especially ones which support multiselect.

This is written in 100% native javascript (no frameworks or external libraries required).

## Required html

These classes add behavior to existing markup.  The markup you must include has the following form:

```
<div class="autocomplete" id="myAutocomplete">
<div class="combobox multiselect" id="myCombobox">
<label>choose:
<input type="text">
</label>

<ul class="suggestions" role="listbox"></ul>
</div><!-- .combobox -->

<div class="message" aria-live="polite">
</div>
</div><!-- .autocomplete -->
```

### Required classes

- autocomplete: on the widget container
- combobox: on the combobox container (contains the input field and suggestions list)
- suggestions: on the suggestions list
- message: on the message area


## Add appropriate CSS

Include the scripts as shown in the demo and style as appropriate.



