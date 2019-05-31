import Vue from "vue";
import Router from "vue-router";
import Home from "@/views/Home";
import Login from "@/views/Login";
import Settings from "@/views/Settings";
import AddTorrent from "@/views/AddTorrent";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    },
    {
      path: "/settings",
      name: "Settings",
      component: Settings
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: "/torrents/add",
      name: "AddTorrent",
      component: AddTorrent
    }
  ]
});
