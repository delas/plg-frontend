<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="dark" class="shadow">
      <b-navbar-brand href="#">
         <img src="@/assets/dtu.png" class="d-inline-block align-top" alt="DTU" height="30" />
        PLG Web
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item :to="{ name: 'About' }">About</b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <b-container fluid>
      <b-row>
        <nav class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse border-right p-0">
          <div class="sidebar-sticky pt-3">
            <b-button
              class="ml-3"
              variant="outline-secondary"
              @click="createNew"
              :disabled="this.systemStatus != 'online'">New Process</b-button>
            
            <h6
              class="sidebar-heading justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
              :class="this.processes.length > 0 ? 'd-flex' : 'd-none'">
              Processes</h6>
            <ProcessesList v-bind:processes="processes" />
            <SystemStatus v-bind:systemStatus="systemStatus" />
          </div>
        </nav>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4 pt-3">
          <router-view :processes="processes" @start-stream="streamStarted" />
        </main>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import ProcessesList from './components/widgets/ProcessesList.vue'
import SystemStatus from './components/widgets/SystemStatus.vue';
import axios from 'axios';

export default {
  components: {
    ProcessesList,
    SystemStatus
  },
  data() {
    return {
      processes: [],
      systemStatus: "booting"
    }
  },
  methods: {
    createNew() {
      axios.get(this.$plgBackend.getUrlProcessRandomize())
          .then(res => {
            this.processes = [...this.processes, {process: res.data, streaming: false}];
            this.$toastr.s('New process created!');
          })
          .catch(err => console.error(err));
    },
    checkStatus() {
        axios.get(this.$plgBackend.getUrlPing())
            .then(res => this.systemStatus = (res.data == 'pong' ? "online" : "offline"))
            .catch(err => console.error(err));

        for(var i = 0; i < this.processes.length; i++) {
          var _this = this;
          var _i = i;
          axios.get(this.$plgBackend.getUrlStreamerStatus(_this.processes[_i].process.id), {data: {index: _i}})
                .then(res => {
                  _this.processes[JSON.parse(res.config.data).index].streaming = res.data;
                })
                .catch(err => console.error(err));
        }
    },
    streamStarted(id) {
      this.processes.find(el => el.process.id == id).streaming = true;
    }
  },
  mounted() {
      this.checkStatus();
      setInterval(() => {
          this.checkStatus();
      }, 1000 * 15); // check again every few seconds
  }
}
</script>

<style>
.sidebar-sticky {
  height: calc(100vh - 56px);
}

</style>
