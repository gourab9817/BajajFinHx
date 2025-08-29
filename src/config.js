const FULL_NAME = (process.env.FULL_NAME || "gourab choudhury").toLowerCase().replace(/\s+/g, "_")
const DOB_DDMMYYYY = process.env.DOB_DDMMYYYY || "17091999"
const EMAIL = process.env.EMAIL || "c.gourab180@gmail.com"
const ROLL_NUMBER = process.env.ROLL_NUMBER || "22BCE8609"

const userId = `${FULL_NAME}_${DOB_DDMMYYYY}`

module.exports = {
  fullName: FULL_NAME,
  dob: DOB_DDMMYYYY,
  email: EMAIL,
  rollNumber: ROLL_NUMBER,
  userId,
}
