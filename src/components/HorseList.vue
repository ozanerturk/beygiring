<template>
    <div>

        <table>
            <thead>
                <tr>
                    <th colspan="3">Horse List ({{horseCount}}) </th>
                </tr>
                <tr>
                    <th>Name</th>
                    <th>Color</th>
                    <th>Condition</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="horse in horses" :key="horse.name">
                    <td>
                        <IconSquare :size="12" style="border:1px solid black" v-bind:style="{'color':horse.color}"></IconSquare> {{horse.name}}
                    </td>
                    <td>{{horse.color}}</td>
                    <td>{{horse.condition}}</td>
                </tr>
            </tbody>

        </table>
    </div>
</template>

<script setup lang="ts">
import IconSquare from './icons/IconSquare.vue';
import { onMounted, computed } from "vue";
import { RootState } from '@/store/types';
import { useStore } from 'vuex';

const store = useStore<RootState>();

const horseCount = computed(() => {
    return store.getters["program/horses"].size
})
const horses = computed(() => {
    return store.getters["program/horses"].values()
})
</script>

<style scoped></style>