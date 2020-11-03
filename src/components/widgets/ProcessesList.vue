<template>
    <div class="list-group list-group-flush">
        <b-list-group-item
            v-bind:key="proc.process.id"
            v-for="proc in processes"
            class="list-group-item list-group-item-action bg-light border-0 align-items-center"
            :to="{ name: 'ProcessView', params: { id: proc.process.id }}">
            <font-awesome-icon icon="file" />
            Process {{ proc.process.name }}
            <b-spinner small label="Streaming ongoing..." class="float-right mt-1" style="color: #aaa" :class="{ invisible: !proc.streaming}" />
        </b-list-group-item>
    </div>
</template>

<script>
export default {
    name: "ProcessesList",
    props: ["processes"]
}
</script>