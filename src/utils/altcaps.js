function alternatingCapsReverse(chars) {
  // chars: array of letters (single characters)
  const reversed = [...chars].reverse()
  return reversed.map((ch, idx) => (idx % 2 === 0 ? ch.toUpperCase() : ch.toLowerCase())).join("")
}

module.exports = { alternatingCapsReverse }
