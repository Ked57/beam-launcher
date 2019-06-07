<template>
  <div class="page">
    <div v-if="!$store.state.token">
      <p>Hello there, your seedbox is ready.</p>
      <p>You can log-in by clicking on the login button in the top-right end of your screen</p>
    </div>
    <div v-else>
      <div class="controlPanel">
        <div class="controlPanelIcon">
          <font-awesome-icon class="icon" size="lg" icon="play" @click="onResumeClicked"/>
        </div>
        <div class="controlPanelIcon">
          <font-awesome-icon class="icon" size="lg" icon="stop" @click="onPauseClicked"/>
        </div>
        <div class="controlPanelIcon">
          <font-awesome-icon class="icon" size="lg" icon="trash" @click="onTrashClicked"/>
        </div>
      </div>
      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Completion</th>
            <th>Downloaded</th>
            <th>Download speed</th>
            <th>Uploaded</th>
            <th>Upload speed</th>
            <th>ETA</th>
            <th>Peers</th>
          </tr>
        </thead>
        <tbody v-for="torrent in torrents" :key="torrent.name">
          <tr @click="() => onTorrentRowClicked(torrent.name)">
            <td>{{ torrent.name }}</td>
            <td>
              <progress
                class="progress is-link"
                v-bind:value="torrent.info.progress"
                max="100"
              >{{ torrent.info.progress }}%</progress>
            </td>
            <td>{{ torrent.info.downloaded }}</td>
            <td>{{ torrent.info.downloadSpeed }}/s</td>
            <td>{{ torrent.info.uploaded }}</td>
            <td>{{ torrent.info.uploadSpeed }}/s</td>
            <td>{{ torrent.info.remaining }} s</td>
            <td>{{ torrent.info.peers }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { fetchApi } from "@/api/fetcher";
export default {
  name: "Home",
  data() {
    return {
      torrents: undefined,
      interval: undefined
    };
  },
  methods: {
    onTorrentRowClicked(torrentName) {
      console.log("Selected ", torrentName);
    },
    onResumeClicked() {
      console.log("Resume clicked");
    },
    onPauseClicked() {
      console.log("Pause clicked");
    },
    onTrashClicked() {
      console.log("Trash clicked");
    }
  },
  mounted() {
    if (!this.$store.state.token) {
      if (!localStorage.token) {
        return;
      }
      this.$store.commit("setToken", localStorage.token);
    }
    this.interval = setInterval(() => {
      if (!this.$store.state.token) {
        return;
      }
      fetchApi("torrents", {
        token: this.$store.state.token
      }).then(torrents => {
        this.torrents = torrents;
      });
    }, 2500);
  },
  beforeRouteLeave(to, from, next) {
    clearInterval(this.interval);
    next();
  }
};
</script>

<style scoped>
.page {
  margin: 5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}
.controlPanel {
  display: flex;
  align-items: center;
  justify-content: center;
}
.controlPanelIcon {
  padding: 0.3rem 1rem;
  border-radius: 0.5rem;
}
.controlPanelIcon:hover {
  background-color: #3273dc;
  opacity: 0.75;
}
</style>
