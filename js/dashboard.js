/******************************************************
 * PAGE LOAD
 ******************************************************/
document.addEventListener("DOMContentLoaded", initDashboard);

let trendChart;
let skillChart;

async function initDashboard() {
  await loadSchoolName();
  await loadTiles();
  await loadTrend();
  await loadSkillBars();
  await loadStudentTable();

  document.getElementById("refreshBtn").addEventListener("click", initDashboard);
}


/******************************************************
 * SCHOOL NAME
 ******************************************************/
async function loadSchoolName() {
  const config = await callScript("getConfig");
  if (config.school_name) {
    document.getElementById("schoolName").innerText =
      config.school_name + " – Work Habits Dashboard";
  }
}


/******************************************************
 * TILES (Skill Averages)
 ******************************************************/
async function loadTiles() {
  const data = await callScript("getSkillAverages");
  const container = document.getElementById("tilesContainer");
  container.innerHTML = "";

  Object.keys(data).forEach(skill => {
    const avg = data[skill];
    const colorClass = avg >= 3 ? "blue-tile" : "red-tile";

    const div = document.createElement("div");
    div.className = "tile " + colorClass;

    div.innerHTML = `
      <div class="tile-title">${skill}</div>
      <div class="tile-value">${avg.toFixed(2)}</div>
    `;

    container.appendChild(div);
  });
}


/******************************************************
 * TREND CHART
 ******************************************************/
async function loadTrend() {
  const data = await callScript("getTrendData");
  const labels = data.map(row => row.month);
  const values = data.map(row => row.average);

  if (trendChart) trendChart.destroy();

  const ctx = document.getElementById("trendChart").getContext("2d");
  trendChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: labels,
      datasets: [{
        label: "Average Score",
        data: values,
        borderColor: "#2196F3",
        backgroundColor: "rgba(33, 150, 243, 0.2)",
        tension: 0.2,
        fill: true
      }]
    },
    options: {
      scales: {
        y: { min: 0, max: 4 }
      }
    }
  });
}


/******************************************************
 * SKILL BAR CHART
 ******************************************************/
async function loadSkillBars() {
  const data = await callScript("getSkillAverages");
  const labels = Object.keys(data);
  const values = Object.values(data);

  if (skillChart) skillChart.destroy();

  const ctx = document.getElementById("skillChart").getContext("2d");

  skillChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [{
        label: "Average Score",
        data: values,
        backgroundColor: values.map(v => v >= 3 ? "#2196F3" : "#D32F2F")
      }]
    },
    options: {
      scales: {
        y: { min: 0, max: 4 }
      }
    }
  });
}


/******************************************************
 * STUDENT TABLE
 ******************************************************/
async function loadStudentTable() {
  const data = await callScript("getStudentAverages");
  const tbody = document.querySelector("#studentTable tbody");
  tbody.innerHTML = "";

  Object.keys(data).forEach(student => {
    const avg = data[student];
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${student}</td>
      <td style="color:${avg >= 3 ? "blue" : "red"}">${avg.toFixed(2)}</td>
    `;
    tbody.appendChild(row);
  });
}
