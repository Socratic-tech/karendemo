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

async function saveSchoolName() {
  const name = document.getElementById("schoolNameInput").value;
  await callScript("submitEntry", {}); // Placeholder for update config
  alert("Saving config in Apps Script requires a helper function,\nwe can easily add that next.");
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
