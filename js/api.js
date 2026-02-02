/******************************************************
 * API CONFIG
 ******************************************************/

// Schools paste their Apps Script URL here (we also load it from config sheet)
const APPS_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxa76g7obJbQL9au7m4Syt-u2w6Yj-fTD8kzJoG4IALgFc6iQP5dH4AeT40OS7ugiSi/exec";


/******************************************************
 * WRAPPER FOR CALLING GOOGLE APPS SCRIPT
 ******************************************************/
async function callScript(action, payload = {}) {
  const body = JSON.stringify({ action, payload });

  const response = await fetch(APPS_SCRIPT_URL, {
    method: "POST",
    body: body,
    headers: { "Content-Type": "application/json" },
  });

  return response.json();
}
