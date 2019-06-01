<template>
  <div class="page">
    <div v-if="!$store.state.token">
      <p>Hello there, your seedbox is ready.</p>
      <p>You can log-in by clicking on the login button in the top-right end of your screen</p>
    </div>

    <div v-else>
      <section class="section">
        <h1 class="title is-text-align-center">Add a torrent</h1>
        <p>
          <b>You can use a magnet link or drag and drop any .torrent file here</b>
        </p>
        <div>
          <input type="text" class="input" placeholder="Magnet link" v-model="magnetUrl">
        </div>
        <input type="submit" class="button" value="Submit" @click="onSubmitClicked">
      </section>
      <div class="notification is-danger" v-if="error">
        <button class="delete" @click="error=false"></button>
        {{ error }}
      </div>
      <div class="notification is-success" v-if="success">
        <button class="delete" @click="success=false"></button>
        Torrent added successfuly
      </div>
    </div>
  </div>
</template>

<script>
import { fetchApi } from "@/api/fetcher";
export default {
  name: "AddTorrent",
  data() {
    return {
      magnetUrl: undefined,
      success: undefined,
      error: undefined
    };
  },
  mounted() {
    if (!this.$store.state.token) {
      if (!localStorage.token) {
        return;
      }
      this.$store.commit("setToken", localStorage.token);
    }
  },
  methods: {
    onSubmitClicked() {
      if (!this.magnetUrl) {
        this.error = "Please provide a magnet url";
        return;
      }
      fetchApi(
        "torrent/add/magnet",
        {
          token: this.$store.state.token
        },
        { source: this.magnetUrl }
      )
        .then(() => {
          this.success = true;
        })
        .catch(err => {
          console.error(err);
          this.error = err;
        });
    }
  }
};
</script>

<style scoped>
.page {
  margin: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}
</style>
