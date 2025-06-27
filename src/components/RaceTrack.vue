<template>

    <div class="track">
        <div v-if="race" class="race">
            <div class="race-header"> #{{race.race_id + 1}} Lap ({{race.distance}}m)</div>

            <div class="horse-container">
                <div class="horse-runway" v-for="(horse,place) in race.horse_progress.keys()" :key="horse">
                    <div class="place-tag">
                        <span>{{ place+1 }}

                        </span>
                    </div>
                    <RacingHorse class="running-horse" :name="horse" :color="getColor(horse)"
                        :speed="calculate_speed(race,horse)" v-bind:style="{'left':calculate_left(race,horse)}">

                    </RacingHorse>
                </div>
            </div>

        </div>
        <div v-else>Click to start</div>
    </div>


</template>

<script setup lang="ts">
import RacingHorse from './RacingHorse.vue';
import IconSquare from './icons/IconSquare.vue';
import { onMounted, computed,ref, onUnmounted,watch } from "vue";
import { RootState } from '@/store/types';
import { useStore } from 'vuex';


const store = useStore<RootState>();

const animationFrameId = ref<number | null>(null);
const lastTimestamp = ref<number | null>(null);

const race = computed(() => {
    return store.getters['program/activeRace'];
})

const isRunning = computed(() => {
    return store.getters['program/isRunning'];
})
const isCompleted = computed(() => {
    return store.getters['program/isCompleted'];
})

function calculate_speed(race,horseName) {
    if(isRunning.value === false) return 0
    const progress = race.horse_progress.get(horseName);
    if (progress >= race.distance) return 0
    return store.getters["program/horses"].get(horseName).condition/1000+4
}
function calculate_left(race, horseName) {
    const progress = race.horse_progress.get(horseName);
    const percentage = (progress / race.distance) * 100;
    return `calc(${percentage}% - 30px)`;
}

function getColor(horseName) {
    return store.getters["program/horses"].get(horseName).color
}
function gameLoop(timestamp: number) {
    if (lastTimestamp.value !== null) {
        const dt = (timestamp - lastTimestamp.value); // Convert ms → seconds
        store.commit('program/processRace', dt);
    }
    lastTimestamp.value = timestamp;
    animationFrameId.value = requestAnimationFrame(gameLoop);
}

function startSimulation() {
    lastTimestamp.value = null;
    animationFrameId.value = requestAnimationFrame(gameLoop);
}

function stopSimulation() {
    if (animationFrameId.value !== null) {
        cancelAnimationFrame(animationFrameId.value);
        animationFrameId.value = null;
    }

}


onMounted(() => {
    
});

onUnmounted(() => {
    stopSimulation();
});

watch(isRunning, (newValue) => {
    if (newValue) {
        startSimulation();
    } else {
        stopSimulation();
    }
});
</script>

<style scoped>
.race-header {
    text-align: center;
    font-size: 2em;
}

.running-horse {
    position: absolute;
    align-self: anchor-center;
    bottom: 0px;
    left: 100%;
}

.horse-container {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.place-tag span {
    transform: rotate(-90deg);
}

.place-tag {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 60px;
    height: 100%;
    background-color: red;
}

.horse-runway {
    flex: 1;
    position: relative;
    width: calc(100% - 100px);
    border-bottom: 1px solid black;
    border-right: 1px solid black;
}

.horse-runway:first-child {
    border-top: 1px solid black;

}

.race {
    background-color: green;
    flex: 1;
    height: 100%;
    padding: 20px;
    display: flex;
    flex-direction: column;
}

.track {
    display: flex;
    justify-content: center;
    align-items: center;
}
</style>