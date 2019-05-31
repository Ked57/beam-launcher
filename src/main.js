// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "bulma/css/bulma.css";
import Vue from "vue";
import Vuex from "vuex";
import App from "./App";
import router from "./router";

Vue.use(Vuex);

Vue.config.productionTip = false;

const store = new Vuex.Store({
  state: {
    token: undefined
  },
  mutations: {
    setToken(state, token) {
      state.token = token;
    }
  }
});

/* eslint-disable no-new */
new Vue({
  el: "#app",
  store,
  router,
  components: { App },
  template: "<App/>"
});
