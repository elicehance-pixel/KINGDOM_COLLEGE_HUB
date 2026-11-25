
const pageContainer = document.getElementById("pageContainer");
const pageTitle = document.getElementById("pageTitle");
const navigation = document.getElementById("navigation");

const sidebar = document.getElementById("sidebar");
const mobileOverlay = document.getElementById("mobileOverlay");

let currentPage = "dashboard";

let students = [
  { id: "KICOHAS001", name: "Amina Hassan", course: "Clinical Medicine", cat: 15, assignment: 16, exam: 48 },
  { id: "KICOHAS002", name: "Peter John", course: "Clinical Medicine", cat: 12, assignment: 14, exam: 42 },
  { id: "KICOHAS003", name: "Mary James", course: "Nursing", cat: 17, assignment: 18, exam: 51 },
  { id: "KICOHAS004", name: "David Joseph", course: "Nursing", cat: 13, assignment: 15, exam: 44 },
  { id: "KICOHAS005", name: "Neema Paulo", course: "Medical Laboratory", cat: 16, assignment: 17, exam: 49 }
];

let assignments = [
  { title: "Human Anatomy Assignment", course: "Human Anatomy", deadline: "2026-12-10", status: "Pending" },
  { title: "Clinical Skills Assignment", course: "Clinical Skills", deadline: "2026-12-15", status: "Submitted" }
];

let notifications = [
  "Academic Office has requested examination marks.",
  "New academic timetable has been published.",
  "Please submit your continuous assessment results."
];

let attendance = [];

let submissions = [
  { subject: "Human Anatomy", date: "2026-11-20", status: "Pending" },
  { subject: "Clinical Medicine", date: "2026-11-22", status: "Approved" }
];

const titles = {
  dashboard: "Lecturer Dashboard",
  profile: "My Profile",
  courses: "My Courses & Subjects",
  classes: "My Classes",
  students: "Student Lists",
  attendance: "Attendance Management",
  assignments: "Assignment Management",
  cat: "CAT & Continuous Assessment",
  examinations: "Examination Management",
  marks: "Marks Entry",
  submission: "Results Submission",
  timetable: "My Timetable",
  materials: "Teaching Materials",
  notifications: "Academic Notifications",
  reports: "Reports",
  settings: "Settings",
  logout: "Logout"
};

function showToast(message, type = "success") {
  const region = document.getElementById("toastRegion");
  const toast = document.createElement("div");

  toast.className = "toast " + type;
  toast.textContent = message;

  region.appendChild(toast);

  setTimeout(() => toast.remove(), 3500);
}

function openPage(page) {
  if (!titles[page]) return;

  currentPage = page;
  pageTitle.textContent = titles[page];

  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.toggle("active", link.dataset.page === page);
  });

  sidebar.classList.remove("open");
  mobileOverlay.classList.remove("show");

  renderPage();
}

navigation.addEventListener("click", function(event) {
  const link = event.target.closest(".nav-link");

  if (!link) return;

  event.preventDefault();
  openPage(link.dataset.page);
});

document.getElementById("menuToggle").addEventListener("click", () => {
  sidebar.classList.add("open");
  mobileOverlay.classList.add("show");
});

document.getElementById("sidebarClose").addEventListener("click", closeSidebar);
mobileOverlay.addEventListener("click", closeSidebar);

function closeSidebar() {
  sidebar.classList.remove("open");
  mobileOverlay.classList.remove("show");
}

document.querySelectorAll("[data-goto]").forEach(button => {
  button.addEventListener("click", () => openPage(button.dataset.goto));
});

function calculateTotal(student) {
  return Number(student.cat) + Number(student.assignment) + Number(student.exam);
}

function calculateGrade(total) {
  if (total >= 80) return "A";
  if (total >= 70) return "B";
  if (total >= 60) return "C";
  if (total >= 50) return "D";
  return "F";
}

function renderPage() {
  const pages = {
    dashboard: dashboardPage,
    profile: profilePage,
    courses: coursesPage,
    classes: classesPage,
    students: studentsPage,
    attendance: attendancePage,
    assignments: assignmentsPage,
    cat: catPage,
    examinations: examinationsPage,
    marks: marksPage,
    submission: submissionPage,
    timetable: timetablePage,
    materials: materialsPage,
    notifications: notificationsPage,
    reports: reportsPage,
    settings: settingsPage,
    logout: logoutPage
  };

  pageContainer.innerHTML = pages[currentPage]();
}

function dashboardPage() {
  return `
    <div class="welcome-row">
      <div>
        <h2>Welcome back, Dr. John!</h2>
        <p>Here is your teaching and academic overview.</p>
      </div>
      <div class="welcome-actions">
        <button class="btn btn-light" onclick="openPage('timetable')">
          <i class="fa-regular fa-calendar"></i> View Timetable
        </button>
        <button class="btn btn-primary" onclick="openPage('marks')">
          <i class="fa-solid fa-plus"></i> Enter Marks
        </button>
      </div>
    </div>

    <div class="stats-grid">
      ${statCard("Assigned Subjects", "4", "Your teaching subjects", "fa-book-open")}
      ${statCard("Students", students.length, "Assigned students", "fa-user-graduate")}
      ${statCard("Pending Results", submissions.filter(s => s.status === "Pending").length, "Awaiting review", "fa-hourglass-half")}
      ${statCard("Assignments", assignments.length, "Created assignments", "fa-clipboard-list")}
    </div>

    <div class="dashboard-grid">
      <div class="panel">
        <div class="panel-head">
          <h3>Recent Academic Activities</h3>
          <a onclick="openPage('notifications')">View all</a>
        </div>

        <div class="activity-list">
          ${activity("fa-file-circle-check", "Results submission", "Check your pending examination results.")}
          ${activity("fa-calendar-check", "Academic timetable", "Review your weekly teaching schedule.")}
          ${activity("fa-bell", "Academic notification", "You have new academic office updates.")}
          ${activity("fa-users", "Student management", "Your assigned student list is available.")}
        </div>
      </div>

      <div class="panel">
        <div class="panel-head">
          <h3>Upcoming Classes</h3>
          <a onclick="openPage('timetable')">Full timetable</a>
        </div>

        ${classRow("Human Anatomy", "Monday · Room 02", "08:00 AM")}
        ${classRow("Clinical Medicine", "Tuesday · Room 04", "10:00 AM")}
        ${classRow("Medical Ethics", "Wednesday · Room 01", "02:00 PM")}
        ${classRow("Clinical Skills", "Thursday · Skills Lab", "09:00 AM")}
      </div>
    </div>

    <div class="panel">
      <div class="panel-head">
        <h3>Recent Results Submissions</h3>
        <a onclick="openPage('submission')">View submissions</a>
      </div>
      ${submissionTable()}
    </div>
  `;
}

function statCard(label, value, note, icon) {
  return `
    <div class="stat-card">
      <div>
        <span class="stat-label">${label}</span>
        <h3>${value}</h3>
        <small>${note}</small>
      </div>
      <div class="stat-icon"><i class="fa-solid ${icon}"></i></div>
    </div>
  `;
}

function activity(icon, title, description) {
  return `
    <div class="activity">
      <div class="activity-icon"><i class="fa-solid ${icon}"></i></div>
      <div>
        <strong>${title}</strong>
        <span>${description}</span>
      </div>
    </div>
  `;
}

function classRow(subject, details, time) {
  return `
    <div class="class-row">
      <div><strong>${subject}</strong><span>${details}</span></div>
      <span class="time-chip">${time}</span>
    </div>
  `;
}

function profilePage() {
  return `
    <div class="profile-layout">
      <div class="content-card profile-card">
        <div class="profile-large">JM</div>
        <h3>Dr. John Mwakalinga</h3>
        <p>Lecturer · Health Sciences</p>
        <span class="status approved">Active Account</span>
      </div>

      <div class="content-card">
        <div class="panel-head"><h3>Personal Information</h3></div>
        <div class="info-list">
          ${info("Full Name", "Dr. John Mwakalinga")}
          ${info("Staff ID", "KICOHAS-L001")}
          ${info("Email", "lecturer@kicохas.ac.tz")}
          ${info("Department", "Health Sciences")}
          ${info("Position", "Lecturer")}
          ${info("Academic Year", "2026/2027")}
        </div>
      </div>
    </div>
  `;
}

function info(label, value) {
  return `<div class="info-item"><span>${label}</span><strong>${value}</strong></div>`;
}

function coursesPage() {
  return `
    <div class="content-card">
      <div class="panel-head"><h3>My Assigned Courses & Subjects</h3></div>
      ${simpleTable(
        ["Course Code", "Subject", "Programme", "Class"],
        [
          ["ANAT 101", "Human Anatomy", "Clinical Medicine", "Year 1"],
          ["PHYS 102", "Human Physiology", "Clinical Medicine", "Year 1"],
          ["CLIN 201", "Clinical Medicine", "Clinical Medicine", "Year 2"],
          ["SKIL 202", "Clinical Skills", "Nursing", "Year 2"]
        ]
      )}
    </div>
  `;
}

function classesPage() {
  return `
    <div class="content-card">
      <div class="panel-head"><h3>My Teaching Classes</h3></div>
      ${simpleTable(
        ["Class", "Programme", "Academic Year", "Students"],
        [
          ["Year 1 A", "Clinical Medicine", "2026/2027", "45"],
          ["Year 1 B", "Clinical Medicine", "2026/2027", "42"],
          ["Year 2 A", "Nursing", "2026/2027", "38"]
        ]
      )}
    </div>
  `;
}

function studentsPage() {
  return `
    <div class="content-card">
      <div class="panel-head"><h3>Assigned Students</h3></div>
      <div class="toolbar">
        <div class="search-box">
          <i class="fa-solid fa-search"></i>
          <input id="studentSearch" placeholder="Search student name or registration number..." oninput="filterStudents()">
        </div>
      </div>
      <div id="studentTable">${studentTable(students)}</div>
    </div>
  `;
}

function studentTable(data) {
  return simpleTable(
    ["Registration Number", "Student Name", "Course"],
    data.map(s => [s.id, s.name, s.course])
  );
}

function filterStudents() {
  const query = document.getElementById("studentSearch").value.toLowerCase();

  const filtered = students.filter(s =>
    s.name.toLowerCase().includes(query) ||
    s.id.toLowerCase().includes(query)
  );

  document.getElementById("studentTable").innerHTML = studentTable(filtered);
}

function attendancePage() {
  return `
    <div class="content-card">
      <div class="panel-head"><h3>Attendance Management</h3></div>

      <div class="notice">Select attendance status for each student and save the attendance record.</div>

      <div class="toolbar">
        <select id="attendanceSubject">
          <option>Human Anatomy</option>
          <option>Clinical Medicine</option>
          <option>Clinical Skills</option>
        </select>
        <input type="date" id="attendanceDate" value="${new Date().toISOString().slice(0,10)}">
      </div>

      <div class="table-wrap">
        <table>
          <thead><tr><th>Registration No.</th><th>Student</th><th>Attendance</th></tr></thead>
          <tbody>
            ${students.map((s,i) => `
              <tr>
                <td>${s.id}</td>
                <td class="student-name">${s.name}</td>
                <td>
                  <select id="att-${i}">
                    <option>Present</option>
                    <option>Absent</option>
                    <option>Late</option>
                  </select>
                </td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      </div>

      <br>
      <button class="btn btn-primary" onclick="saveAttendance()">Save Attendance</button>
    </div>
  `;
}

function saveAttendance() {
  const date = document.getElementById("attendanceDate").value;
  const subject = document.getElementById("attendanceSubject").value;

  students.forEach((s,i) => {
    attendance.push({
      student: s.name,
      id: s.id,
      subject,
      date,
      status: document.getElementById("att-" + i).value
    });
  });

  showToast("Attendance saved successfully.");
}

function assignmentsPage() {
  return `
    <div class="content-card">
      <div class="panel-head">
        <h3>Assignment Management</h3>
        <button class="btn btn-primary" onclick="addAssignmentForm()">
          <i class="fa-solid fa-plus"></i> New Assignment
        </button>
      </div>

      <div id="assignmentForm"></div>
      ${assignmentTable()}
    </div>
  `;
}

function assignmentTable() {
  return simpleTable(
    ["Assignment", "Subject", "Deadline", "Status"],
    assignments.map(a => [
      a.title,
      a.course,
      a.deadline,
      `<span class="status ${a.status === "Submitted" ? "submitted" : "pending"}">${a.status}</span>`
    ])
  );
}

function addAssignmentForm() {
  document.getElementById("assignmentForm").innerHTML = `
    <div class="notice">
      <div class="form-grid">
        <div class="field">
          <label>Assignment Title</label>
          <input id="assignmentTitle" placeholder="Enter assignment title">
        </div>
        <div class="field">
          <label>Subject</label>
          <input id="assignmentCourse" placeholder="Enter subject">
        </div>
        <div class="field">
          <label>Deadline</label>
          <input id="assignmentDeadline" type="date">
        </div>
      </div>
      <br>
      <button class="btn btn-primary" onclick="saveAssignment()">Save Assignment</button>
    </div>
  `;
}

function saveAssignment() {
  const title = document.getElementById("assignmentTitle").value.trim();
  const course = document.getElementById("assignmentCourse").value.trim();
  const deadline = document.getElementById("assignmentDeadline").value;

  if (!title || !course || !deadline) {
    showToast("Please complete all assignment fields.", "error");
    return;
  }

  assignments.push({ title, course, deadline, status: "Pending" });
  renderPage();
  showToast("Assignment created successfully.");
}

function catPage() {
  return `
    <div class="content-card">
      <div class="panel-head"><h3>Continuous Assessment</h3></div>
      <div class="notice">
        Enter CAT and assignment marks in the Marks Entry section.
        The sample assessment structure is CAT /20, Assignment /20 and Examination /60.
      </div>
      <button class="btn btn-primary" onclick="openPage('marks')">Go to Marks Entry</button>
    </div>
  `;
}

function examinationsPage() {
  return `
    <div class="content-card">
      <div class="panel-head"><h3>Examination Management</h3></div>
      ${simpleTable(
        ["Examination", "Subject", "Date", "Status"],
        [
          ["End of Semester Examination", "Human Anatomy", "2026-12-12", "Scheduled"],
          ["End of Semester Examination", "Clinical Medicine", "2026-12-15", "Scheduled"],
          ["Practical Examination", "Clinical Skills", "2026-12-18", "Scheduled"]
        ]
      )}
    </div>
  `;
}

function marksPage() {
  return `
    <div class="content-card">
      <div class="panel-head"><h3>Marks Entry</h3></div>

      <div class="notice warning">
        <strong>Assessment structure:</strong> CAT /20, Assignment /20 and Examination /60.
        These are demonstration values only. The Academic Office should configure the official assessment weights and grading system.
      </div>

      <div class="toolbar">
        <select id="marksSubject">
          <option>Human Anatomy</option>
          <option>Clinical Medicine</option>
          <option>Clinical Skills</option>
        </select>

        <button class="btn btn-light" onclick="downloadTemplate()">
          <i class="fa-solid fa-download"></i> Excel Template
        </button>

        <button class="btn btn-light" onclick="exportMarks()">
          <i class="fa-solid fa-file-export"></i> Export Marks
        </button>
      </div>

      <div class="upload-box">
        <i class="fa-solid fa-file-excel"></i>
        <strong>Upload Excel Marks File</strong>
        <p>Choose a completed KICOHAS marks template.</p>
        <input type="file" id="excelFile" accept=".xlsx,.xls,.csv">
        <button class="btn btn-primary" onclick="importExcel()">Upload Marks</button>
      </div>

      <div class="section-heading">
        <h3>Manual Marks Entry</h3>
      </div>

      <div class="table-wrap">
        <table id="marksTable">
          <thead>
            <tr>
              <th>Registration No.</th>
              <th>Student Name</th>
              <th>CAT /20</th>
              <th>Assignment /20</th>
              <th>Exam /60</th>
              <th>Total /100</th>
              <th>Grade</th>
            </tr>
          </thead>
          <tbody>
            ${marksRows()}
          </tbody>
        </table>
      </div>

      <div class="marks-summary">
        <div class="summary-chip">Students <strong>${students.length}</strong></div>
        <div class="summary-chip">Assessment <strong>100 Marks</strong></div>
      </div>

      <button class="btn btn-primary" onclick="saveMarks()">Save Marks as Draft</button>
      <button class="btn btn-gold" onclick="submitResults()">Submit Results</button>
    </div>
  `;
}

function marksRows() {
  return students.map((s,i) => `
    <tr>
      <td>${s.id}</td>
      <td class="student-name">${s.name}</td>
      <td><input class="table-input" type="number" min="0" max="20" value="${s.cat}" id="cat-${i}" onchange="updateMarkRow(${i})"></td>
      <td><input class="table-input" type="number" min="0" max="20" value="${s.assignment}" id="assignment-${i}" onchange="updateMarkRow(${i})"></td>
      <td><input class="table-input" type="number" min="0" max="60" value="${s.exam}" id="exam-${i}" onchange="updateMarkRow(${i})"></td>
      <td id="total-${i}">${calculateTotal(s)}</td>
      <td id="grade-${i}" class="grade-pill">${calculateGrade(calculateTotal(s))}</td>
    </tr>
  `).join("");
}

function updateMarkRow(i) {
  const cat = Number(document.getElementById("cat-" + i).value);
  const assignment = Number(document.getElementById("assignment-" + i).value);
  const exam = Number(document.getElementById("exam-" + i).value);

  const total = cat + assignment + exam;

  document.getElementById("total-" + i).textContent = total;
  document.getElementById("grade-" + i).textContent = calculateGrade(total);
}

function collectMarks() {
  for (let i = 0; i < students.length; i++) {
    const cat = Number(document.getElementById("cat-" + i).value);
    const assignment = Number(document.getElementById("assignment-" + i).value);
    const exam = Number(document.getElementById("exam-" + i).value);

    if (
      !Number.isFinite(cat) || !Number.isFinite(assignment) || !Number.isFinite(exam) ||
      cat < 0 || cat > 20 ||
      assignment < 0 || assignment > 20 ||
      exam < 0 || exam > 60
    ) {
      showToast("Please enter valid marks within the allowed ranges.", "error");
      return false;
    }

    students[i].cat = cat;
    students[i].assignment = assignment;
    students[i].exam = exam;
  }

  return true;
}

function saveMarks() {
  if (!collectMarks()) return;
  showToast("Marks saved as draft.");
}

function submitResults() {
  if (!collectMarks()) return;

  const subject = document.getElementById("marksSubject").value;

  submissions.push({
    subject,
    date: new Date().toISOString().slice(0,10),
    status: "Pending"
  });

  showToast("Results submitted to Academic Office for review.");
}

function downloadTemplate() {
  if (typeof XLSX === "undefined") {
    showToast("Excel library is unavailable. Check your internet connection.", "error");
    return;
  }

  const data = [
    ["Registration Number", "Student Name", "CAT", "Assignment", "Exam"],
    ...students.map(s => [s.id, s.name, "", "", ""])
  ];

  const sheet = XLSX.utils.aoa_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, sheet, "Marks Template");
  XLSX.writeFile(workbook, "KICOHAS_Marks_Template.xlsx");
}

function exportMarks() {
  if (typeof XLSX === "undefined") {
    showToast("Excel library is unavailable.", "error");
    return;
  }

  const data = [
    ["Registration Number", "Student Name", "CAT", "Assignment", "Exam", "Total", "Grade"],
    ...students.map(s => [
      s.id, s.name, s.cat, s.assignment, s.exam,
      calculateTotal(s), calculateGrade(calculateTotal(s))
    ])
  ];

  const sheet = XLSX.utils.aoa_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, sheet, "Results");
  XLSX.writeFile(workbook, "KICOHAS_Results.xlsx");
}

function importExcel() {
  const file = document.getElementById("excelFile").files[0];

  if (!file) {
    showToast("Please select an Excel file first.", "error");
    return;
  }

  if (typeof XLSX === "undefined") {
    showToast("Excel library is unavailable.", "error");
    return;
  }

  const reader = new FileReader();

  reader.onload = function(event) {
    try {
      const workbook = XLSX.read(event.target.result, { type: "array" });
      const sheet = workbook.Sheets[workbook.SheetNames[0]];
      const data = XLSX.utils.sheet_to_json(sheet);

      if (!data.length) {
        showToast("The Excel file is empty.", "error");
        return;
      }

      let imported = 0;

      data.forEach(row => {
        const id = String(row["Registration Number"] || "").trim();
        const student = students.find(s => s.id === id);

        if (!student) return;

        const cat = Number(row.CAT);
        const assignment = Number(row.Assignment);
        const exam = Number(row.Exam);

        if (
          Number.isFinite(cat) && cat >= 0 && cat <= 20 &&
          Number.isFinite(assignment) && assignment >= 0 && assignment <= 20 &&
          Number.isFinite(exam) && exam >= 0 && exam <= 60
        ) {
          student.cat = cat;
          student.assignment = assignment;
          student.exam = exam;
          imported++;
        }
      });

      renderPage();

      showToast(imported + " student marks imported successfully.");
    } catch (error) {
      showToast("Unable to read this Excel file.", "error");
    }
  };

  reader.readAsArrayBuffer(file);
}

function submissionPage() {
  return `
    <div class="content-card">
      <div class="panel-head"><h3>Results Submission History</h3></div>
      <div class="notice">
        Submitted results are sent to the Academic Office for review and approval.
        Lecturers cannot approve their own results.
      </div>
      ${submissionTable()}
    </div>
  `;
}

function submissionTable() {
  return simpleTable(
    ["Subject", "Submission Date", "Status"],
    submissions.map(s => [
      s.subject,
      s.date,
      `<span class="status ${s.status.toLowerCase()}">${s.status}</span>`
    ])
  );
}

function timetablePage() {
  const days = [
    ["Monday", [["08:00 AM", "Human Anatomy", "Room 02"]]],
    ["Tuesday", [["10:00 AM", "Clinical Medicine", "Room 04"]]],
    ["Wednesday", [["02:00 PM", "Medical Ethics", "Room 01"]]],
    ["Thursday", [["09:00 AM", "Clinical Skills", "Skills Lab"]]],
    ["Friday", [["11:00 AM", "Human Physiology", "Room 03"]]]
  ];

  return `
    <div class="content-card">
      <div class="panel-head"><h3>Weekly Teaching Timetable</h3></div>

      <div class="schedule-grid">
        ${days.map(day => `
          <div class="day-card">
            <h4>${day[0]}</h4>
            ${day[1].map(lesson => `
              <div class="lesson">
                <strong>${lesson[1]}</strong>
                <span>${lesson[0]}</span>
                <span>${lesson[2]}</span>
              </div>
            `).join("")}
          </div>
        `).join("")}
      </div>
    </div>
  `;
}

function materialsPage() {
  return `
    <div class="content-card">
      <div class="panel-head"><h3>Teaching Materials</h3></div>
      <div class="notice">Upload and organize your lecture notes, presentations and learning materials.</div>

      <div class="field">
        <label>Select teaching material</label>
        <input type="file" id="materialFile" accept=".pdf,.doc,.docx,.ppt,.pptx">
      </div>
      <br>
      <button class="btn btn-primary" onclick="uploadMaterial()">Select Material</button>

      <div id="materialMessage" class="small muted"></div>
    </div>
  `;
}

function uploadMaterial() {
  const file = document.getElementById("materialFile").files[0];

  if (!file) {
    showToast("Please select a file.", "error");
    return;
  }

  document.getElementById("materialMessage").textContent =
    "Selected file: " + file.name + ". This demo does not upload files to a server.";

  showToast("File selected successfully.");
}

function notificationsPage() {
  return `
    <div class="content-card">
      <div class="panel-head"><h3>Academic Notifications</h3></div>

      <div class="activity-list">
        ${notifications.map(n => activity("fa-bell", "Academic Office Notification", n)).join("")}
      </div>
    </div>
  `;
}

function reportsPage() {
  return `
    <div class="content-card">
      <div class="panel-head"><h3>Lecturer Reports</h3></div>

      <div class="stats-grid">
        ${statCard("Assigned Students", students.length, "Student records", "fa-users")}
        ${statCard("Attendance Records", attendance.length, "Saved in this demo", "fa-calendar-check")}
        ${statCard("Assignments", assignments.length, "Created assignments", "fa-clipboard-list")}
        ${statCard("Results Submissions", submissions.length, "Submission records", "fa-file-circle-check")}
      </div>

      <button class="btn btn-primary" onclick="exportMarks()">Export Results Report</button>
    </div>
  `;
}

function settingsPage() {
  return `
    <div class="content-card">
      <div class="panel-head"><h3>Account Settings</h3></div>

      <div class="form-grid">
        <div class="field">
          <label>Display Name</label>
          <input value="Dr. John Mwakalinga">
        </div>
        <div class="field">
          <label>Email Address</label>
          <input value="lecturer@kicохas.ac.tz">
        </div>
        <div class="field full">
          <label>New Password</label>
          <input type="password" placeholder="Enter new password">
        </div>
      </div>

      <br>
      <button class="btn btn-primary" onclick="showToast('Demo settings only. Changes are not saved to a server.')">
        Save Settings
      </button>
    </div>
  `;
}

function logoutPage() {
  return `
    <div class="content-card">
      <div class="empty-state">
        <i class="fa-solid fa-arrow-right-from-bracket"></i>
        <strong>Logout</strong>
        <p>This is a demonstration portal without real user authentication.</p>
        <button class="btn btn-primary" onclick="openPage('dashboard')">Return to Dashboard</button>
      </div>
    </div>
  `;
}

function simpleTable(headers, rows) {
  return `
    <div class="table-wrap">
      <table>
        <thead>
          <tr>${headers.map(h => `<th>${h}</th>`).join("")}</tr>
        </thead>
        <tbody>
          ${rows.length ? rows.map(row => `
            <tr>${row.map(cell => `<td>${cell}</td>`).join("")}</tr>
          `).join("") : `
            <tr><td colspan="${headers.length}">No records available.</td></tr>
          `}
        </tbody>
      </table>
    </div>
  `;
}

document.getElementById("modalClose").addEventListener("click", () => {
  document.getElementById("modalBackdrop").classList.remove("show");
});

renderPage();
