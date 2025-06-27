<template>
        <div class="race-program">
            <div class="race-item">
                <div> Program </div>
                <table v-for="(race, index) in races" :key="index">
                    <thead>
                        <tr>
                            <th colspan="3">#{{index+1}} Lap - {{race.distance}}m </th>
                        </tr>
                        <tr>
                            <th>Position</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(horseName,index) in race.horse_progress.keys()" :key="horseName">
                            <td>#{{index+1}}</td>
                            <td> {{horseName}}
                            </td>
                        </tr>
                    </tbody>

                </table>
            </div>
            <div class="race-item"> Results
                <table v-for="(race, index) in races.filter((race) => race.results.length)" :key="index">
                    <thead>
                        <tr>
                            <th colspan="3">#{{index+1}} Lap - {{race.distance}}m </th>
                        </tr>
                        <tr>
                            <th>Position</th>
                            <th>Name</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(horse,index) in race.results" :key="horseName">
                            <td>#{{index+1}}</td>
                            <td> {{horse.name}}
                            </td>
                        </tr>
                    </tbody>

                </table>
            </div>
        </div>
</template>

<script setup lang="ts">
import IconSquare from './icons/IconSquare.vue';
import { onMounted, computed } from "vue";
import { RootState } from '@/store/types';
import { useStore } from 'vuex';

const store = useStore<RootState>();



const races = computed(() => {
    return store.getters["program/races"]
});

</script>

<style scoped>
.race-program {
    display: flex;
    flex-direction: row;
    height:100%;
}

.race-item {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    overflow: auto;
}
</style>