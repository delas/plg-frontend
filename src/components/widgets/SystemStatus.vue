<template>
    <footer class="mb-1 mx-3 small" style="position: fixed; bottom: 0;">
        <p>
            <font-awesome-icon icon="circle" v-bind:class=" this.systemStatus " />
            <!-- <i class="fa fa-circle"  -->
            <!-- v-bind:class=" this.systemOnline ? 'online' : 'offline' "></i> -->
            System status: {{ this.systemStatus }}</p>
    </footer>
</template>

<script>
export default {
    name: "SystemStatus",
    props: ["systemStatus"],
}
</script>

<style scoped>
.online {
    color: rgb(0, 204, 0);
}

.offline {
    color: rgb(170, 20, 20);
}

.booting {
    color: rgb(180, 141, 56);
}
</style>