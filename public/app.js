;(() => {
  const input = document.getElementById("input")
  const sendBtn = document.getElementById("sendBtn")
  const clearBtn = document.getElementById("clearBtn")
  const responseEl = document.getElementById("response")

  function parseUserInput(raw) {
    const trimmed = (raw || "").trim()
    if (!trimmed) return []
    // Try JSON first
    try {
      const parsed = JSON.parse(trimmed)
      if (Array.isArray(parsed)) return parsed.map((x) => String(x))
    } catch {}
    // Fallback: comma-separated
    return trimmed.split(",").map((s) => s.trim())
  }

  async function postData(arr) {
    const res = await fetch("/bfhl", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: arr }),
    })
    const json = await res.json().catch(() => ({}))
    return json
  }

  function show(obj) {
    responseEl.textContent = JSON.stringify(obj, null, 2)
  }

  sendBtn.addEventListener("click", async () => {
    const arr = parseUserInput(input.value)
    show({ status: "sending...", data: arr })
    try {
      const json = await postData(arr)
      show(json)
    } catch (e) {
      show({ is_success: false, message: e?.message || "Request failed" })
    }
  })

  clearBtn.addEventListener("click", () => {
    input.value = ""
    show({})
  })

  // Prefill example
  input.value = '["a","1","334","4","R","$"]'
})()
