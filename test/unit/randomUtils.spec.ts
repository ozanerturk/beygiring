import { describe, it, expect } from 'vitest';
import {
	randomNamePair,
	sample,
	BASE_SPEED_METER_PER_SECOND,
	ROUNDS_DISTANCE_IN_METER,
} from '../../src/utils/randomUtils';

describe('randomUtils', () => {
	// ✅ Test randomNamePair
	describe('randomNamePair', () => {
		it('should return a pair of [color, name]', () => {
			const result = randomNamePair();
			expect(result).toBeInstanceOf(Array);
			expect(result.length).toBe(2);
			const [color, name] = result;
			expect(typeof color).toBe('string');
			expect(typeof name).toBe('string');
			expect(color.length).toBeGreaterThan(0);
			expect(name.length).toBeGreaterThan(0);
		});

		it('should produce varying results over multiple runs', () => {
			const results = new Set(
				Array.from({ length: 50 }, () => randomNamePair().join('-'))
			);
			expect(results.size).toBeGreaterThan(1); // Not always the same
		});
	});

	// ✅ Test sample
	describe('sample', () => {
		const items = [
			{ id: 'a', value: 1 },
			{ id: 'b', value: 2 },
			{ id: 'c', value: 3 },
			{ id: 'd', value: 4 },
			{ id: 'e', value: 5 },
		];

		it('should return the requested number of unique samples', () => {
			const result = sample(items, 'id', 3);
			expect(result.length).toBe(3);

			const uniqueIds = new Set(result.map(i => i.id));
			expect(uniqueIds.size).toBe(3);
		});

		it('should return all items if number equals array length', () => {
			const result = sample(items, 'id', items.length);
			expect(result.length).toBe(items.length);

			const ids = result.map(i => i.id);
			expect(new Set(ids).size).toBe(items.length);
		});

		it('should throw if number exceeds array length', () => {
			expect(() => sample(items, 'id', items.length + 1)).toThrowError(
				'Sample size exceeds array length'
			);
		});

		it('should return different orderings over multiple calls', () => {
			const res1 = sample(items, 'id', 3).map(i => i.id).join('');
			const res2 = sample(items, 'id', 3).map(i => i.id).join('');
			// Not always true, but highly likely
			expect(res1).not.toBe(res2);
		});
	});

	// ✅ Test constants
	describe('constants', () => {
		it('BASE_SPEED_METER_PER_SECOND should be a positive number', () => {
			expect(BASE_SPEED_METER_PER_SECOND).toBeGreaterThan(0);
		});

		it('ROUNDS_DISTANCE_IN_METER should be an array of numbers', () => {
			expect(Array.isArray(ROUNDS_DISTANCE_IN_METER)).toBe(true);
			ROUNDS_DISTANCE_IN_METER.forEach(distance => {
				expect(typeof distance).toBe('number');
				expect(distance).toBeGreaterThan(0);
			});
		});
	});
});
