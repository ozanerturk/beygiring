<template>
    <div class="race-program">
        <div class="race-item">
            <div class="race-header"> Program </div>
            <table class="horse-table"  v-for="(race, index) in races" :key="index">
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
                        <td>
                            <IconSquare :size="12" v-bind:style="{'color':getColor(horseName)}"></IconSquare>
                            {{horseName}}
                        </td>
                    </tr>
                </tbody>

            </table>
        </div>
        <div class="race-item">
            <div class="race-header">Results</div>
            <table class="horse-table" v-for="(race, index) in races.filter((race) => race.results.length)" :key="index">
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
                    <tr v-for="(horse,index) in race.results" :key="horse.name">
                        <td>#{{index+1}}</td>
                        <td>
                            <IconSquare :size="12" v-bind:style="{'color':horse.color}"></IconSquare>
                            {{horse.name}}
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



function getColor(horseName) {
    return store.getters["program/horses"].get(horseName).color
}
const races = computed(() => {
    return store.getters["program/races"]
});

</script>

<style scoped>
.race-header {
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    background-color: gray;
    color: white;
    padding: 4px;
}

.race-program {
    display: flex;
    flex-direction: row;
    height: 100%;
}

.race-item {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
    overflow: auto;
    font-size: 12px;
}
.horse-table{
    margin-top:12px;
}
</style>