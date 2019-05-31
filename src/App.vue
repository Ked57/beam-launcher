<template>
  <div id="app">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a
          role="button"
          class="navbar-burger burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <a @click="onHomeButtonClicked" class="navbar-item">Home</a>
          <a @click="onAddButtonClicked" class="navbar-item">Add a torrent</a>
          <a @click="onSettingsButtonClicked" class="navbar-item">Settings</a>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <div class="buttons">
              <a
                @click="onLoginButtonClicked"
                class="button is-light"
                v-if="!$store.state.token"
              >Log in</a>
              <a @click="onLogoutButtonClicked" class="button is-light" v-else>Log out</a>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    onHomeButtonClicked() {
      this.$router.push({ path: "/" });
    },
    onAddButtonClicked() {
      this.$router.push({ path: "/torrents/add" });
    },
    onSettingsButtonClicked() {
      this.$router.push({ path: "/settings" });
    },
    onLoginButtonClicked() {
      this.$router.push({ path: "/login" });
    },
    onLogoutButtonClicked() {
      // fetchApi /api/user/logout
      this.$store.commit("setToken", undefined);
      localStorage.removeItem("token");
      this.$router.push({ path: "/" });
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
  margin-top: 0;
}
</style>
