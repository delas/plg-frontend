<template>
    <div>
        <h1 class="h2 pt-3 pb-2 mb-3 border-bottom">About</h1>
        <p>PLG Web is a web implementation of PLG which allows for steraming event data.
            Process Log Generator is a application capable to generate random business
            processes and "execute" them in order to generate an event steram.</p>

        <p>This software is designed to help researchers in the construction of a large
            set of processes and corresponding execution logs. This software is released
            with a small library which could help in the programmatical creation of processes.</p>
        
        <p>The software makes use of the following libraries:</p>
        <ul>
            <li><code>libPlg</code> and <code>libPlgSream</code>, available at <a href="https://github.com/delas/plg" target="_blank">https://github.com/delas/plg</a></li>
            <li><code>mqtt-xes</code>, available at <a href="https://github.com/beamline/mqtt-xes" target="_blank">https://github.com/beamline/mqtt-xes</a></li>
        </ul>
        <p>The source code of this web-application is available at:</p>
        <ul>
            <li>Backend: <a href="https://github.com/delas/plg-backend" target="_blank">https://github.com/delas/plg-backend</a></li>
            <li>Frontend: <a href="https://github.com/delas/plg-frontend" target="_blank">https://github.com/delas/plg-frontend</a></li>
        </ul>
        <p>The documentation for the backend is available as <a href="https://editor.swagger.io/?url=https://raw.githubusercontent.com/delas/plg-backend/master/api-documentation.yaml" target="_blank">Swagger YAML file</a>.
            The API are currently hosted at Heroku, and the frontend randomly connects to one of them. To use the API these hosts can currently be used:</p>
        <ul>
            <li v-bind:key="h.hostname"
            v-for="h in hosts">
                <code>{{ h.hostname }}</code> using <code>{{ h.protocol }}</code>
            </li>
        </ul>
        <p>The service is offered with no guarantees.</p>

        <h1 class="h3 pt-3 pb-2 mb-3 border-bottom">Citations</h1>
        <p>Please cite this work as:</p>
        <ul>
            <li>A. Burattin, M. Eigenmann, R. Seiger, B. Weber. "<a href="https://andrea.burattin.net/publications/2020-bpm-demo" target="_blank">MQTT-XES: Real-time Telemetry for Process Event Data</a>".
                In <em>Online Proceedings of the BPM Demo Track 2020</em>; Sevilla, Spain; September, 13-18 2020; CEUR-WS.org 2020.</li>
            <li>Andrea Burattin. "<a href="https://andrea.burattin.net/publications/2016-bpm-demo" target="_blank">PLG2: Multiperspective Process Randomization with Online and Offline Simulations</a>".
                In <em>Online Proceedings of the BPM Demo Track 2016</em>; Rio de Janeiro, Brasil; September, 18 2016; CEUR-WS.org 2016.</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: "About",
    data() {
        return {
            hosts: []
        };
    },
    created() {
        this.hosts = require('../assets/backend-hosts.json');
    }
}
</script>