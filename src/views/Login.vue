<template>
  <section class="section">
    <div class="box">
      <h1 class="title is-text-align-center form-element">Log-in</h1>
      <p>Username</p>
      <input type="text" class="input form-element" v-model="username">
      <p>Password</p>
      <input type="password" class="input form-element" v-model="password">
      <input type="submit" class="button form-element" value="Log-in" @click="onSubmitClick">
      <div class="notification is-danger" v-if="loginError">
        <button class="delete" @click="loginError=false"></button>
        {{ loginError }}
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: undefined,
      password: undefined
    };
  },
  methods: {
    onSubmitClick() {}
  }
};
</script>

<style scoped>
.formElement {
  max-width: 400px;
}
.box {
  margin: 0 auto;
  padding: 2rem;
  max-width: 600px;
}
</style>
