<template>
    <div>
        <div class="wrapper">
            <div class="name-tag">
                <IconSquare :size="9" v-bind:style="{color:color}"></IconSquare>
                <span>{{ name }}</span>
            </div>
            <div class="horse" :style="horseStyle">
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import IconSquare from "@/components/icons/IconSquare.vue"
const props = defineProps<{
    speed: number;
    color:string,
    name:string
}>();

const horseStyle = computed(() => {
    return {
        '--gallop-duration': `${1 / props.speed}s`,
    };
});
</script>
<style scoped>
.name-tag span {
    margin-left: 4px;
}

.name-tag {
    display: flex;
    position: absolute;
    bottom: 0px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 12px;
}

.wrapper {
    position: relative;
    width: 100%;
}

.horse {
    width: 110px;
    transform: scale(0.5);
    height: 58px;
    background-image: url(/images/galloping.png);
    background-repeat: no-repeat;
    animation: gallop-ea2ee02f var(--gallop-duration, 0.2s) steps(7) infinite;
    background-position-y: -14px;
}

@keyframes gallop {
    from {
        background-position: 0 -14px;
    }

    to {
        background-position: -777px -14px;
    }
}
</style>
