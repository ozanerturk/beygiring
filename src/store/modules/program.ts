import { Module } from "vuex";
import { RootState } from "../types";
import { RacingService } from "../../services/racingService";

const TOTAL_HORSE_COUNT = 20;
const RACE_HORSE_SIZE = 10;

export interface ProgramState {
	horses: Map<string, Horse>;
	races: Race[];
	running: boolean;
	completed: boolean;
	activeRaceIndex: string;
}

export const program: Module<ProgramState, RootState> = {
	namespaced: true,
	state: () => ({
		horses: new Map<string, Horse>(),
		races: [],
		running: false,
		completed: false,
		activeRaceIndex: -1,
	}),

	mutations: {
		init(state) {
			if (state.horses.size) {
				throw new Error("Horses already loaded");
			}
			for (let i = 0; i < TOTAL_HORSE_COUNT; i++) {
				const horse = RacingService.generateHorse();
				state.horses.set(horse.name, horse);
			}
		},
		generateProgram(state) {
			if (state.running) {
				throw new Error("A race is already running");
			}
			if (!state.horses.size) {
				throw new Error("No horses loaded");
			}
			const horses = Array.from(state.horses.values());
			state.races = RacingService.generateProgram(horses, RACE_HORSE_SIZE);
			state.activeRaceIndex = 0;
			state.completed = false;
		},

		toggleRace(state) {
			if (state.running) {
				state.running = false;
			} else {
				if (!state.races.length) {
					throw new Error("No racess");
				}
				state.activeRaceIndex = 0;
				state.completed = false;
				state.running = true;
			}
		},

		processRace(state, dt) {
			if (!state.running) throw new Error("Not running");
			if (state.completed) throw new Error("Program complete");

			const race = state.races[state.activeRaceIndex];
			const raceComplete = RacingService.processRace(race, state.horses, dt);

			if (raceComplete) {
				if (state.activeRaceIndex + 1 < state.races.length) {
					state.activeRaceIndex += 1;
				} else {
					//complete program
					state.completed = true;
					state.running = false;
				}
			}
		},
	},

	getters: {
		horses(state) {
			return state.horses;
		},
		activeRace(state) {
			return state.races[state.activeRaceIndex];
		},
		races(state) {
			return state.races;
		},
		isRunning(state) {
			return state.running;
		},
		isCompleted(state) {
			return state.completed;
		},
	},
};
