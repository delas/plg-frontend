<template>
  <div 
    class="border w-100 overflow-auto"
    style="height: calc(100vh - 170px)"
    v-html="svg"
    :class="{ 'loading' : this.svg === null }">
  </div>
</template>

<script>
// import * as d3 from 'd3';
import Viz from "viz.js";
import workerURL from 'file-loader!viz.js/full.render.js';

export default {
    props: ["dot"],
    data() {
        return { svg: null }
    },
    watch: {
        dot: "updateModel",
    },
    mounted() {
        this.updateModel();
    },
    methods: {
        updateModel() {
            this.svg = null;
            if (this.dot !== null) {
                var viz = new Viz({ workerURL });
                viz.renderSVGElement(this.dot)
                    .then(element => this.svg = element.outerHTML)
                    .catch(error => console.log(error));
            }
        },
    },
};
</script>

<style scoped>
.loading {
	background: url('../../assets/loader.svg') center center no-repeat !important;
}

</style>