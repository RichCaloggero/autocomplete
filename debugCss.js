document.addEventListener ("click", (e) => {
if (e instanceof MouseEvent) {
return handleEvent (e);
} // if

return true;
}, true); // event listener

document.addEventListener ("keydown", (e) => {
if (e.key === "Enter" && e.shiftKey && e.altKey) {
return handleEvent (e);
} // if

return true;
}, true); // event listener

function handleEvent (e) {
let message = document.querySelector ("#message, .message, .status");
if (message) message.innerHTML = getInfo(e);
else alert (getInfo(e));

e.cancelBubble = true;
e.stopPropagation();
e.preventDefault ();
return false;
} // handleEvent

function getInfo (e) {
let element = e.target;
let css = element.getBoundingClientRect ();
return `${element.nodeName}${elementId(element)}${elementClass(element)}: ${elementPosition(element)}, ${mousePosition(e)}`;

function elementId (element) {
return (element.id)? "#" + element.id : "";
} // elementId

function elementClass (element) {
return (element.getAttribute("class"))? "." + element.className : "";
} // elementClass

function elementPosition (element) {
return `${round(css.left)}, ${round(css.top)}`;
} // elementPosition 

function mousePosition (e) {
return `client (${e.clientX}, ${e.clientY}); screen (${e.screenX}, ${e.screenY})`;
} // mousePosition

} // displayElementInfo

function round (n, digitCount) {
if (! digitCount) digitCount = 2;
let p = Math.pow (10.0, digitCount);
return Math.round(p * n) / p;
} // round
