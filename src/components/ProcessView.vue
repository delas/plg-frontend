<template>
    <div>
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">Process {{ this.process.name }}</h1>

             <b-button-group class="float-right">
                <b-dropdown right text="Export" variant="outline-secondary" size="sm">
                    <b-dropdown-item>Export .plg</b-dropdown-item>
                    <b-dropdown-item>Export .tpn</b-dropdown-item>
                    <b-dropdown-item>Export .svg</b-dropdown-item>
                </b-dropdown>
                <b-button variant="outline-secondary" v-b-modal.stream-cofiguration size="sm">
                    <font-awesome-icon icon="play-circle" />
                    Simulate <small>(for 5 minutes)</small></b-button>
             </b-button-group>

        </div>
        <ProcessRenderer :dot="this.dot" />
        <StreamConfiguration :defaultName="this.process.name" :process="this.process" />
    </div>
</template>

<script>
import ProcessRenderer from './widgets/ProcessRenderer';
import StreamConfiguration from './modals/StreamConfiguration';
import axios from 'axios';

export default {
    name: "ProcessView",
    props: ["processes"],
    data() {
        return {
            process: {
                name: ""
            },
            dot: null
        }
    },
    components: {
        ProcessRenderer,
        StreamConfiguration
    },
    created() {
        this.fetchData()
    },
    watch: {
        '$route': 'fetchData'
    },
    methods: {
        fetchData() {
            if ('id' in this.$route.params) {
                const matches = this.processes.filter(p => p.id == this.$route.params.id);
                if (matches.length == 1) {
                    this.process = matches[0];
                    this.renderProcess();
                } else {
                    this.$router.push("/");
                }
            }
        },
        renderProcess() {
            this.dot = null;
            axios.post("https://plg-backend.herokuapp.com/api/v2/process/plg2dot", this.process)
                .then(res =>  this.dot = res.data)
                .catch(err => console.error(err));
        }
    }
}
</script>