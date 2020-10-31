<template>
    <footer class="mb-1 mx-3 small" style="position: fixed; bottom: 0;">
        <p>
            <font-awesome-icon icon="circle" v-bind:class=" this.systemStatus " />
            System status: {{ this.systemStatus }}<br>
            <small class="text-secondary">
                <font-awesome-icon icon="server" class="mr-1" />
                {{ this.$plgBackend.getHostname() }}
            </small>
            </p>
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