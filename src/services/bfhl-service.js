const { isDigitsOnly, isLettersOnly, toUpperAlphabet, splitLetters, sumBigIntStrings } = require("../utils/parse")
const { alternatingCapsReverse } = require("../utils/altcaps")

function classifyData(dataArray) {
  const even_numbers = []
  const odd_numbers = []
  const alphabets = []
  const special_characters = []

  const numberStrings = []
  const letterChars = []

  for (const item of dataArray) {
    const s = String(item)

    if (isDigitsOnly(s)) {
      numberStrings.push(s)
      const n = Number(s) // safe for parity check (only even/odd)
      if (n % 2 === 0) {
        even_numbers.push(s)
      } else {
        odd_numbers.push(s)
      }
    } else if (isLettersOnly(s)) {
      alphabets.push(toUpperAlphabet(s))
      // accumulate individual letters for concat_string
      for (const ch of splitLetters(s)) {
        // keep raw letter; casing handled later
        letterChars.push(ch)
      }
    } else {
      // everything else is special character per spec
      special_characters.push(s)
    }
  }

  const sum = sumBigIntStrings(numberStrings)
  const concat_string = alternatingCapsReverse(letterChars)

  return {
    even_numbers,
    odd_numbers,
    alphabets,
    special_characters,
    sum,
    concat_string,
  }
}

module.exports = { classifyData }
