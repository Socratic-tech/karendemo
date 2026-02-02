/******************************************************
 * API CONFIG
 ******************************************************/

// Your new deployed URL
const APPS_SCRIPT_URL = "https://script.google.com/a/macros/berrienresa.org/s/AKfycbznQVqPrweUfNRV58WmvCqhAcztd9XIJa4kxq5GzEiCO76YUgEFir_YlG-EZVESPWPe/exec";


/******************************************************
 * WRAPPER FOR CALLING GOOGLE APPS SCRIPT
 ******************************************************/
async function callScript(action, payload = {}) {
  const body = JSON.stringify({ action, payload });

  // Note: 'credentials: "include"' is often needed for Org-restricted scripts
  // so the browser sends the user's cookies.
  const response = await fetch(APPS_SCRIPT_URL, {
    method: "POST",
    body: body,
    headers: { "Content-Type": "text/plain;charset=utf-8" }, 
    // ^ specific header helps avoid CORS pre-flight issues in some simple requests
  });

  return response.json();
}