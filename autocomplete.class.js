class AutocompleteBehavior {
constructor (element, items) {
if (! element) {
alert ("autocomplete: no DOM element given");
return;
} // if

if (! items) {
alert ("autocomplete: no item list given");
return;
} // if

this.container = element;
this.immediate = this.container.classList.contains ("immediate");

this.combobox = new ComboboxBehavior (this.container.querySelector(".combobox"));
if (this.container.classList.contains("multiselect")) this.combobox.container.classList.add("multiselect");
this.items = [];
this.addItems (items);

//this.combobox.container.addEventListener ("cancel", () => items.forEach(item => this.combobox.addItem(item)));

this.combobox.input.addEventListener ("input", e => {
let userInput = e.target.value.toLowerCase().trimLeft();
let matches = this.filter (userInput, "pre");
this.combobox.clear ();

if (userInput) {
if (matches.length > 0) {
matches.forEach (item => this.combobox.addItem(item));
this.combobox.showList ();
} // if

if (! this.combobox.isMultiselect() && this.immediate && matches.length === 1) this.combobox.activateFirstItem ();
this.message (`${matches.length} matches`);

} else {
this.combobox.hideList ();
} // if
}); // input handler
} // constructor

addItems (list) {
this.items = list.slice();
} // this.addItems

addAllToList () {
this.items.forEach (item => this.combobox.addItem (item));
} // addAllToList

filter (match, prefix, retainCase) {
if (! match) return [];
if (! retainCase) match = match.toLowerCase();
return this.items.filter(item => {
item = item.trim();
if (! retainCase) item = item.toLowerCase();
return (prefix? item.startsWith (match) : item.includes(match));

}); // filter
} // this.filter

valueOf () {
return this.combobox.valueOf ();
} // this.valueOf

message (text) {
this.container.querySelector (".message").innerHTML = text;
} // this.message

} // class AutocompleteBehavior
