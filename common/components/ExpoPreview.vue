<script setup>
/**
 * A live Expo Snack embedded in a slide: the code compiles on Expo's servers
 * and renders in the frame.
 *
 * `platform` picks which tab the embed OPENS on; all four stay available and
 * the viewer can switch at any time.
 *
 * ⚠️ `android` and `ios` are Appetize.io streaming a real emulator as VIDEO.
 * On a weak connection, and especially in Firefox on Linux (long-standing
 * black-screen/flicker bugs with hardware accelerated video, plus an open
 * webcompat report against Appetize itself), that preview flashes black and
 * can look broken to the room. Nothing in this component can fix it — the
 * flicker happens upstream of our iframe.
 *
 * If it misbehaves during a lecture, click the `Web` tab: that path is
 * react-native-web in an ordinary iframe, with no video stream to drop.
 *
 * `deviceFrame` draws a phone outline around the preview.
 */
import { ref, onMounted, onUnmounted, nextTick } from 'vue';

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
        validator: (value) => ['ios', 'android', 'web', 'mydevice'].includes(value)
    },
    /**
     * Which platform tabs the embed offers. All four by default; narrow it
     * only when a slide has a reason to.
     */
    supportedPlatforms: {
        type: String,
        default: "ios,android,web,mydevice"
    },
    /** Draw a phone outline around the preview. */
    deviceFrame: {
        type: Boolean,
        default: true
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
const isVisible = ref(false);
const scriptLoading = ref(false);

let globalScript = null;
let scriptLoadPromise = null;
let componentCount = 0;

const loadExpoScript = () => {
    if (scriptLoadPromise) return scriptLoadPromise;

    const existingScript = document.getElementById('expo-embed-script');
    if (existingScript) {
        globalScript = existingScript;
        return Promise.resolve();
    }

    scriptLoadPromise = new Promise((resolve, reject) => {
        globalScript = document.createElement('script');
        globalScript.id = 'expo-embed-script';
        globalScript.src = 'https://snack.expo.dev/embed.js';
        globalScript.async = true;
        globalScript.defer = true;

        globalScript.onload = () => {
            console.log('Expo script loaded');
            resolve();
        };

        globalScript.onerror = () => {
            reject(new Error('Failed to load Expo script'));
        };

        document.head.appendChild(globalScript);
    });

    return scriptLoadPromise;
};

const initializeSnack = async () => {
    if (!isVisible.value) return;

    try {
        scriptLoading.value = true;
        await loadExpoScript();
        await nextTick();

        if (window.ExpoSnack) {
            window.ExpoSnack.initialize();
        }

        setTimeout(() => {
            applyIframeStyles();
        }, 500);
    } catch (error) {
        console.error('Failed to initialize Expo Snack:', error);
    } finally {
        scriptLoading.value = false;
    }
};

const styleIframe = (iframe) => {
    if (iframe.dataset.snackStyled) return;
    iframe.dataset.snackStyled = 'true';
    iframe.style.setProperty('width', '100%', 'important');
    iframe.style.setProperty('height', '100%', 'important');
    iframe.style.setProperty('border', '0', 'important');
    iframe.style.setProperty('display', 'block', 'important');
};

let iframeObserver = null;

const applyIframeStyles = () => {
    if (!containerRef.value) return;

    containerRef.value.querySelectorAll('iframe').forEach(styleIframe);

    iframeObserver = new MutationObserver(() => {
        containerRef.value?.querySelectorAll('iframe').forEach(styleIframe);
    });

    iframeObserver.observe(containerRef.value, {
        childList: true,
        subtree: true
    });
};

let observer = null;

onMounted(() => {
    componentCount++;

    observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting && !isVisible.value) {
                    isVisible.value = true;
                    initializeSnack();
                    observer.unobserve(entry.target);
                }
            });
        },
        {
            rootMargin: '50px',
            threshold: 0.1
        }
    );

    if (containerRef.value) {
        observer.observe(containerRef.value);
    }
});

onUnmounted(() => {
    componentCount--;

    if (iframeObserver) {
        iframeObserver.disconnect();
        iframeObserver = null;
    }

    if (observer && containerRef.value) {
        observer.unobserve(containerRef.value);
    }

    if (componentCount === 0 && globalScript && globalScript.parentNode) {
        try {
            document.head.removeChild(globalScript);
            globalScript = null;
            scriptLoadPromise = null;
        } catch (error) {
            console.warn('Failed to remove Expo script:', error);
        }
    }
});
</script>

<template>
    <div ref="containerRef" :data-snack-code="code" :data-snack-dependencies="dependencies" :data-snack-name="name"
        :data-snack-description="description" :data-snack-preview="preview" :data-snack-platform="platform"
        :data-snack-supportedplatforms="supportedPlatforms" :data-snack-device-frame="deviceFrame"
        :data-snack-id="snackId || undefined" :style="{
            overflow: 'hidden',
            background: '#f7f7f7',
            border: '1px solid rgba(0,0,0,.08)',
            borderRadius: '4px',
            height: height,
            width: width,
            maxWidth: '100%',
            position: 'relative',
            boxSizing: 'border-box'
        }">

        <div v-if="scriptLoading && isVisible" :style="{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            color: '#666',
            fontSize: '14px'
        }">
            <div :style="{
                width: '20px',
                height: '20px',
                border: '2px solid #e3e3e3',
                borderTop: '2px solid #007AFF',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto 10px'
            }"></div>
            Loading preview...
        </div>

        <div v-if="!isVisible && !scriptLoading" :style="{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            textAlign: 'center',
            color: '#999',
            fontSize: '14px'
        }">
            React Native Preview
            <br>
            <small>Scroll to load</small>
        </div>
    </div>
</template>

<style scoped>
@keyframes spin {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>