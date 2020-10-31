<template>
    <ul class="nav flex-column mb-2">
        <li v-bind:key="proc.id" v-for="proc in processes" class="nav-item">
            <router-link
                class="nav-link select-process"
                :to="{ name: 'ProcessView', params: { id: proc.id }}">
                <font-awesome-icon icon="file" />
                Process {{ proc.name }}
            </router-link>
        </li>
    </ul>
</template>

<script>
export default {
    name: "ProcessesList",
    props: ["processes"]
}
</script>