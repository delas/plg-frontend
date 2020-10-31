<template>
  <div id="app">
    <b-navbar toggleable="lg" type="dark" variant="dark" sticky class="flex-md-nowrap p-0 shadow">
      <b-navbar-brand href="#" class="col-md-3 col-lg-2 mr-0 px-3">PLG Web</b-navbar-brand>
    </b-navbar>

    <b-container fluid>
      <b-row>
        <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
          <div class="sidebar-sticky pt-3">
            <b-button
              class="ml-3"
              variant="outline-secondary"
              @click="createNew"
              :disabled="this.systemStatus != 'online'">Create new process</b-button>
            
            <h6
              class="sidebar-heading justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
              :class="this.processes.length > 0 ? 'd-flex' : 'd-none'">
              Generated Processes</h6>
            <ProcessesList v-bind:processes="processes" />
            <SystemStatus v-bind:systemStatus="systemStatus" />
          </div>
        </nav>
        <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-md-4 pt-3">
          <router-view :processes="processes" />
        </main>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import ProcessesList from './components/ProcessesList.vue'
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
      axios.get('https://plg-backend.herokuapp.com/api/v2/process/randomize')
          .then(res => {
            this.processes = [...this.processes, res.data];
            this.$toastr.s('New process created!');
          })
          .catch(err => console.error(err));
    },
    checkStatus() {
        axios.get('https://plg-backend.herokuapp.com/api/v2/system/ping')
            .then(res => this.systemStatus = (res.data == 'pong' ? "online" : "offline"))
            .catch(err => console.error(err));
    }
  },
  mounted() {
      this.checkStatus();
      setInterval(() => {
          this.checkStatus();
      }, 1000 * 60); // check again every minute
  }
}
</script>

<style>
body {
  font-size: .875rem;
}

/*
 * Sidebar
 */

.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100; /* Behind the navbar */
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
}

@media (max-width: 767.98px) {
  .sidebar {
    top: 5rem;
  }
}

.sidebar-sticky {
  position: relative;
  top: 0;
  height: calc(100vh - 48px);
  padding-top: .5rem;
  overflow-x: hidden;
  overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
}

@supports ((position: -webkit-sticky) or (position: sticky)) {
  .sidebar-sticky {
    position: -webkit-sticky;
    position: sticky;
  }
}

.sidebar .nav-link {
  font-weight: 500;
  color: #333;
}

.sidebar .nav-link .feather {
  margin-right: 4px;
  color: #999;
}

.sidebar .nav-link.active {
  color: #007bff;
}

.sidebar .nav-link:hover .feather,
.sidebar .nav-link.active .feather {
  color: inherit;
}

.sidebar-heading {
  font-size: .75rem;
  text-transform: uppercase;
}

/*
 * Navbar
 */

.navbar-brand {
  padding-top: .75rem;
  padding-bottom: .75rem;
  font-size: 1rem;
  background-color: rgba(0, 0, 0, .25);
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, .25);
}

.navbar .navbar-toggler {
  top: .25rem;
  right: 1rem;
}

.navbar .form-control {
  padding: .75rem 1rem;
  border-width: 0;
  border-radius: 0;
}

.form-control-dark {
  color: #fff;
  background-color: rgba(255, 255, 255, .1);
  border-color: rgba(255, 255, 255, .1);
}

.form-control-dark:focus {
  border-color: transparent;
  box-shadow: 0 0 0 3px rgba(255, 255, 255, .25);
}
</style>