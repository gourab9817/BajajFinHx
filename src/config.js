const FULL_NAME = (process.env.FULL_NAME || "john_doe").toLowerCase().replace(/\s+/g, "_")
const DOB_DDMMYYYY = process.env.DOB_DDMMYYYY || "17091999"
const EMAIL = process.env.EMAIL || "john@xyz.com"
const ROLL_NUMBER = process.env.ROLL_NUMBER || "ABCD123"

const userId = `${FULL_NAME}_${DOB_DDMMYYYY}`

module.exports = {
  fullName: FULL_NAME,
  dob: DOB_DDMMYYYY,
  email: EMAIL,
  rollNumber: ROLL_NUMBER,
  userId,
}
