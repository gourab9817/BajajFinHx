const { handleBfhl } = require("../src/controllers/bfhl-controller")

// Minimal JSON body parser for Node serverless functions
function readJsonBody(req) {
  return new Promise((resolve) => {
    try {
      if (req.body && typeof req.body === "object") {
        return resolve({ json: req.body, error: null })
      }
    } catch {}
    let data = ""
    req.on("data", (chunk) => {
      data += chunk
      // basic protection from huge payloads
      if (data.length > 1e6) {
        req.connection.destroy()
      }
    })
    req.on("end", () => {
      try {
        const parsed = data ? JSON.parse(data) : {}
        resolve({ json: parsed, error: null })
      } catch (e) {
        resolve({ json: null, error: "Invalid JSON body" })
      }
    })
  })
}

function sendJson(res, status, obj) {
  res.statusCode = status
  res.setHeader("Content-Type", "application/json; charset=utf-8")
  res.end(JSON.stringify(obj))
}

function setCors(res) {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS")
  res.setHeader("Access-Control-Allow-Headers", "Content-Type")
}

module.exports = async (req, res) => {
  setCors(res)
  if (req.method === "OPTIONS") {
    res.statusCode = 204
    return res.end()
  }

  if (req.method !== "POST") {
    return sendJson(res, 405, {
      is_success: false,
      user_id: require("../src/config").userId,
      message: "Method Not Allowed. Use POST /bfhl",
    })
  }

  const { json, error } = await readJsonBody(req)
  if (error) {
    const { userId, email, rollNumber } = require("../src/config")
    return sendJson(res, 200, {
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
      message: "Invalid JSON body",
    })
  }

  try {
    const result = handleBfhl(json)
    return sendJson(res, 200, result)
  } catch (e) {
    const { userId, email, rollNumber } = require("../src/config")
    return sendJson(res, 200, {
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
      message: e?.message || "Unexpected error",
    })
  }
}
