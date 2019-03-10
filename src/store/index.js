import Vue from "vue";
import Vuex from "vuex";

import q_dragdrop from "./modules/q-dragdrop.store";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    q_dragdrop
  }
});
