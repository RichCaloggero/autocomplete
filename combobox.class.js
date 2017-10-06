class ComboboxBehavior {
constructor (element) {
this.combobox = element;
this.listbox = this.combobox.querySelector (".suggestions");
this.input = this.combobox.querySelector ("input");

this.active_id = this.combobox.id + "-activedescendant";
this.listbox.id = this.combobox.id + "-this.listbox";
this.listbox.style.listStyle = "none";

this.input.addEventListener ("keydown", e => this.navigateInput(e));
this.input.setAttribute ("role", "combobox");
this.input.setAttribute ("aria-expanded", "false");

this.listbox.addEventListener ("keydown", e => this.navigateList(e));
this.listbox.setAttribute ("role", "listbox");

this.close ();
} // constructor

/// methods

navigateInput (e) {
switch (e.key) {
case "ArrowUp":
if (this.isMultiselect()) {
this.focusLastItem ();
} else {
this.selectItem (this.focusLastItem());
} // if
break;

case "ArrowDown":
if (this.isMultiselect()) {
this.focusFirstItem ();
} else {
this.selectItem (this.focusFirstItem());
} // if
break;

default: return true;
} // switch

this.open ();
return false;
} // this.navigateInput

navigateList (e) {
switch (e.key) {
case "Enter":
this.input.value = this.valueOf();
this.close ();
this.trigger ("value");
return false;

case "Escape":
this.input.value = "";
this.close ();
return false;

case " ": // space key
if (this.isMultiselect()) this.selectItem (this.focusedItem(), "toggle");
return false;

case "ArrowUp":
if (this.isMultiselect()) {
this.focusItem (this.previous());
} else {
this.selectItem (this.focusItem (this.previous()));
} // if
return false;

case "ArrowDown":
if (this.isMultiselect()) {
this.focusItem (this.next());
} else {
this.selectItem (this.focusItem (this.next()));
} // if
return false;

default:  return true;
} // switch
} // navigateList

open () {
this.listbox.classList.remove("hidden");
this.input.setAttribute ("aria-controls", this.listbox.id);
this.input.setAttribute ("aria-expanded", "true");
//this.input.setAttribute ("aria-activedescendant", active_id);
this.listbox.querySelector ("[aria-selected]").focus ();
} // this.open

close () {
this.listbox.classList.add("hidden");
this.input.removeAttribute ("aria-controls");
this.input.setAttribute ("aria-expanded", "false");
//this.input.removeAttribute ("aria-activedescendant");
this.input.focus ();
} // this.close

addItem (text) {
if (text) {
let item = document.createElement ("li");
item.textContent = text;
item.setAttribute ("role", "option");
item.setAttribute ("aria-selected", "false");

if (this.listbox.children.length > 0) item.setAttribute ("tabindex", "-1");
else item.setAttribute ("tabindex", "0");
this.listbox.appendChild (item);
} // if
} // this.addItem

next (wrap) {
let item = this.focusedItem() || this.listbox.firstElementChild;
return item.nextElementSibling
|| (wrap? this.listbox.firstElementChild : null);
} // this.next

previous (wrap) {
let item = this.focusedItem() || this.listbox.firstElementChild;
return item.previousElementSibling
|| (wrap? this.listbox.lastElementChild : null);
} // this.previous

selectedItems () {
return Array.from(this.listbox.querySelectorAll ("[aria-selected='true']"));
} // this.selectedItems

selectItem (item, toggle) {
if (item) {
if (toggle) {
item.setAttribute ("aria-selected",
item.getAttribute ("aria-selected") === "true"? "false" : "true"
); // setAttribute
} else {
this.unselectAll ();
item.setAttribute ("aria-selected", "true");
} // if

this.trigger ("select", item);
} // if

return item || null;
} // this.selectItem

focusedItem () {
return this.listbox.querySelector ("[tabindex='0']");
} // this.focusedItem 

focusItem (item) {
if (item) {
if (this.focusedItem()) this.focusedItem().setAttribute ("tabindex", "-1");
item.setAttribute ("tabindex", "0");
item.focus ();
} // if

return item || null;
} // this.focusItem

unselectAll () {
this.selectedItems().forEach (e => e.setAttribute ("aria-selected", "false"));
} // this.unselectAll 

focusFirstItem () {
return this.focusItem (this.listbox.firstElementChild);
} // this.focusFirstItem

focusLastItem () {
return this.focusItem (this.listbox.lastElementChild);
} // this.focusLastItem

valueOf () {
return this.selectedItems().map (
item => item.getAttribute ("value") || item.textContent
).toString ();
} // this.valueOf

clear () {
this.listbox.innerHTML = "";
} // this.clear

isMultiselect () {
return this.combobox.classList.contains ("multiselect");
} // this.isMultiselect

toggleItem (item) {
if (item) {
this.selectItem (item, "toggle");
} // if
} // this.toggleItem

trigger (type, component) {
let e = new CustomEvent(type, {bubbles: true});
if (! component) component = this.combobox;
component.dispatchEvent (e);
} // this.trigger

} // class ComboboxBehavior
