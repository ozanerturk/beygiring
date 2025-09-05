<template>
    <div>
        <div class="page">
            <div class="header">
                <div class="header-button-group">
                    <input type="button" v-on:click="store.commit('program/generateProgram')"
                    :disabled="isRunning"
                        value="Generate New Program"></input>
                    <input type="button" 
                    :disabled="isComplete"
                    v-on:click="store.commit('program/toggleRace')" value="Start/Stop"></input>
                </div>
            </div>
            
            <div class="content">

                <RaceTrack class="content-body"></RaceTrack>
                <RaceProgram class="right-side"></RaceProgram>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import HorseList from '@/components/HorseList.vue';
import RaceProgram from '@/components/RaceProgram.vue';
import RaceTrack from '@/components/RaceTrack.vue';
import { onMounted, computed } from "vue";
import { RootState } from '@/store/types';
import { useStore } from 'vuex';

const store = useStore<RootState>();


onMounted(() => {
    store.commit("program/init");
    store.commit('program/generateProgram')
})
const isRunning = computed(() => {
    return store.getters['program/isRunning'];
})
const isComplete = computed(() => {
    return store.getters['program/isCompleted'];
})
</script>

<style scoped>
.header-button-group {
    padding: 10px;
    gap: 4px;

    display: flex;
    align-self: flex-end;
}

.header-button-group input {
    padding: 10px;
}

.header {
    min-height: 70px;
    display: flex;
    flex-direction: column;
}

.page {
    display: flex;
    flex-direction: column;
    flex:1;
    height: 100%;
    /* Fills remaining height in .outer */
}

.header {
    border-bottom: 1px solid rgb(109, 109, 109);;
}

.content {
    display: flex;
    flex: 1 1 auto;
    height: calc(100% - 70px);
}

.content-body {
    display: flex;
    flex: 1;
}

.left-side {
    border-right: 1px solid rgb(109, 109, 109);
    width: 300px;
}

.right-side {
    border-left: 1px solid rgb(109, 109, 109);;
    width: 500px;
    height: 100%;
    /* Fills remaining height in .middle */
    /* Scrolls when content overflows */
}

@media (max-width: 1024px) {
    .content {
        flex-direction: column;
    }
    .left-side, .right-side {
        width: 100%;
        border: none;
    }
    .content-body {
        min-height: 100vh;
    }
   
}


</style>