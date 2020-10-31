<template>
    <!-- <b-form @submit="onSubmit"> -->
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

            <!-- <b-button type="submit" variant="primary">Start stream <small>(for 5 minutes)</small></b-button> -->
            <!-- <template #modal-footer="{ cancel, startStream }"> -->
                <!-- <b-button @click="cancel()">Cancel</b-button> -->
                <!-- <b-button variant="primary" @click="startStream()" >Start stream <small>(for 5 minutes)</small></b-button> -->
            <!-- </template> -->
        
        </b-modal>
    <!-- </b-form> -->
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
            axios.post("https://plg-backend.herokuapp.com/api/v2/streamer/start/" + this.processName,
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
                    } else {
                        this.$toastr.e('Stream cannot be started (maybe it is already running?)');
                    }
                })
                .catch(err => console.error(err));
        }
    },
}
</script>