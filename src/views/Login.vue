<template>
  <section class="section">
    <h1 class="title is-text-align-center">Log-in</h1>
    <div>
      <p>Username</p>
      <input type="text" class="input" v-model="username">
    </div>
    <div>
      <p>Password</p>
      <input type="password" class="input" v-model="password">
    </div>
    <input type="submit" class="button" value="Log-in" @click="onSubmitClick">
    <div class="notification is-danger" v-if="loginError">
      <button class="delete" @click="loginError=false"></button>
      {{ loginError }}
    </div>
  </section>
</template>

<script>
import { fetchApi } from "@/api/fetcher";

export default {
  name: "Login",
  data() {
    return {
      username: undefined,
      password: undefined,
      loginError: undefined
    };
  },
  methods: {
    onSubmitClick() {
      fetchApi("user/login", {
        username: this.username,
        password: this.password
      }).then(result => {
        this.$store.commit("setToken", result.token);
        localStorage.token = result.token;
        this.$router.push({ path: "/" });
      });
    }
  }
};
</script>

<style scoped>
.formElement {
  max-width: 400px;
}
.section {
  margin: auto;
  max-width: 600px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
.section * {
  margin: 0.2rem;
}
</style>
