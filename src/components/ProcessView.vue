<template>
    <div>
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">Process {{ this.process.name }}</h1>

             <b-button-group class="float-right">
                <b-dropdown right text="Export" variant="outline-secondary" size="sm">
                    <b-dropdown-item @click="exportPlg">Export .plg</b-dropdown-item>
                    <b-dropdown-item @click="exportBpmn">Export .bpmn</b-dropdown-item>
                    <b-dropdown-item @click="exportTpn">Export .tpn</b-dropdown-item>
                    <b-dropdown-item @click="exportPnml">Export .pnml</b-dropdown-item>
                    <b-dropdown-item @click="exportSvg">Export .svg</b-dropdown-item>
                </b-dropdown>
                <b-button
                    :disabled="this.streaming"
                    variant="outline-secondary"
                    v-b-modal.stream-cofiguration size="sm">
                    <font-awesome-icon icon="play-circle" />
                    Simulate <small>(for 5 minutes)</small></b-button>
             </b-button-group>

        </div>
        <ProcessRenderer ref="dot" :dot="this.dot" />
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
            dot: null,
            streaming: true
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
                const matches = this.processes.filter(p => p.process.id == this.$route.params.id);
                if (matches.length == 1) {
                    this.process = matches[0].process;
                    this.streaming = matches[0].streaming;
                    this.renderProcess();
                    this.checkStreaming();
                } else {
                    this.$router.push("/");
                }
            }
        },
        renderProcess() {
            this.dot = null;
            axios.post(this.$plgBackend.getUrlProcessPlg2Dot(), this.process)
                .then(res =>  this.dot = res.data)
                .catch(err => console.error(err));
        },
        checkStreaming() {
            this.streaming = true
            axios.get(this.$plgBackend.getUrlStreamerStatus(this.process.id))
                .then(res => this.streaming = res.data)
                .catch(err => console.error(err));
        },
        exportPlg() {
            var url = window.URL.createObjectURL(new Blob([this.process.serialization], { type: 'application/xml' }));
            var fileLink = document.createElement('a');
            fileLink.href = url;
            fileLink.download = 'Process-' + this.process.name + ".plg";
            fileLink.click();
        },
        exportBpmn() {
            axios.post(this.$plgBackend.getUrlProcessPlg2Bpmn(), this.process)
                .then(res => {
                    var url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/xml' }));
                    var fileLink = document.createElement('a');
                    fileLink.href = url;
                    fileLink.download = 'Process-' + this.process.name + ".bpmn";
                    fileLink.click();
                })
                .catch(err => console.error(err));
        },
        exportTpn() {
            axios.post(this.$plgBackend.getUrlProcessPlg2Tpn(), this.process)
                .then(res => {
                    var url = window.URL.createObjectURL(new Blob([res.data], { type: 'text/plain' }));
                    var fileLink = document.createElement('a');
                    fileLink.href = url;
                    fileLink.download = 'Process-' + this.process.name + ".tpn";
                    fileLink.click();
                })
                .catch(err => console.error(err));
        },
        exportPnml() {
            axios.post(this.$plgBackend.getUrlProcessPlg2Pnml(), this.process)
                .then(res => {
                    var url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/xml' }));
                    var fileLink = document.createElement('a');
                    fileLink.href = url;
                    fileLink.download = 'Process-' + this.process.name + ".pnml";
                    fileLink.click();
                })
                .catch(err => console.error(err));
        },
        exportSvg() {
            var url = window.URL.createObjectURL(new Blob([this.$refs.dot.svg], { type: 'application/xml' }));
            var fileLink = document.createElement('a');
            fileLink.href = url;
            fileLink.download = 'Process-' + this.process.name + ".svg";
            fileLink.click();
        }
    }
}
</script>