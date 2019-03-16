<template>
  <div id="app">
    <div
      v-q-drag.dropzone
      class="qp-dropzone qp-flex"
      v-on:drop="handleDrop"
      v-on:dragenter="handleDragStart"
      v-on:dragleave="handleDragLeave"
      v-on:dragover="handleDragOver"
    >
      <img alt="Vue logo" src="@/assets/logo.png" />
      <img alt="Vue logo" src="@/assets/logo.png" />
      <img alt="Vue logo" src="@/assets/logo.png" />
      <img alt="Vue logo" src="@/assets/logo.png" />
      <div>
        ein Div
        <span>hallo span</span>
      </div>
    </div>
    <div
      v-q-drag.draggable="DnD"
      msg="This Element is Draggable"
      v-on:drag="handleDrag"
      v-on:dragstart="handleDragStart"
      v-on:dragend="handleDragEnd"
    >
      <img
        alt="dragger"
        class="qp-dragdrop-icon"
        src="@/assets/drag_icon.png"
      />
    </div>
  </div>
</template>

<script>
import { QDrag } from "../directives/QDragDirective.js";

export default {
  name: "app",
  directives: {
    QDrag
  },
  data() {
    return {
      DnD: {
        handler: {
          onDragStart: function() {
            // console.log("onDragStart", arguments);
          },
          onDragOver: function() {
            // console.log("onDragOver", arguments);
          },
          onDragEnter: function() {
            // console.log("onDragEnter", arguments);
          },
          onDragLeave: function() {
            // console.log("onDragLeave", arguments);
          },
          onDragEnd: function() {
            // console.log("onDragEnd", arguments);
          },
          onDrag: function() {
            // console.log("onDrag", arguments);
          },
          onDrop: function() {
            // console.log("onDrop", arguments);
          }
        }
      }
    };
  },

  methods: {
    handleDragStart: function(evt) {
      evt;
    },
    handleDragOver: function(evt) {
      // NECESSARY: prevent default action of element (e.g. link)
      if (evt.preventDefault) {
        evt.preventDefault();
      }
    },
    handleDragEnter: function(evt) {
      evt;
    },
    handleDragLeave: function(evt) {
      evt;
    },
    handleDragEnd: function(evt) {
      evt;
    },
    handleDrag: function(evt) {
      evt;
    },
    handleDrop: function(evt) {
      // NECESSARY: prevent default action of element (e.g. link)
      if (evt.preventDefault) {
        evt.preventDefault();
      }
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.qp-dropzone {
  background: #efefef;
}
.qp-flex {
  display: flex;
  justify-content: space-between;
}

.qp-dragdrop-icon {
  height: 200px;
  width: 200px;
}
</style>
