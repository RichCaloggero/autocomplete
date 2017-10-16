document.addEventListener ("keydown", (e) => {
if (e.key === "Enter" && e.shiftKey && e.altKey) {
let message = document.querySelector ("#message, .message, .status");
if (message) message.innerHTML = getCssInfo(e.target);
else alert (getCssInfo(this.target));

e.cancelBubble = true;
e.stopPropagation();
e.preventDefault ();
return false;
} // if

return true;
}, true); // event listener

function getCssInfo (element) {
let css = element.getBoundingClientRect ();
return `${element.nodeName}${elementId()}${elementClass()}: ${elementPosition()}`;

function elementId () {
return (element.id)? "#" + element.id : "";
} // elementId

function elementClass () {
return (element.getAttribute("class"))? "." + element.className : "";
} // elementClass

function elementPosition () {
return `${round(css.left)}, ${round(css.top)}`;
} // elementPosition 

function elementDimensions () {
return `${round(css.x)}, ${round(css.y)}`;
} // elementDimensions 

function round (n) {
return Math.round (Math.trunc(10.0 * n) / 10.0);
} // round
} // displayElementInfo

