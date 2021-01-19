<template>
    <SvgPanZoom
        class="border w-100 svg-panzoom"
        :class="{ 'loading' : this.svg === null }"
        :viewportSelector="`.graph`"
        :zoomEnabled="true"
        :controlIconsEnabled="true"
        :panEnabled="true"
        :fit="false"
        :center="true"
        :minZoom="0.1"
        :maxZoom="3"
        @svgpanzoom="registerSvgPanZoom">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="overflow: hidden">
            <g class="svg-pan-zoom_viewport" v-html="svg"></g>
        </svg>
    </SvgPanZoom>

</template>

<script>
import Viz from "viz.js";
import workerURL from 'file-loader!viz.js/full.render.js';
import SvgPanZoom from "vue-svg-pan-zoom";

export default {
    props: ["dot"],
    data() {
        return {
            svg: null,
            svgpanzoom: null
        }
    },
    components: {
        SvgPanZoom 
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
                    .then(element => {
                        this.viewBox = element.getAttribute("viewBox").split(" ").map(Math.ceil);
                        let innerHTML = element.getElementsByClassName("graph")[0].innerHTML;
                        this.svg = innerHTML;
                        this.fitCenter();
                    })
                    .catch(error => console.error(error));
            }
        },
        registerSvgPanZoom(svgpanzoom) {
            this.svgpanzoom = svgpanzoom;
        },
        fitCenter() {
            if (!this.svgpanzoom || !this.viewBox || !this.svg) return;
            let height = this.viewBox[3];
            var elmnt = window.document.querySelector(".svg-panzoom");
            if (elmnt) {
                this.svgpanzoom.pan({
                    x: 0,
                    y: Math.abs(height),
                });
            }
        },

    }
};
</script>

<style scoped >
.loading {
	background: url('../../assets/loader.svg') center center no-repeat !important;
}
.svg-panzoom {
    background-color: #fff;
    overflow: hidden;
    margin-top: 1rem;
    top: 0;
    left: 0;
    width: 100%;
}
.svg-panzoom svg {
    top: 0;
    left: 0;
    width: 100%;
    height: calc(100vh - 170px);
    overflow: hidden;
}
</style>