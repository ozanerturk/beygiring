import { colors, names, uniqueNamesGenerator } from "unique-names-generator";
const UNIQUE_NAME_SEPARATOR = "-";

const config = {
    dictionaries: [colors, names],
    separator: UNIQUE_NAME_SEPARATOR,
};

export function randomNamePair() {
    return uniqueNamesGenerator(config).split(UNIQUE_NAME_SEPARATOR);
}

export function sample<T>(
    arr: T[],
    identifierField: keyof T,
    number: number,
): T[] {
    const map = new Map();
    if (number > arr.length) {
        throw new Error("Sample size exceeds array length");
    }
    while (map.size < number) {
        const item = arr[Math.floor(Math.random() * arr.length)];
        const id = item[identifierField];
        if (!map.has(id)) {
            map.set(id, item);
        }
    }
    return Array.from(map.values());
}
export const BASE_SPEED_METER_PER_SECOND= 100
export const ROUNDS_DISTANCE_IN_METER = [1200, 1400, 1600, 1800, 2000, 2200];
