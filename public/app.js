;(() => {
  const input = document.getElementById("input")
  const sendBtn = document.getElementById("sendBtn")
  const clearBtn = document.getElementById("clearBtn")
  const sampleA = document.getElementById("sampleA")
  const sampleB = document.getElementById("sampleB")
  const sampleC = document.getElementById("sampleC")
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

  // Sample data buttons
  if (sampleA) {
    sampleA.addEventListener("click", () => {
      input.value = '["a","1","334","4","R","$"]'
    })
  }
  if (sampleB) {
    sampleB.addEventListener("click", () => {
      input.value = '["2","a","y","4","&","-","*","5","92","b"]'
    })
  }
  if (sampleC) {
    sampleC.addEventListener("click", () => {
      input.value = '["A","ABcD","DOE"]'
    })
  }
})()
