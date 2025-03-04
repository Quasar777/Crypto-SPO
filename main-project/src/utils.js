export function percentDifference(a, b) {
    return +(100 * Math.abs( (a - b) / ((a + b)/2) )).toFixed(6)
}

export function capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.substr(1)
}