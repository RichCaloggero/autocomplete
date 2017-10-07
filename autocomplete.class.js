class AutocompleteBehavior {
constructor (element, items) {
this.container = element;
this.combobox = new ComboboxBehavior (this.container.querySelector(".combobox"));
if (element.classList.contains("multiselect")) this.combobox.container.classList.add("multiselect");
this.items = [];
this.addItems (items);

this.combobox.input.addEventListener ("input", e => {
let matches = this.filter (e.target.value, "pre");

if (matches.length) {
this.combobox.clear ();
matches.forEach (item => this.combobox.addItem(item));
} // if
this.message (`${matches.length} matches`);
});
} // constructor

addItems (list) {
this.items = list.slice();
list.forEach (item => this.combobox.addItem (item));
} // this.addItems

filter (match, prefix, retainCase) {
if (! retainCase) match = match.toLowerCase();
return this.items.filter(item => {
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
