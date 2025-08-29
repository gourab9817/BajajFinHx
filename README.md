// <CHANGE> Project overview and usage instructions

# BFHX

Plain Node.js serverless API + static frontend.

- Endpoint: POST /bfhl
- Frontend: public/index.html (fetches /bfhl)
- Hosting: Vercel (via vercel.json rewrite to map /bfhl -> /api/bfhl)

## Request
\`\`\`json
{ "data": ["a","1","334","4","R","$"] }
\`\`\`

## Response
Fields include:
- is_success (boolean)
- user_id (full_name_ddmmyyyy, lowercase name)
- email, roll_number
- odd_numbers, even_numbers (numbers as strings)
- alphabets (uppercased)
- special_characters
- sum (string, BigInt-safe)
- concat_string (reverse of all letters, alternating caps)

## Environment Variables
- FULL_NAME (e.g. john doe)
- DOB_DDMMYYYY (e.g. 17091999)
- EMAIL (e.g. john@xyz.com)
- ROLL_NUMBER (e.g. ABCD123)

## Run (Vercel)
- Deploy this repo to Vercel.
- Open the deployment URL; you’ll land on the UI (public/index.html).
- Click Send to /bfhl to test.
