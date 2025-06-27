import Horse from "./horse";
export default interface Race {
    race_id: number; //unique identifier
    distance: number;
    complete: boolean;
    horse_progress: Map<string, number>; //horse_name, distance
    results: string[];
}
