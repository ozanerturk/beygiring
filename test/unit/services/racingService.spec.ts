import { describe, it, expect, beforeEach, vi } from 'vitest';
import { RacingService } from '../../../src/services/racingService';
import { BASE_SPEED_METER_PER_SECOND, ROUNDS_DISTANCE_IN_METER } from '../../../src/utils/randomUtils';
import Horse from '../../../src/entities/horse';
import Race from '../../../src/entities/race';

describe('RacingService', () => {
	let horses: Horse[];
	let horseMap: Map<string, Horse>;

	beforeEach(() => {
		// Generate 10 horses
		horses = Array.from({ length: 10 }, () => RacingService.generateHorse());
		horseMap = new Map(horses.map(h => [h.name, h]));
	});

	// ✅ Horse Generation
	it('should generate a horse with name, color, and condition', () => {
		const horse = RacingService.generateHorse();
		expect(horse).toHaveProperty('name');
		expect(horse).toHaveProperty('color');
		expect(horse).toHaveProperty('condition');
		expect(typeof horse.name).toBe('string');
		expect(typeof horse.color).toBe('string');
		expect(typeof horse.condition).toBe('number');
		expect(horse.condition).toBeGreaterThanOrEqual(1);
		expect(horse.condition).toBeLessThanOrEqual(100);
	});

	// ✅ Program (Race List) Generation
	it('should generate races based on number of horses', () => {
		const races = RacingService.generateProgram(horses, 5);

		expect(races.length).toBe(ROUNDS_DISTANCE_IN_METER.length);

		races.forEach(race => {
			expect(race.horse_progress.size).toBe(5);
			expect(race.complete).toBe(false);
			expect(race.results.length).toBe(0);
		});
	});

	it('should throw if not enough horses', () => {
		expect(() => RacingService.generateProgram(horses, 20)).toThrowError('Not enough horses');
	});

	// ✅ Process Race Logic
	it('should progress horses when processing the race', () => {
		const [race] = RacingService.generateProgram(horses, 3);
		const initialProgress = [...race.horse_progress.values()].map(p => p);

		RacingService.processRace(race, horseMap, 1000); // dt = 1000ms = 1 second

		const afterProgress = [...race.horse_progress.values()];

		afterProgress.forEach((progress, idx) => {
			expect(progress).toBeGreaterThan(initialProgress[idx]);
		});
	});

	it('should mark horses as complete when distance is reached', () => {
		const [race] = RacingService.generateProgram(horses, 3);

		// Fake a high dt to force finish in one step
		const dt = race.distance * 1000; // Enough time to cover entire distance

		const finished = RacingService.processRace(race, horseMap, dt);

		expect(finished).toBe(true);
		expect(race.complete).toBe(true);
		expect(race.results.length).toBe(3);

		// All horses should have progress equal to distance
		race.horse_progress.forEach(progress => {
			expect(progress).toBeGreaterThanOrEqual(race.distance);
		});
	});

	it('should not duplicate results if processed multiple times after completion', () => {
		const [race] = RacingService.generateProgram(horses, 2);

		const dt = race.distance * 1000;
		RacingService.processRace(race, horseMap, dt);
		RacingService.processRace(race, horseMap, dt); // process again

		expect(race.results.length).toBe(2); // No duplicates
	});

	// ✅ Error Cases
	it('should throw if horse is missing from map', () => {
		const [race] = RacingService.generateProgram(horses, 3);

		// Remove one horse
		const firstHorseName = Array.from(race.horse_progress.keys())[0];
		horseMap.delete(firstHorseName);

		expect(() => RacingService.processRace(race, horseMap, 1000)).toThrowError(
			`Horse ${firstHorseName} not found`
		);
	});
});
