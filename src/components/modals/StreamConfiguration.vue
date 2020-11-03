<template>
    <b-modal
        id="stream-cofiguration"
        @ok="startStream"
        title="Stream Configuration">
        <b-form-group label="Process name:" label-for="processName">
            <b-form-input v-model="processName" required placeholder="Process name"></b-form-input>
        </b-form-group>
        <b-form-group label="MQTT-XES broker:" label-for="brokerUrl">
            <b-form-input v-model="brokerUrl" required placeholder="MQTT-XES broker"></b-form-input>
        </b-form-group>
        <b-form-group label="MQTT topic:" label-for="baseTopic">
            <b-form-input v-model="baseTopic" required placeholder="MQTT topic"></b-form-input>
        </b-form-group>
    </b-modal>
</template>

<script>
import axios from 'axios';

export default {
    props: ["defaultName", "process"],
    data() {
        return {
            processName: this.defaultName,
            brokerUrl: 'broker.hivemq.com',
            baseTopic: 'pmcep-simulation'
        }
    },
    watch: {
        'defaultName': function(n) { this.processName = n }
    },
    methods: {
        startStream() {
            // evt.preventDefault();
            
            // alert(JSON.stringify(this.processName));
            axios.post(this.$plgBackend.getUrlStreamerStart(this.processName),
                this.process,
                {
                    params: {
                        broker: this.brokerUrl,
                        topic: this.baseTopic
                    }
                })
                .then(res => {
                    if (res.data === true) {
                        this.$toastr.s('Stream started!');
                        this.$emit('start-stream', this.process.id)
                    } else {
                        this.$toastr.e('Stream cannot be started (maybe it is already running?)');
                    }
                })
                .catch(err => console.error(err));
        }
    },
}
</script>