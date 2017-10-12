class ComboboxBehavior {
constructor (element) {
this.combobox = this.container = element;
this.listbox = this.container.querySelector (".suggestions");
this.input = this.container.querySelector ("input");

this.active_id = this.container.id + "-activedescendant";
this.listbox.id = this.container.id + "-suggestions";
this.listbox.style.listStyle = "none";
this.input.setAttribute ("role", "combobox");
this.input.setAttribute ("aria-expanded", "false");
this.listbox.setAttribute ("role", "listbox");
this.close ();
this.clear ();

this.input.addEventListener ("keydown", e => this.navigateInput(e));
this.listbox.addEventListener ("keydown", e => this.navigateList(e));

// mouse support
this.listbox.addEventListener ("click", e => {
e.target.focus ();
if (! this.isMultiselect()) this.done ();
return false;
});
this.listbox.addEventListener ("mouseover", e => {
e.target.focus ();
if (! this.isMultiselect()) this.done ();
return false;
});

this.listbox.addEventListener ("focusin", e => {
Array.from(this.listbox.children).forEach (e => e.setAttribute("tabindex", "-1"));
e.target.setAttribute("tabindex", "0");
if (! this.isMultiselect()) this.selectItem (e.target);
}); // listbox.focusIn

} // constructor

/// methods

navigateInput (e) {
switch (e.key) {
case "ArrowUp":
this.open ();
this.focusLastItem ();
return false;

case "ArrowDown":
this.open ();
this.focusFirstItem ();
return false;

default: return true;
} // switch
} // this.navigateInput

navigateList (e) {
switch (e.key) {
case "Enter":
this.done ();
return false;

case "Escape":
this.input.value = "";
this.clear ();
this.close ();
this.trigger ("cancel");
return false;

case " ": // space key
if (this.isMultiselect()) this.selectItem (this.focusedItem(), "toggle");
return false;

case "ArrowUp":
this.focusItem (this.previous("wrap"));
return false;

case "ArrowDown":
this.focusItem (this.next("wrap"));
return false;

default:  return true;
} // switch
} // navigateList

done () {
this.input.value = this.valueOf();
this.close ();
this.trigger ("done");
} // this.done

open () {
if (this.listbox.children.length === 0) return;
this.showList ();
this.input.setAttribute ("aria-controls", this.listbox.id);
this.input.setAttribute ("aria-expanded", "true");
this.input.setAttribute ("tabindex", "-1");
//this.input.setAttribute ("aria-activedescendant", active_id);
} // this.open

showList () {
this.listbox.classList.remove("hidden");
} // this.showList


close () {
this.hideList ();
this.input.removeAttribute ("aria-controls");
this.input.setAttribute ("aria-expanded", "false");
this.input.removeAttribute ("tabindex");
//this.input.removeAttribute ("aria-activedescendant");
this.input.focus ();
} // this.close

hideList () {
this.listbox.classList.add("hidden");
} // hideList

addItem (text) {
if (text) {
let item = document.createElement ("li");
item.textContent = text;
item.setAttribute ("role", "option");
item.setAttribute ("aria-selected", "false");

//if (this.listbox.children.length > 0) 
item.setAttribute ("tabindex", "-1");
//else item.setAttribute ("tabindex", "0");

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
return Array.from(this.listbox.children).filter (this.isSelected);
} // this.selectedItems

selectItem (item, toggle) {
if (item) {
// fire select or unselect events only if state has really changed
let cache = this.isSelected(item);

if (toggle && this.isMultiselect()) {
item.setAttribute ("aria-selected",
this.isSelected(item)? "false" : "true"
); // setAttribute

} else {
this.unselectAll ();
item.setAttribute ("aria-selected", "true");
} // if

// if state has really changed, then fire appropriate event
if (this.isSelected(item) !== cache)
this.isSelected(item)? this.trigger ("selected", item)
: this.trigger ("unselected", item);
} // if

return item || null;
} // this.selectItem

isSelected (item) {
return item && item.matches("[aria-selected='true']");
} // this.isSelected

focusedItem () {
//return this.listbox.querySelector ("[tabindex='0']");
return this.listbox.querySelector (":focus");
} // this.focusedItem 

focusItem (item) {
if (item) {
item.focus ();
} // if

return item || null;
} // this.focusItem

unselectAll () {
this.selectedItems().forEach (e => this.unselectItem(e));
} // this.unselectAll 

unselectItem (item) {
if (item) {
item.setAttribute ("aria-selected", "false");
this.trigger ("unselect", item);
} // if

return item || null;
} // unselectItem

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
if (this.listbox.children.length > 0) {
Array.from(this.listbox.children).forEach (e => this.listbox.removeChild(e));

/*let element = this.listbox.cloneNode (false);
let parent = this.listbox.parentElement;
parent.removeChild (this.listbox);
this.listbox = parent.appendChild (element);
*/
} // if
} // this.clear

isMultiselect () {
return this.container.classList.contains ("multiselect");
} // this.isMultiselect

toggleItem (item) {
if (item) {
this.selectItem (item, "toggle");
} // if
} // this.toggleItem

trigger (type, component) {
let e = new CustomEvent(type, {bubbles: true});
if (! component) component = this.container;
component.dispatchEvent (e);
} // this.trigger

} // class ComboboxBehavior
