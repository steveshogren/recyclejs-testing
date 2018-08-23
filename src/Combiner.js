import { combineLatest } from 'rxjs/observable/combineLatest';

let overwrite = (state,x) => x;
export function Combiner(outputs) {
    return [
        combineLatest(
            outputs.map(([svc, val])=>svc[val]),
            function (...results) {
                const kvs = results.map((o, i) => [o, outputs[i][1]]);
                const newState =  kvs.reduce((map, [o,k])=> {
                    map[k] = o;
                    return map;} , {});
                return newState;
            }
        ).reducer(overwrite)];
}
