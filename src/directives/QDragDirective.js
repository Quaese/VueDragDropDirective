// import Vue from "vue";
let srcElem = null,
  handler;

/*
 * Tools and helper
 */
// triggers a custom handler if available
const triggerCustomHandler = handlerName => {
  if (handler && handler[handlerName]) {
    handler[handlerName]();
  }
};

// get the child node relative to the parent
const getChildNode = (parent, node) => {
  // find node that is a direct child of parent
  while (node.parentNode && node.parentNode !== parent) {
    node = node.parentNode;
  }

  return node;
};

/*
 * Event handler
 */
const handleDragStart = function(evt) {
  // set draggable element
  srcElem = evt.target;

  // set data transfer properties
  evt.dataTransfer.effectAllowed = "move";
  evt.dataTransfer.setData("text/html", srcElem.innerHTML);

  triggerCustomHandler("onDragStart");
};

const handleDragOver = function(evt) {
  // prevent default action of element (e.g. link)
  if (evt.preventDefault) {
    evt.preventDefault();
  }

  evt.dataTransfer.dropEffect = "move";

  triggerCustomHandler("onDragOver");
};

const handleDragEnter = function(evt) {
  evt;

  triggerCustomHandler("onDragEnter");
};

const handleDragLeave = function(evt) {
  evt;

  triggerCustomHandler("onDragLeave");
};

const handleDragEnd = function(data) {
  return function(evt) {
    evt;
    data;

    triggerCustomHandler("onDragEnd");
    srcElem = null;
  };
};

const handleDrop = function(data) {
  return function(evt) {
    if (evt.stopPropagation) {
      evt.stopPropagation(); // stops the browser from redirecting.
    }

    if (srcElem !== this) {
      // get access to the transfered data (here text/html)
      // this.innerHTML = evt.dataTransfer.getData("text/html");

      const position = data.position ? data.position : 0;

      // if append to the end of dropzone
      if (
        position === 1 ||
        !this.hasChildNodes() ||
        (position === 2 && this === evt.srcElement)
      ) {
        this.appendChild(srcElem);

        // if insert before element under cursor
      } else if (position === 2) {
        this.insertBefore(srcElem, getChildNode(this, evt.srcElement));

        // if insert to the first position (default)
      } else {
        this.insertBefore(srcElem, this.firstChild);
      }
    }

    triggerCustomHandler("onHandleDrop");

    return false;
  };
};

/*
 * Directive QDrag
 * Binds drag/drop functionality to DOM elements.
 *
 * Usage:
 * v-q-drag.modifiers="dndObject"
 *
 * @params:
 *
 * modifiers:
 * - draggable - element becomes draggable
 * - dropzone  - element becomes a dropzone
 * - first     - modifier for dropzones that inserts draggable element at the first position
 * - last      - modifier for dropzones that inserts draggable element at the last position
 *
 * dndObject   - an object that contains callbacks for the drag/drop handler
 *               handler: {
 *                 onDragStart: function() {},
 *                 onDragOver: function() {},
 *                 onDragEnter: function() {},
 *                 onDragLeave: function() {},
 *                 onDragEnd: function() {},
 *                 onHandleDrop: function() {}
 *               }
 */
export const QDrag = {
  bind(el, binding, vnode) {
    vnode;
    // console.log("el: ", el, "\nbinding: ", binding, "\nvnode: ", vnode);

    handler =
      binding.value && binding.value.handler
        ? binding.value.handler
        : undefined;

    // make element draggable and register necessary drag events
    if (
      //binding.modifiers.draggable === undefined ||
      binding.modifiers.draggable
    ) {
      // set draggable attribute
      el.setAttribute("draggable", true);

      // register drag events for drag start and drag end
      el.addEventListener("dragstart", handleDragStart, false);
      el.addEventListener("dragend", handleDragEnd({}), false);
    }

    if (binding.modifiers.dropzone) {
      // register drop event for droppable elements
      el.addEventListener(
        "drop",
        handleDrop({
          position: binding.modifiers.last ? 1 : binding.modifiers.first ? 0 : 2
        }),
        false
      );
    }

    // events for all elements
    el.addEventListener("dragover", handleDragOver, false);
    el.addEventListener("dragenter", handleDragEnter, false);
    el.addEventListener("dragleave", handleDragLeave, false);
  },

  componentUpdated(element, binding, vnode, oldVnode) {
    console.log(
      "QDragDirective (componentUpdated): ",
      element,
      binding,
      vnode,
      oldVnode
    );
  },

  update(element, binding, vnode, oldVnode) {
    console.log("QDragDirective (update): ", element, binding, vnode, oldVnode);
  },

  unbind(el) {
    console.log("unbind: ", el);

    // ToDo: Remove Events!!!
  }
};

// make directive available globally
// Vue.directive("q-drag", QDrag);
