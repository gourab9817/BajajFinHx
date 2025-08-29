function isDigitsOnly(str) {
  return typeof str === "string" && /^[0-9]+$/.test(str)
}

function isLettersOnly(str) {
  return typeof str === "string" && /^[A-Za-z]+$/.test(str)
}

function toUpperAlphabet(str) {
  return str.toUpperCase()
}

function splitLetters(str) {
  return Array.from(str)
}

function sumBigIntStrings(arr) {
  try {
    const total = arr.reduce((acc, s) => acc + BigInt(s), 0n)
    return total.toString()
  } catch {
    return "0"
  }
}

module.exports = {
  isDigitsOnly,
  isLettersOnly,
  toUpperAlphabet,
  splitLetters,
  sumBigIntStrings,
}
