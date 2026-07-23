const API_BASE = "/api/students";

const username = localStorage.getItem("username");
if (!username) {
  window.location.href = "login.html";
}
document.getElementById("welcomeText").textContent = `Welcome, ${username}`;

document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("username");
  window.location.href = "login.html";
});

const tableBody = document.getElementById("studentTableBody");
const emptyState = document.getElementById("emptyState");
const summaryBar = document.getElementById("summaryBar");
const searchInput = document.getElementById("searchInput");
const gradeFilter = document.getElementById("gradeFilter");

const modalOverlay = document.getElementById("modalOverlay");
const modalTitle = document.getElementById("modalTitle");
const studentForm = document.getElementById("studentForm");
const openAddModalBtn = document.getElementById("openAddModalBtn");
const cancelModalBtn = document.getElementById("cancelModalBtn");

let allStudents = []; 

function showToast(message, isError = false) {
  const toast = document.getElementById("toast");

  toast.textContent = message;

  if (isError) {
    toast.classList.add("error");
  } else {
    toast.classList.remove("error");
  }

  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

async function fetchStudents() {
  const search = searchInput.value.trim();
  const grade = gradeFilter.value;

  const params = new URLSearchParams();
  if (search) params.append("search", search);
  if (grade) params.append("grade", grade);

  try {
    const res = await fetch(`${API_BASE}?${params.toString()}`);
    const students = await res.json();
    allStudents = students;
    renderTable(students);
    updateGradeOptions(students);
    summaryBar.textContent = `Total Students: ${students.length}`;
  } catch (err) {
    tableBody.innerHTML = "";
    emptyState.style.display = "block";
    emptyState.textContent = "Could not load students. Is the server running?";
  }
}

function renderTable(students) {
  tableBody.innerHTML = "";

  if (students.length === 0) {
    emptyState.style.display = "block";
    return;
  }
  emptyState.style.display = "none";

  students.forEach((student) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${escapeHtml(student.name)}</td>
      <td>${escapeHtml(String(student.age))}</td>
      <td>${escapeHtml(student.email)}</td>
      <td>${escapeHtml(student.phoneNumber)}</td>
      <td>${escapeHtml(student.grade)}</td>
      <td>
        <button class="action-btn edit-btn" data-id="${student._id}">Edit</button>
        <button class="action-btn delete-btn" data-id="${student._id}">Delete</button>
      </td>
    `;
    tableBody.appendChild(row);
  });

  document.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", () => openEditModal(btn.dataset.id));
  });
  document.querySelectorAll(".delete-btn").forEach((btn) => {
    btn.addEventListener("click", () => deleteStudent(btn.dataset.id));
  });
}

function updateGradeOptions(students) {
  const currentValue = gradeFilter.value;
  const uniqueGrades = [...new Set(students.map((s) => s.grade))];

  gradeFilter.innerHTML = '<option value="">All Grades</option>';
  uniqueGrades.forEach((grade) => {
    const opt = document.createElement("option");
    opt.value = grade;
    opt.textContent = grade;
    gradeFilter.appendChild(opt);
  });
  gradeFilter.value = currentValue;
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str;
  return div.innerHTML;
}

let searchTimeout;
searchInput.addEventListener("input", () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(fetchStudents, 300); 
});
gradeFilter.addEventListener("change", fetchStudents);

function openAddModal() {
  modalTitle.textContent = "Add Student";
  studentForm.reset();
  document.getElementById("studentId").value = "";
  clearFormErrors();
  modalOverlay.classList.add("active");
}

function openEditModal(id) {
  const student = allStudents.find((s) => s._id === id);
  if (!student) return;

  modalTitle.textContent = "Edit Student";
  document.getElementById("studentId").value = student._id;
  document.getElementById("nameInput").value = student.name;
  document.getElementById("ageInput").value = student.age;
  document.getElementById("emailInput").value = student.email;
  document.getElementById("phoneInput").value = student.phoneNumber;
  document.getElementById("gradeInput").value = student.grade;
  clearFormErrors();
  modalOverlay.classList.add("active");
}

function closeModal() {
  modalOverlay.classList.remove("active");
}

openAddModalBtn.addEventListener("click", openAddModal);
cancelModalBtn.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) closeModal();
});

function clearFormErrors() {
  ["nameError", "ageError", "studentEmailError", "phoneError", "gradeError"].forEach((id) => {
    document.getElementById(id).textContent = "";
  });
}

studentForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearFormErrors();

  const id = document.getElementById("studentId").value;
  const name = document.getElementById("nameInput").value.trim();
  const age = document.getElementById("ageInput").value;
  const email = document.getElementById("emailInput").value.trim();
  const phoneNumber = document.getElementById("phoneInput").value.trim();
  const grade = document.getElementById("gradeInput").value.trim();

  let hasError = false;
  if (name.length < 2) {
    document.getElementById("nameError").textContent = "Name must be at least 2 characters.";
    hasError = true;
  }
  if (!age || age <= 0 || age > 120) {
    document.getElementById("ageError").textContent = "Enter a valid age.";
    hasError = true;
  }
  if (!email.includes("@") || !email.includes(".")) {
    document.getElementById("studentEmailError").textContent = "Enter a valid email address.";
    hasError = true;
  }
  if (!/^03\d{9}$/.test(phoneNumber)) {
    document.getElementById("phoneError").textContent = "Enter a valid phone number.";
    hasError = true;
  }
  if (grade.length < 1) {
    document.getElementById("gradeError").textContent = "Grade/class is required.";
    hasError = true;
  }
  if (hasError) return;

  const payload = { name, age: Number(age), email, phoneNumber, grade };

  try {
    let res;
    if (id) {
      res = await fetch(`${API_BASE}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    } else {
      res = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
    }

    if (!res.ok) {
      const data = await res.json();
      showToast(data.message || "Something went wrong saving the student.", true);
      return;
    }

    closeModal();
    fetchStudents();
    showToast("Student saved successfully!");
  } catch (err) {
    showToast("Could not connect to server.", true);
  }
});

// ---------- Delete ----------
async function deleteStudent(id) {
  if (!confirm("Are you sure you want to delete this student?")) return;

  try {
    const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const data = await res.json();
      alert(data.message || "Could not delete student.");
      return;
    }
    fetchStudents();
    showToast("Student deleted successfully!");
  } catch (err) {
    alert("Could not connect to server.");
  }
}

fetchStudents();
