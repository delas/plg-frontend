<template>
    <div class="list-group list-group-flush">
            <router-link
                v-bind:key="proc.id"
                v-for="proc in processes"
                class="list-group-item list-group-item-action bg-light border-0"
                :to="{ name: 'ProcessView', params: { id: proc.id }}">
                <font-awesome-icon icon="file" />
                Process {{ proc.name }}
            </router-link>
    </div>
</template>

<script>
export default {
    name: "ProcessesList",
    props: ["processes"]
}
</script>