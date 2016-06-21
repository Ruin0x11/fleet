export function getInitializedArray(value) {
    // initialize array to 'value' for all 12 ships
    return Array.apply(null, Array(12)).map(Number.prototype.valueOf,value);
}
