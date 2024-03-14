<script setup lang="js">
const route = useRoute()
</script>

<template>
    <div>
        <h1>PRUEBA RUTAS</h1>
        <p>Current route: {{ route.path }}</p>
    </div>
</template>