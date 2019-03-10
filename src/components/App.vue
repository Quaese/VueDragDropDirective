<template>
  <div id="app">
    <div v-q-drag.dropzone class="qp-dropzone qp-flex">
      <img alt="Vue logo" src="@/assets/logo.png" />
      <img alt="Vue logo" src="@/assets/logo.png" />
      <img alt="Vue logo" src="@/assets/logo.png" />
      <img alt="Vue logo" src="@/assets/logo.png" />
      <div>
        ein Div
        <span>hallo span</span>
      </div>
    </div>
    <HelloWorld v-q-drag.draggable="DnD" msg="This Element is Draggable" />
  </div>
</template>

<script>
import HelloWorld from "@/components/HelloWorld.vue";
import { QDrag } from "../directives/QDragDirective.js";

export default {
  name: "app",
  components: {
    HelloWorld
  },
  directives: {
    QDrag
  },
  data() {
    return {
      DnD: {
        handler: {
          onDragStart: function() {
            console.log("onDragStart", arguments);
          },
          onDragEnd: function() {
            console.log("onDragEnd", arguments);
          }
        }
      }
    };
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
</style>
