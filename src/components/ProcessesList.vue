<template>
    <div class="list-group list-group-flush">
        <b-list-group-item
            v-bind:key="proc.process.id"
            v-for="proc in processes"
            class="list-group-item list-group-item-action bg-light border-0"
            :to="{ name: 'ProcessView', params: { id: proc.process.id }}">
            <font-awesome-icon icon="file" />
            Process {{ proc.process.name }}
            {{proc.streaming}}
            <font-awesome-icon icon="play-circle" class="float-right" :class="{ invisible: !proc.streaming}" />
        </b-list-group-item>
    </div>
</template>

<script>
export default {
    name: "ProcessesList",
    props: ["processes"]
}
</script>