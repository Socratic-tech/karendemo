/******************************************************
 * PAGE INIT
 ******************************************************/
document.addEventListener("DOMContentLoaded", initForm);

async function initForm() {
  await loadSchoolName();
  await loadStudents();
  await loadSkills();

  document.getElementById("submitBtn").addEventListener("click", submitEntry);

  // Modal buttons
  document.getElementById("newEntryBtn").addEventListener("click", () => {
    closeSuccessModal();
    resetForm();
  });

  document.getElementById("goDashboardBtn").addEventListener("click", () => {
    window.location.href = "dashboard.html";
  });
}


/******************************************************
 * SCHOOL NAME
 ******************************************************/
async function loadSchoolName() {
  const config = await callScript("getConfig");
  if (config.school_name) {
    document.getElementById("schoolName").innerText =
      config.school_name + " – Work Habits Entry";
  }
}


/******************************************************
 * STUDENTS
 ******************************************************/
async function loadStudents() {
  const data = await callScript("getStudents");
  const sel = document.getElementById("studentSelect");
  sel.innerHTML = "";

  data.forEach(stu => {
    const opt = document.createElement("option");
    opt.value = stu.student_id;
    opt.textContent = stu.student_name;
    sel.appendChild(opt);
  });
}


/******************************************************
 * SKILLS
 ******************************************************/
let skillList = [];

async function loadSkills() {
  const container = document.getElementById("skillsContainer");
  const data = await callScript("getSkills");

  skillList = data;
  container.innerHTML = "";

  data.forEach(skill => {
    const block = document.createElement("div");
    block.className = "skill-block";

    block.innerHTML = `
      <label>${skill.skill_name}</label>
      <div class="button-group" data-skill="${skill.skill_id}">
        <button class="score-btn" data-value="1">1</button>
        <button class="score-btn" data-value="2">2</button>
        <button class="score-btn" data-value="3">3</button>
        <button class="score-btn" data-value="4">4</button>
      </div>
    `;

    container.appendChild(block);
  });

  // Activate tile selection
  document.querySelectorAll(".score-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      const group = this.parentElement;
      group.querySelectorAll(".score-btn").forEach(b => b.classList.remove("selected"));
      this.classList.add("selected");
    });
  });
}


/******************************************************
 * SUBMIT ENTRY
 ******************************************************/
async function submitEntry() {
  const studentId = document.getElementById("studentSelect").value;
  const attendance = document.getElementById("attendanceSelect").value;
  const date = new Date().toLocaleDateString();

  // Collect scores
  let scores = [];
  for (const skill of skillList) {
    const selected = document.querySelector(
      `.button-group[data-skill="${skill.skill_id}"] .score-btn.selected`
    );
    if (!selected) {
      alert("Please select a score for: " + skill.skill_name);
      return;
    }
    scores.push({ skill_id: skill.skill_id, score: selected.dataset.value });
  }

  const payload = {
    student_id: studentId,
    attendance: attendance,
    date: date,
    scores: scores
  };

  const result = await callScript("submitEntry", payload);

  if (result.status === "success") {
    openSuccessModal();
  } else {
    alert("Error submitting entry.");
  }
}


/******************************************************
 * MODAL CONTROL
 ******************************************************/
function openSuccessModal() {
  document.getElementById("successModal").classList.remove("hidden");
}

function closeSuccessModal() {
  document.getElementById("successModal").classList.add("hidden");
}


/******************************************************
 * RESET FORM
 ******************************************************/
function resetForm() {
  document.querySelectorAll(".score-btn").forEach(b =>
    b.classList.remove("selected")
  );
  document.getElementById("attendanceSelect").value = "Present";
}
