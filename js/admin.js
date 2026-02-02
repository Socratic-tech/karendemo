document.addEventListener("DOMContentLoaded", initAdmin);

async function initAdmin() {
  await loadCurrentConfig();
  await loadSkills();

  document.getElementById("saveSchoolNameBtn").addEventListener("click", saveSchoolName);
  document.getElementById("uploadCsvBtn").addEventListener("click", uploadCSV);
}


/******************************************************
 * CONFIG
 ******************************************************/
async function loadCurrentConfig() {
  const config = await callScript("getConfig");
  document.getElementById("schoolNameInput").value = config.school_name || "";
}

// In admin.js

async function saveSchoolName() {
  const name = document.getElementById("schoolNameInput").value;
  
  // CHANGED: Now calls the correct action 'updateSchoolName'
  const result = await callScript("updateSchoolName", { school_name: name });
  
  if (result.status === "success") {
    alert("School Name Saved!");
  } else {
    alert("Error saving: " + (result.error || "Unknown error"));
  }
}


/******************************************************
 * SKILLS LOADING
 ******************************************************/
async function loadSkills() {
  const table = document.querySelector("#skillsTable tbody");
  table.innerHTML = "";

  const skills = await callScript("getSkills");

  skills.forEach(skill => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${skill.skill_name}</td>
      <td>${skill.active}</td>
      <td>${skill.sort_order}</td>
    `;

    table.appendChild(row);
  });
}


/******************************************************
 * CSV UPLOAD
 ******************************************************/
async function uploadCSV() {
  const fileInput = document.getElementById("csvInput");
  const file = fileInput.files[0];
  if (!file) return alert("Select a CSV file first.");

  const text = await file.text();
  const result = await callScript("importStudentsCSV", { csv: text });

  alert("Uploaded " + result.count + " students.");
}
async function saveSchoolName() {
  console.log("Button clicked..."); // Check your browser console for this
  const nameInput = document.getElementById("schoolNameInput");
  const name = nameInput.value;
  
  if (!name) {
    alert("Please enter a name");
    return;
  }

  // Visual feedback that something is happening
  const btn = document.getElementById("saveSchoolNameBtn");
  btn.innerText = "Saving...";
  btn.disabled = true;

  try {
    // Send to Google Script
    const result = await callScript("updateSchoolName", { school_name: name });
    console.log("Result:", result);

    if (result.status === "success") {
      alert("Saved successfully!");
    } else {
      alert("Error: " + JSON.stringify(result));
    }
  } catch (e) {
    console.error(e);
    alert("Request failed. Check console.");
  } finally {
    // Reset button
    btn.innerText = "Save";
    btn.disabled = false;
  }
}