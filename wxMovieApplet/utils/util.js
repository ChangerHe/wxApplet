function countingStars (str) {
  var arr = []
  var a = [1, 1, 1, 1, 1].slice(0,str.slice(0, 1))
  var c = str.slice(1, 2) == '5' ? [2] : []
  arr = arr.concat(a).concat(c)
  var b = [0, 0, 0, 0, 0].slice(arr.length, 5)
  arr = arr.concat(b)
  return arr 
}

module.exports = {
  countingStars
}