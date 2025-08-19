<script setup>
import { ref, watch, onMounted, onUnmounted, nextTick } from 'vue';

const props = defineProps({
    code: {
        type: String,
        default: ""
    },
    dependencies: {
        type: String,
        default: ""
    },
    name: {
        type: String,
        default: "My%20Snack"
    },
    description: {
        type: String,
        default: "My%20Amazing%20Snack"
    },
    preview: {
        type: Boolean,
        default: true
    },
    platform: {
        type: String,
        default: "android",
        validator: (value) => ['ios', 'android', 'web'].includes(value)
    },
    height: {
        type: String,
        default: "480px"
    },
    width: {
        type: String,
        default: "100%"
    },
    snackId: {
        type: String,
        default: ""
    },
});

const containerRef = ref(null);
let scriptLoaded = false;
let createdScript;

const loadExpoScript = () => {
    if (scriptLoaded) return;

    const existingScript = document.getElementById('expo-embed-script');
    if (existingScript) {
        createdScript = existingScript;
        return;
    }

    createdScript = document.createElement('script');
    createdScript.src = 'https://snack.expo.dev/embed.js';
    createdScript.onload = () => {
        console.log('Expo script loaded');
    };

    document.head.appendChild(createdScript);
};

const initializeSnack = async () => {
    await nextTick();
    loadExpoScript();
};

// onMounted(() => {
initializeSnack();
// });


onUnmounted(() => {
    document.head.removeChild(createdScript);
});
</script>

<template>
    <div ref="containerRef" :data-snack-code="code" :data-snack-dependencies="dependencies" :data-snack-name="name"
        :data-snack-description="description" :data-snack-preview="preview" :data-snack-platform="platform" 
        :data-snack-id="snackId || undefined" :style="{
            overflow: 'hidden',
            background: '#f7f7f7',
            border: '1px solid rgba(0,0,0,.08)',
            borderRadius: '4px',
            height: height,
            width: width
        }" />
</template>