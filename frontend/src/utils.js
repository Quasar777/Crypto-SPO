export function percentDifference(a, b) {
  return +(100 * Math.abs((a - b) / ((a + b) / 2))).toFixed(2)
}

export function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.substr(1)
}

export function getReadableDate(str) {
  var d = new Date(str)
  let year = d.getFullYear()
  let month = d.getMonth()
  let day = d.getDate()

  if (month < 10) {
    month = '0' + month
  }
  if (day < 10) {
    day = '0' + day
  }
  
  return year + '.' + month + '.' + day 
}