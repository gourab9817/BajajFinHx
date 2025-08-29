const { classifyData } = require("../services/bfhl-service")
const { userId, email, rollNumber } = require("../config")

function handleBfhl(body) {
  // Expect { data: string[] }
  if (!body || !Array.isArray(body.data)) {
    return {
      is_success: false,
      user_id: userId,
      email,
      roll_number: rollNumber,
      odd_numbers: [],
      even_numbers: [],
      alphabets: [],
      special_characters: [],
      sum: "0",
      concat_string: "",
      message: "Body must be JSON with a 'data' array",
    }
  }

  const { even_numbers, odd_numbers, alphabets, special_characters, sum, concat_string } = classifyData(body.data)

  return {
    is_success: true,
    user_id: userId,
    email,
    roll_number: rollNumber,
    odd_numbers,
    even_numbers,
    alphabets,
    special_characters,
    sum,
    concat_string,
  }
}

module.exports = { handleBfhl }
