<script setup>

const props = defineProps({
    repo: {
        type: String,
        required: true
    }
})
</script>

<template>
    <a :href="props.repo" target="_blank" rel="noopener noreferrer">
        <img :src="`./github.svg`" alt="GitHub Repo" />
    </a>
</template>