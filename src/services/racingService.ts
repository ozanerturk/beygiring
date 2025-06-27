import Program from "../entities/program";
import Race from "../entities/race";
import Horse from "../entities/horse";
import {
	randomNamePair,
	ROUNDS_DISTANCE_IN_METER,
    BASE_SPEED_METER_PER_SECOND,
	sample,
} from "../utils/randomUtils";


export const RacingService = {
	generateHorse(): Horse {
		const [color, name] = randomNamePair();
		const condition = Math.floor(Math.random() * 100) + 1;
		return { name, color, condition };
	},

	generateProgram(horses: Horse[], number_of_horses: number): Race[] {
        if (horses.length < number_of_horses) {
            throw new Error("Not enough horses");
        }
		return ROUNDS_DISTANCE_IN_METER.map((distance, index) => {
			const raceHorses = sample(horses, "name", number_of_horses);

			const horseProgress = new Map<string, number>();
			raceHorses.forEach((h) => horseProgress.set(h.name, 0));

			return {
				race_id: index,
				distance,
				complete: false,
				horse_progress: horseProgress,
				results: [],
			} as Race;
		});
	},

	processRace(race: Race, horses: Map<string, Horse>, dt: number) {
		for (const [horseName, progress] of race.horse_progress) {
			if (progress >= race.distance) continue;

			const horse = horses.get(horseName);
			if (!horse) throw new Error(`Horse ${horseName} not found`);

			const speed = (BASE_SPEED_METER_PER_SECOND + horse.condition) * dt/1000;
			const newProgress = Math.min((progress + speed), race.distance);
			race.horse_progress.set(horseName, newProgress);

			if (newProgress >= race.distance) {
				if (!race.results.find((h) => h.name === horse.name)) {
					race.results.push(horse);
				}
			}
		}

		const allFinished = Array.from(race.horse_progress.values()).every(
			(p) => p >= race.distance
		);

		if (allFinished) {
			race.complete = true;
			return true;
		}
        return false;
	},
};
