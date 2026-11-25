
document.addEventListener("DOMContentLoaded", () => {

    // =====================================
    // KICOHAS ACADEMIC PORTAL
    // FRONTEND DEMONSTRATION
    // =====================================

    const pageContainer = document.getElementById("pageContainer");
    const pageHeading = document.getElementById("pageHeading");
    const sidebar = document.getElementById("sidebar");
    const menuToggle = document.getElementById("menuToggle");
    const closeSidebar = document.getElementById("closeSidebar");
    const sidebarOverlay = document.getElementById("sidebarOverlay");
    const toastContainer = document.getElementById("toastContainer");

    let currentPage = "dashboard";

    // Sample data for demonstration only
    const students = [
        {id:"KICOHAS/001", name:"Sample Student One", course:"Clinical Medicine", year:"Year 1", status:"Active"},
        {id:"KICOHAS/002", name:"Sample Student Two", course:"Nursing", year:"Year 2", status:"Active"},
        {id:"KICOHAS/003", name:"Sample Student Three", course:"Medical Laboratory", year:"Year 1", status:"Active"},
        {id:"KICOHAS/004", name:"Sample Student Four", course:"Pharmaceutical Sciences", year:"Year 3", status:"Active"},
        {id:"KICOHAS/005", name:"Sample Student Five", course:"Clinical Medicine", year:"Year 2", status:"Active"}
    ];

    const lecturers = [
        {id:"LEC001", name:"Dr. Sample One", department:"Clinical Medicine", subjects:"Human Anatomy"},
        {id:"LEC002", name:"Mr. Sample Two", department:"Nursing", subjects:"Medical Surgical Nursing"},
        {id:"LEC003", name:"Ms. Sample Three", department:"Laboratory", subjects:"Microbiology"},
        {id:"LEC004", name:"Dr. Sample Four", department:"Pharmaceutical Sciences", subjects:"Pharmacology"}
    ];

    const courses = [
        {code:"CM", name:"Clinical Medicine", duration:"3 Years", level:"Diploma", status:"Active"},
        {code:"NUR", name:"Nursing", duration:"3 Years", level:"Diploma", status:"Active"},
        {code:"MLT", name:"Medical Laboratory Sciences", duration:"3 Years", level:"Diploma", status:"Active"},
        {code:"PHARM", name:"Pharmaceutical Sciences", duration:"3 Years", level:"Diploma", status:"Active"}
    ];

    let results = [
        {id:1, subject:"Human Anatomy", code:"ANAT 101", lecturer:"Dr. Sample One", date:"24 Nov 2026", status:"Pending"},
        {id:2, subject:"Medical Microbiology", code:"MIC 102", lecturer:"Mr. Sample Two", date:"23 Nov 2026", status:"Under Review"},
        {id:3, subject:"Clinical Medicine", code:"CM 201", lecturer:"Dr. Sample Four", date:"22 Nov 2026", status:"Pending"},
        {id:4, subject:"Pharmacology", code:"PHARM 103", lecturer:"Dr. Sample One", date:"21 Nov 2026", status:"Approved"}
    ];

    const clearance = [
        {id:"KICOHAS/001", total:"1,500,000", paid:"1,500,000", balance:"0", status:"Cleared"},
        {id:"KICOHAS/002", total:"1,500,000", paid:"900,000", balance:"600,000", status:"Not Cleared"},
        {id:"KICOHAS/003", total:"1,500,000", paid:"1,500,000", balance:"0", status:"Cleared"},
        {id:"KICOHAS/004", total:"1,500,000", paid:"1,000,000", balance:"500,000", status:"Not Cleared"},
        {id:"KICOHAS/005", total:"1,500,000", paid:"1,500,000", balance:"0", status:"Cleared"}
    ];

    const assignments = [
        {title:"Human Anatomy Assignment 1", subject:"Human Anatomy", lecturer:"Dr. Sample One", date:"20 Nov 2026", status:"Submitted"},
        {title:"Microbiology CAT", subject:"Microbiology", lecturer:"Mr. Sample Two", date:"21 Nov 2026", status:"Pending"},
        {title:"Clinical Skills Assignment", subject:"Clinical Medicine", lecturer:"Dr. Sample Four", date:"23 Nov 2026", status:"Submitted"}
    ];

    const timetable = [
        {day:"Monday", time:"08:00 - 10:00", subject:"Human Anatomy", room:"Room 01"},
        {day:"Tuesday", time:"10:00 - 12:00", subject:"Medical Microbiology", room:"Room 02"},
        {day:"Wednesday", time:"08:00 - 10:00", subject:"Clinical Medicine", room:"Clinical Room"},
        {day:"Thursday", time:"12:00 - 14:00", subject:"Pharmacology", room:"Room 03"}
    ];

    const notifications = [
        {title:"Results submission", message:"New examination marks submitted for review.", date:"Today"},
        {title:"Academic timetable", message:"Semester timetable requires review.", date:"Yesterday"},
        {title:"Finance clearance", message:"Finance clearance records updated.", date:"23 Nov 2026"}
    ];

    // =====================================
    // UTILITIES
    // =====================================

    function showToast(message) {
        const toast = document.createElement("div");
        toast.className = "toast";
        toast.textContent = message;

        toastContainer.appendChild(toast);

        setTimeout(() => {
            toast.remove();
        }, 3500);
    }

    function statusBadge(status) {
        const classes = {
            "Pending":"pending",
            "Under Review":"review",
            "Approved":"approved",
            "Cleared":"cleared",
            "Not Cleared":"not-cleared",
            "Rejected":"rejected",
            "Active":"approved",
            "Submitted":"approved"
        };

        const cls = classes[status] || "pending";

        return `<span class="status ${cls}">${status}</span>`;
    }

    function closeMobileSidebar() {
        sidebar.classList.remove("open");
        sidebarOverlay.classList.remove("show");
    }

    function tableCard(title, description, headers, rows) {
        return `
            <div class="content-card">
                <div class="panel-header">
                    <div>
                        <h3>${title}</h3>
                        <p>${description}</p>
                    </div>
                </div>

                <div class="table-wrapper">
                    <table>
                        <thead>
                            <tr>${headers.map(h => `<th>${h}</th>`).join("")}</tr>
                        </thead>
                        <tbody>
                            ${rows.length ? rows.join("") : `
                                <tr>
                                    <td colspan="${headers.length}">
                                        No records available.
                                    </td>
                                </tr>
                            `}
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }

    function pageToolbar(description, buttonText = "Add New") {
        return `
            <div class="page-toolbar">
                <div>
                    <p>${description}</p>
                </div>

                <div class="toolbar-actions">
                    <div class="search-box">
                        <i class="fa-solid fa-magnifying-glass"></i>
                        <input type="search" id="pageSearch" placeholder="Search records...">
                    </div>

                    <button class="action-button" id="addRecord">
                        <i class="fa-solid fa-plus"></i> ${buttonText}
                    </button>
                </div>
            </div>
        `;
    }

    function pageIntro(title, description) {
        return `
            <div class="welcome-section">
                <div>
                    <span class="eyebrow">KICOHAS ACADEMIC OFFICE</span>
                    <h1>${title}</h1>
                    <p>${description}</p>
                </div>
            </div>
        `;
    }

    // =====================================
    // DASHBOARD
    // =====================================

    function renderDashboard() {

        return `
            <div class="welcome-section">
                <div>
                    <span class="eyebrow">ACADEMIC ADMINISTRATION</span>
                    <h1>Welcome back, Academic Officer</h1>
                    <p>Here is an overview of academic activities at KICOHAS.</p>
                </div>

                <button class="primary-button" id="quickAction">
                    <i class="fa-solid fa-plus"></i> Quick Action
                </button>
            </div>

            <div class="stats-grid">

                ${statCard("Students","1,248","fa-user-graduate","navy")}
                ${statCard("Lecturers","48","fa-chalkboard-user","teal")}
                ${statCard("Active Courses","16","fa-book-open","gold")}
                ${statCard("Pending Results","08","fa-file-circle-check","purple")}

            </div>

            <div class="secondary-stats">
                ${miniCard("Pending Assignments","24","fa-hourglass-half","orange")}
                ${miniCard("Students Cleared","876","fa-circle-check","green")}
                ${miniCard("Not Cleared","372","fa-lock","red")}
                ${miniCard("Recent Submissions","35","fa-file-arrow-up","blue")}
            </div>

            <div class="dashboard-grid">

                <div class="panel">
                    <div class="panel-header">
                        <div>
                            <h3>Results Awaiting Approval</h3>
                            <p>Review submitted academic results</p>
                        </div>
                        <button class="text-button" data-go="results">View all →</button>
                    </div>

                    <div class="table-wrapper">
                        <table>
                            <thead>
                                <tr>
                                    <th>SUBJECT</th>
                                    <th>LECTURER</th>
                                    <th>DATE</th>
                                    <th>STATUS</th>
                                </tr>
                            </thead>
                            <tbody>
                                ${results.filter(r => r.status !== "Approved").map(r => `
                                    <tr>
                                        <td><strong>${r.subject}</strong><small>${r.code}</small></td>
                                        <td>${r.lecturer}</td>
                                        <td>${r.date}</td>
                                        <td>${statusBadge(r.status)}</td>
                                    </tr>
                                `).join("")}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div class="panel">
                    <div class="panel-header">
                        <div>
                            <h3>Recent Activity</h3>
                            <p>Latest academic updates</p>
                        </div>
                    </div>

                    <div class="activity-list">
                        ${activity("fa-file-circle-check","teal-bg","New results submitted","Human Anatomy examination","Today")}
                        ${activity("fa-user-plus","gold-bg","Student registration updated","Academic records updated","Yesterday")}
                        ${activity("fa-calendar","purple-bg","Timetable updated","Semester timetable revised","23 Nov 2026")}
                        ${activity("fa-money-check","green-bg","Fee clearance updated","Finance status synchronized","22 Nov 2026")}
                    </div>
                </div>

            </div>

            <div class="dashboard-grid">

                <div class="panel">
                    <div class="panel-header">
                        <div>
                            <h3>Fee Clearance Overview</h3>
                            <p>Student clearance summary</p>
                        </div>
                        <button class="text-button" data-go="clearance">View report</button>
                    </div>

                    <div class="clearance-summary">
                        <div class="clearance-number">
                            <h2>876</h2>
                            <span>Cleared students</span>
                        </div>
                        <div class="clearance-number">
                            <h2>372</h2>
                            <span>Not cleared</span>
                        </div>
                    </div>

                    <div class="progress-track">
                        <div class="progress-value"></div>
                    </div>

                    <div class="progress-label">
                        <span>70.2% cleared</span>
                        <span>29.8% not cleared</span>
                    </div>
                </div>

                <div class="panel">
                    <div class="panel-header">
                        <div>
                            <h3>Academic Quick Access</h3>
                            <p>Frequently used sections</p>
                        </div>
                    </div>

                    <div class="quick-links">
                        <button data-go="students"><i class="fa-solid fa-user-graduate"></i> Students</button>
                        <button data-go="results"><i class="fa-solid fa-square-poll-vertical"></i> Results</button>
                        <button data-go="timetable"><i class="fa-solid fa-calendar-week"></i> Timetable</button>
                        <button data-go="reports"><i class="fa-solid fa-chart-line"></i> Reports</button>
                    </div>
                </div>

            </div>

            ${footer()}
        `;
    }

    function statCard(title, number, icon, color) {
        return `
            <div class="stat-card">
                <div class="stat-top">
                    <div class="stat-icon ${color}">
                        <i class="fa-solid ${icon}"></i>
                    </div>
                    <span class="stat-label">${title.toUpperCase()}</span>
                </div>
                <h2>${number}</h2>
                <p>Academic records overview</p>
            </div>
        `;
    }

    function miniCard(title, number, icon, color) {
        return `
            <div class="mini-stat">
                <div class="mini-icon ${color}">
                    <i class="fa-solid ${icon}"></i>
                </div>
                <div>
                    <span>${title}</span>
                    <h3>${number}</h3>
                </div>
            </div>
        `;
    }

    function activity(icon, color, title, message, date) {
        return `
            <div class="activity-item">
                <div class="activity-symbol ${color}">
                    <i class="fa-solid ${icon}"></i>
                </div>
                <div>
                    <strong>${title}</strong>
                    <p>${message}</p>
                    <small>${date}</small>
                </div>
            </div>
        `;
    }

    function footer() {
        return `
            <footer class="footer">
                <span>© 2026 Kingdom College of Health and Allied Sciences.</span>
                <span>Healing Through Knowledge</span>
            </footer>
        `;
    }

    // =====================================
    // STUDENT MANAGEMENT
    // =====================================

    function renderStudents() {

        const rows = students.map(s => `
            <tr>
                <td><strong>${s.id}</strong></td>
                <td>${s.name}</td>
                <td>${s.course}</td>
                <td>${s.year}</td>
                <td>${statusBadge(s.status)}</td>
                <td><button class="text-button" data-student="${s.id}">View Profile</button></td>
            </tr>
        `);

        return `
            ${pageIntro("Student Management","Manage student registration and academic records.")}
            ${pageToolbar("Registered student records","Add Student")}

            <div class="stats-grid">
                ${statCard("Total Students","1,248","fa-user-graduate","navy")}
                ${statCard("Active Students","1,200","fa-user-check","teal")}
                ${statCard("New Registrations","48","fa-user-plus","gold")}
                ${statCard("Academic Programmes","16","fa-book","purple")}
            </div>

            ${tableCard("Registered Students","Student information and academic status",
                ["REGISTRATION NO.","STUDENT NAME","COURSE","YEAR","STATUS","ACTION"],rows)}
            ${footer()}
        `;
    }

    // =====================================
    // LECTURER MANAGEMENT
    // =====================================

    function renderLecturers() {

        const rows = lecturers.map(l => `
            <tr>
                <td><strong>${l.id}</strong></td>
                <td>${l.name}</td>
                <td>${l.department}</td>
                <td>${l.subjects}</td>
                <td>${statusBadge("Active")}</td>
                <td><button class="text-button" data-lecturer="${l.id}">View</button></td>
            </tr>
        `);

        return `
            ${pageIntro("Lecturer Management","Manage teaching staff and their academic responsibilities.")}
            ${pageToolbar("Lecturer records and assigned responsibilities","Add Lecturer")}

            ${tableCard("Lecturer Directory","Registered teaching staff",
                ["STAFF ID","LECTURER NAME","DEPARTMENT","ASSIGNED SUBJECT","STATUS","ACTION"],rows)}
            ${footer()}
        `;
    }

    // =====================================
    // COURSES AND SUBJECTS
    // =====================================

    function renderCourses() {

        const rows = courses.map(c => `
            <tr>
                <td><strong>${c.code}</strong></td>
                <td>${c.name}</td>
                <td>${c.level}</td>
                <td>${c.duration}</td>
                <td>${statusBadge(c.status)}</td>
                <td><button class="text-button" data-course="${c.code}">Manage</button></td>
            </tr>
        `);

        return `
            ${pageIntro("Courses & Subjects","Manage academic programmes, subjects and course structures.")}
            ${pageToolbar("Academic programmes and subjects","Add Course")}

            ${tableCard("Academic Programmes","Programme directory",
                ["COURSE CODE","PROGRAMME NAME","LEVEL","DURATION","STATUS","ACTION"],rows)}
            ${footer()}
        `;
    }

    // =====================================
    // ACADEMIC CALENDAR
    // =====================================

    function renderCalendar() {

        const events = [
            ["Academic Year Opening","05 Jan 2027","Academic"],
            ["Semester I Commencement","11 Jan 2027","Academic"],
            ["Continuous Assessment","15 Feb 2027","Assessment"],
            ["Semester I Examinations","12 Apr 2027","Examination"],
            ["Semester II Commencement","10 May 2027","Academic"]
        ];

        return `
            ${pageIntro("Academic Calendar","Plan and monitor academic events and institutional schedules.")}
            ${pageToolbar("Academic calendar events","Add Event")}

            <div class="content-card">
                <h3>Academic Year 2026/2027</h3>
                <p>Academic activities and important dates.</p>
            </div>

            ${tableCard("Upcoming Academic Events","Scheduled institutional activities",
                ["EVENT","DATE","CATEGORY","STATUS"],
                events.map(e => `<tr><td><strong>${e[0]}</strong></td><td>${e[1]}</td><td>${e[2]}</td><td>${statusBadge("Active")}</td></tr>`))}
            ${footer()}
        `;
    }

    // =====================================
    // TIMETABLE
    // =====================================

    function renderTimetable() {

        return `
            ${pageIntro("Timetable Management","Manage class schedules, teaching sessions and examination timetables.")}
            ${pageToolbar("Teaching timetable","Add Timetable")}

            ${tableCard("Weekly Teaching Timetable","Sample academic timetable",
                ["DAY","TIME","SUBJECT","VENUE","STATUS"],
                timetable.map(t => `
                    <tr>
                        <td><strong>${t.day}</strong></td>
                        <td>${t.time}</td>
                        <td>${t.subject}</td>
                        <td>${t.room}</td>
                        <td>${statusBadge("Active")}</td>
                    </tr>
                `))}
            ${footer()}
        `;
    }

    // =====================================
    // ASSIGNMENTS
    // =====================================

    function renderAssignments() {

        return `
            ${pageIntro("Assignment Management","Monitor assignments, submissions and assessment records.")}
            ${pageToolbar("Assignment records and submissions","Create Assignment")}

            ${tableCard("Assignment Directory","Sample assignment records",
                ["ASSIGNMENT","SUBJECT","LECTURER","DUE DATE","STATUS"],
                assignments.map(a => `
                    <tr>
                        <td><strong>${a.title}</strong></td>
                        <td>${a.subject}</td>
                        <td>${a.lecturer}</td>
                        <td>${a.date}</td>
                        <td>${statusBadge(a.status)}</td>
                    </tr>
                `))}
            ${footer()}
        `;
    }

    // =====================================
    // EXAMINATIONS
    // =====================================

    function renderExaminations() {

        const exams = [
            ["Human Anatomy Examination","ANAT 101","Semester I","Scheduled"],
            ["Microbiology CAT","MIC 102","Semester I","Completed"],
            ["Clinical Medicine Examination","CM 201","Semester II","Scheduled"]
        ];

        return `
            ${pageIntro("Examination Management","Manage examination schedules and academic assessment activities.")}
            ${pageToolbar("Examination schedules and records","Create Examination")}

            ${tableCard("Examination Records","Sample examination information",
                ["EXAMINATION","SUBJECT CODE","SEMESTER","STATUS"],
                exams.map(e => `
                    <tr>
                        <td><strong>${e[0]}</strong></td>
                        <td>${e[1]}</td>
                        <td>${e[2]}</td>
                        <td>${statusBadge(e[3] === "Completed" ? "Approved" : "Pending")}</td>
                    </tr>
                `))}
            ${footer()}
        `;
    }

    // =====================================
    // RESULTS MANAGEMENT
    // =====================================

    function renderResults() {

        const rows = results.map(r => `
            <tr>
                <td><strong>${r.subject}</strong><small>${r.code}</small></td>
                <td>${r.lecturer}</td>
                <td>${r.date}</td>
                <td>${statusBadge(r.status)}</td>
                <td>
                    ${r.status === "Approved"
                        ? '<span class="status approved">Completed</span>'
                        : `<button class="text-button review-result" data-id="${r.id}">Review</button>`
                    }
                </td>
            </tr>
        `);

        return `
            ${pageIntro("Results Management","Review, verify and approve academic results submitted by lecturers.")}

            <div class="stats-grid">
                ${statCard("Submitted Results",results.length,"fa-file-arrow-up","navy")}
                ${statCard("Pending Review",results.filter(r=>r.status==="Pending").length,"fa-hourglass-half","gold")}
                ${statCard("Under Review",results.filter(r=>r.status==="Under Review").length,"fa-magnifying-glass","purple")}
                ${statCard("Approved Results",results.filter(r=>r.status==="Approved").length,"fa-circle-check","teal")}
            </div>

            <div class="content-card">
                <h3>Results Approval Workflow</h3>
                <p>Lecturer Submission → Academic Review → Academic Approval → Finance Clearance Check → Student Access</p>
            </div>

            ${tableCard("Results Submission Records","Academic Officer review and approval",
                ["SUBJECT","LECTURER","SUBMISSION DATE","STATUS","ACTION"],rows)}
            ${footer()}
        `;
    }

    // =====================================
    // ATTENDANCE
    // =====================================

    function renderAttendance() {

        const attendance = [
            ["Human Anatomy","ANAT 101","92%","Dr. Sample One"],
            ["Microbiology","MIC 102","88%","Mr. Sample Two"],
            ["Clinical Medicine","CM 201","95%","Dr. Sample Four"]
        ];

        return `
            ${pageIntro("Attendance Management","Monitor student attendance and academic participation.")}
            ${pageToolbar("Student attendance records","Add Attendance")}

            ${tableCard("Attendance Overview","Sample attendance records",
                ["SUBJECT","CODE","ATTENDANCE RATE","LECTURER","STATUS"],
                attendance.map(a=>`
                    <tr>
                        <td><strong>${a[0]}</strong></td>
                        <td>${a[1]}</td>
                        <td>${a[2]}</td>
                        <td>${a[3]}</td>
                        <td>${statusBadge("Active")}</td>
                    </tr>
                `))}
            ${footer()}
        `;
    }

    // =====================================
    // FEE CLEARANCE
    // =====================================

    function renderClearance() {

        return `
            ${pageIntro("Fee Clearance Reports","View fee clearance information verified by the Finance Office.")}

            <div class="content-card">
                <h3>Finance Clearance Information</h3>
                <p>
                    The Finance Office is responsible for confirming payments.
                    Academic Officers have read-only access to clearance records.
                </p>
            </div>

            ${pageToolbar("Student fee clearance status","")}

            ${tableCard("Student Clearance Records","Illustrative sample financial information",
                ["REGISTRATION NO.","TOTAL FEES (TZS)","PAID (TZS)","BALANCE (TZS)","STATUS"],
                clearance.map(c=>`
                    <tr>
                        <td><strong>${c.id}</strong></td>
                        <td>${c.total}</td>
                        <td>${c.paid}</td>
                        <td>${c.balance}</td>
                        <td>${statusBadge(c.status)}</td>
                    </tr>
                `))}
            ${footer()}
        `;
    }

    // =====================================
    // ACADEMIC REPORTS
    // =====================================

    function renderReports() {

        return `
            ${pageIntro("Academic Reports","Review academic performance and institutional statistics.")}

            <div class="stats-grid">
                ${statCard("Total Students","1,248","fa-users","navy")}
                ${statCard("Programmes","16","fa-book","teal")}
                ${statCard("Results Approved","04","fa-check-circle","gold")}
                ${statCard("Academic Year","2026/27","fa-calendar","purple")}
            </div>

            <div class="content-card">
                <h3>Available Academic Reports</h3>
                <p>Report categories for academic administration.</p>
            </div>

            ${tableCard("Report Categories","Available report sections",
                ["REPORT","DESCRIPTION","ACTION"],
                [
                    `<tr><td><strong>Student Registration Report</strong></td><td>Student enrolment statistics</td><td><button class="text-button" data-report="Student Registration">View</button></td></tr>`,
                    `<tr><td><strong>Results Performance Report</strong></td><td>Academic results and performance</td><td><button class="text-button" data-report="Results Performance">View</button></td></tr>`,
                    `<tr><td><strong>Attendance Report</strong></td><td>Student attendance summaries</td><td><button class="text-button" data-report="Attendance">View</button></td></tr>`,
                    `<tr><td><strong>Fee Clearance Report</strong></td><td>Student clearance summaries</td><td><button class="text-button" data-report="Fee Clearance">View</button></td></tr>`
                ])}
            ${footer()}
        `;
    }

    // =====================================
    // NOTIFICATIONS
    // =====================================

    function renderNotifications() {

        return `
            ${pageIntro("Notifications","View important academic and administrative updates.")}

            <div class="content-card">
                <h3>Recent Notifications</h3>
                <p>System updates and academic messages.</p>
            </div>

            ${tableCard("Notification Centre","Recent messages",
                ["NOTIFICATION","MESSAGE","DATE","STATUS"],
                notifications.map(n=>`
                    <tr>
                        <td><strong>${n.title}</strong></td>
                        <td>${n.message}</td>
                        <td>${n.date}</td>
                        <td>${statusBadge("Active")}</td>
                    </tr>
                `))}
            ${footer()}
        `;
    }

    // =====================================
    // USER ACCOUNTS
    // =====================================

    function renderUsers() {

        const users = [
            ["USR001","Academic Officer","Academic Office","Active"],
            ["USR002","Lecturer","Academic Department","Active"],
            ["USR003","Finance Officer","Finance Office","Active"],
            ["USR004","Student","Student Portal","Active"]
        ];

        return `
            ${pageIntro("User Accounts","Manage portal accounts and institutional user roles.")}
            ${pageToolbar("User account directory","Create Account")}

            ${tableCard("System Users","Illustrative user accounts",
                ["USER ID","ROLE","DEPARTMENT","STATUS","ACTION"],
                users.map(u=>`
                    <tr>
                        <td><strong>${u[0]}</strong></td>
                        <td>${u[1]}</td>
                        <td>${u[2]}</td>
                        <td>${statusBadge(u[3])}</td>
                        <td><button class="text-button" data-user="${u[0]}">Manage</button></td>
                    </tr>
                `))}
            ${footer()}
        `;
    }

    // =====================================
    // SETTINGS
    // =====================================

    function renderSettings() {

        return `
            ${pageIntro("Portal Settings","Manage academic year and general portal preferences.")}

            <div class="content-card">
                <h3>Institution Information</h3>
                <p>Kingdom College of Health and Allied Sciences</p>

                <div class="form-group" style="margin-top:20px">
                    <label>Institution Name</label>
                    <input value="Kingdom College of Health and Allied Sciences" readonly>
                </div>

                <div class="form-group">
                    <label>Motto</label>
                    <input value="Healing Through Knowledge" readonly>
                </div>

                <div class="form-group">
                    <label>Academic Year</label>
                    <select id="academicYear">
                        <option>2026/2027</option>
                        <option>2027/2028</option>
                    </select>
                </div>

                <button class="action-button" id="saveSettings">Save Preferences</button>
            </div>

            <div class="content-card">
                <h3>Academic Administration</h3>
                <p>Settings for academic records, results and institutional activities.</p>
                <br>
                <p>Result approval authority: Academic Officer</p>
                <br>
                <p>Fee clearance authority: Finance Office</p>
                <br>
                <p>Student result access: Approved results + confirmed fee clearance</p>
            </div>

            ${footer()}
        `;
    }

    // =====================================
    // PAGE NAVIGATION
    // =====================================

    const pageRenderers = {
        dashboard:renderDashboard,
        students:renderStudents,
        lecturers:renderLecturers,
        courses:renderCourses,
        calendar:renderCalendar,
        timetable:renderTimetable,
        assignments:renderAssignments,
        examinations:renderExaminations,
        results:renderResults,
        attendance:renderAttendance,
        clearance:renderClearance,
        reports:renderReports,
        notifications:renderNotifications,
        users:renderUsers,
        settings:renderSettings
    };

    const pageTitles = {
        dashboard:"Dashboard",
        students:"Student Management",
        lecturers:"Lecturer Management",
        courses:"Courses & Subjects",
        calendar:"Academic Calendar",
        timetable:"Timetable Management",
        assignments:"Assignment Management",
        examinations:"Examination Management",
        results:"Results Management",
        attendance:"Attendance Management",
        clearance:"Fee Clearance Reports",
        reports:"Academic Reports",
        notifications:"Notifications",
        users:"User Accounts",
        settings:"Settings"
    };

    function navigateTo(page) {

        if (!pageRenderers[page]) return;

        currentPage = page;

        pageHeading.textContent = pageTitles[page];

        pageContainer.innerHTML = pageRenderers[page]();

        document.querySelectorAll(".nav-link").forEach(link => {
            link.classList.toggle("active", link.dataset.page === page);
        });

        closeMobileSidebar();

        window.scrollTo({top:0,behavior:"smooth"});
    }

    // =====================================
    // EVENT HANDLING
    // =====================================

    document.querySelectorAll(".nav-link").forEach(link => {
        link.addEventListener("click", () => {
            navigateTo(link.dataset.page);
        });
    });

    menuToggle.addEventListener("click", () => {
        sidebar.classList.add("open");
        sidebarOverlay.classList.add("show");
    });

    closeSidebar.addEventListener("click", closeMobileSidebar);

    sidebarOverlay.addEventListener("click", closeMobileSidebar);

    pageContainer.addEventListener("click", event => {

        const goButton = event.target.closest("[data-go]");

        if (goButton) {
            navigateTo(goButton.dataset.go);
            return;
        }

        const reviewButton = event.target.closest(".review-result");

        if (reviewButton) {
            reviewResult(Number(reviewButton.dataset.id));
            return;
        }

        const reportButton = event.target.closest("[data-report]");

        if (reportButton) {
            showToast(reportButton.dataset.report + " report is a prototype feature.");
            return;
        }

        const studentButton = event.target.closest("[data-student]");

        if (studentButton) {
            const student = students.find(s => s.id === studentButton.dataset.student);
            if (student) {
                showToast("Selected student: " + student.name);
            }
            return;
        }

        const lecturerButton = event.target.closest("[data-lecturer]");

        if (lecturerButton) {
            const lecturer = lecturers.find(l => l.id === lecturerButton.dataset.lecturer);
            if (lecturer) showToast("Selected lecturer: " + lecturer.name);
            return;
        }

        const courseButton = event.target.closest("[data-course]");

        if (courseButton) {
            const course = courses.find(c => c.code === courseButton.dataset.course);
            if (course) showToast("Selected course: " + course.name);
            return;
        }

        const userButton = event.target.closest("[data-user]");

        if (userButton) {
            showToast("User account management is a prototype feature.");
        }

    });

    // =====================================
    // SEARCH
    // =====================================

    pageContainer.addEventListener("input", event => {

        if (event.target.id !== "pageSearch") return;

        const query = event.target.value.toLowerCase();

        const table = pageContainer.querySelector("table");
        if (!table) return;

        table.querySelectorAll("tbody tr").forEach(row => {
            row.style.display = row.textContent.toLowerCase().includes(query)
                ? ""
                : "none";
        });

    });

    // =====================================
    // RESULTS APPROVAL
    // =====================================

    function reviewResult(id) {

        const result = results.find(r => r.id === id);

        if (!result) return;

        const approve = confirm(
            `Review: ${result.subject}\n\n` +
            `Lecturer: ${result.lecturer}\n` +
            `Current status: ${result.status}\n\n` +
            `OK = Demonstrate approval\n` +
            `Cancel = Keep under review`
        );

        if (approve) {

            const confirmed = confirm(
                "Confirm demonstration approval?\n\n" +
                "This changes only the local sample data. " +
                "It does not publish real student results."
            );

            if (confirmed) {
                result.status = "Approved";
                showToast("Sample result approved in this browser session.");
            }

        } else {
            result.status = "Under Review";
            showToast("Result moved to Under Review.");
        }

        navigateTo("results");
    }

    // =====================================
    // ADD RECORD MODALS
    // =====================================

    function openModal(title, fields) {

        const backdrop = document.createElement("div");
        backdrop.className = "modal-backdrop show";

        const modal = document.createElement("div");
        modal.className = "modal";

        modal.innerHTML = `
            <div class="modal-header">
                <h3>${title}</h3>
                <button class="modal-close" id="modalClose">&times;</button>
            </div>

            <form id="recordForm">

                ${fields.map(field => `
                    <div class="form-group">
                        <label>${field.label}</label>
                        ${field.type === "select"
                            ? `<select name="${field.name}" required>
                                <option value="">Select ${field.label}</option>
                                ${field.options.map(o=>`<option>${o}</option>`).join("")}
                               </select>`
                            : `<input name="${field.name}" type="${field.type || "text"}" placeholder="${field.placeholder || ""}" required>`
                        }
                    </div>
                `).join("")}

                <div class="modal-actions">
                    <button type="button" class="secondary-button" id="cancelModal">Cancel</button>
                    <button type="submit" class="action-button">Submit</button>
                </div>

            </form>
        `;

        backdrop.appendChild(modal);
        document.body.appendChild(backdrop);

        function closeModal() {
            backdrop.remove();
        }

        modal.querySelector("#modalClose").addEventListener("click", closeModal);
        modal.querySelector("#cancelModal").addEventListener("click", closeModal);

        backdrop.addEventListener("click", e => {
            if (e.target === backdrop) closeModal();
        });

        modal.querySelector("#recordForm").addEventListener("submit", e => {
            e.preventDefault();
            showToast("Demo form submitted. Database integration is not yet enabled.");
            closeModal();
        });
    }

    const addConfigurations = {
        students: {
            title:"Add New Student",
            fields:[
                {name:"registration",label:"Registration Number",placeholder:"KICOHAS/006"},
                {name:"name",label:"Student Name",placeholder:"Enter student name"},
                {name:"course",label:"Programme",type:"select",options:["Clinical Medicine","Nursing","Medical Laboratory Sciences","Pharmaceutical Sciences"]},
                {name:"year",label:"Academic Year",type:"select",options:["Year 1","Year 2","Year 3"]}
            ]
        },

        lecturers: {
            title:"Add New Lecturer",
            fields:[
                {name:"name",label:"Lecturer Name",placeholder:"Enter lecturer name"},
                {name:"staffid",label:"Staff ID",placeholder:"LEC005"},
                {name:"department",label:"Department",placeholder:"Enter department"}
            ]
        },

        courses: {
            title:"Add Academic Course",
            fields:[
                {name:"name",label:"Course Name",placeholder:"Enter programme name"},
                {name:"code",label:"Course Code",placeholder:"Enter course code"},
                {name:"duration",label:"Duration",placeholder:"e.g. 3 Years"}
            ]
        },

        calendar: {
            title:"Add Academic Event",
            fields:[
                {name:"event",label:"Event Name",placeholder:"Enter event name"},
                {name:"date",label:"Event Date",type:"date"},
                {name:"category",label:"Category",type:"select",options:["Academic","Examination","Assessment","Other"]}
            ]
        },

        timetable: {
            title:"Add Timetable Entry",
            fields:[
                {name:"subject",label:"Subject",placeholder:"Enter subject"},
                {name:"day",label:"Day",type:"select",options:["Monday","Tuesday","Wednesday","Thursday","Friday"]},
                {name:"time",label:"Time",placeholder:"08:00 - 10:00"},
                {name:"venue",label:"Venue",placeholder:"Enter classroom"}
            ]
        },

        assignments: {
            title:"Create Assignment",
            fields:[
                {name:"title",label:"Assignment Title",placeholder:"Enter title"},
                {name:"subject",label:"Subject",placeholder:"Enter subject"},
                {name:"date",label:"Due Date",type:"date"}
            ]
        },

        examinations: {
            title:"Create Examination",
            fields:[
                {name:"exam",label:"Examination Name",placeholder:"Enter examination"},
                {name:"subject",label:"Subject",placeholder:"Enter subject"},
                {name:"date",label:"Examination Date",type:"date"}
            ]
        },

        attendance: {
            title:"Add Attendance Record",
            fields:[
                {name:"subject",label:"Subject",placeholder:"Enter subject"},
                {name:"date",label:"Date",type:"date"},
                {name:"attendance",label:"Attendance Rate (%)",type:"number",placeholder:"95"}
            ]
        },

        users: {
            title:"Create User Account",
            fields:[
                {name:"username",label:"Username",placeholder:"Enter username"},
                {name:"email",label:"Email",type:"email",placeholder:"Enter email"},
                {name:"role",label:"User Role",type:"select",options:["Academic Officer","Lecturer","Finance Officer","Student"]}
            ]
        }
    };

    pageContainer.addEventListener("click", event => {

        if (event.target.id === "addRecord") {

            const config = addConfigurations[currentPage];

            if (config) {
                openModal(config.title,config.fields);
            }

        }

    });

    // =====================================
    // QUICK ACTION
    // =====================================

    pageContainer.addEventListener("click", event => {

        if (event.target.closest("#quickAction")) {

            openModal("Quick Academic Action",[
                {
                    name:"action",
                    label:"Select Action",
                    type:"select",
                    options:[
                        "Add Student",
                        "Add Lecturer",
                        "Add Course",
                        "Create Assignment",
                        "Schedule Examination"
                    ]
                }
            ]);

        }

    });

    // =====================================
    // NOTIFICATIONS
    // =====================================

    document.getElementById("notificationButton").addEventListener("click", () => {
        navigateTo("notifications");
    });

    // =====================================
    // SETTINGS
    // =====================================

    pageContainer.addEventListener("click", event => {

        if (event.target.id === "saveSettings") {
            showToast("Preferences saved for this demonstration only.");
        }

    });

    // =====================================
    // LOGOUT
    // =====================================

    document.getElementById("logoutBtn").addEventListener("click", () => {

        const confirmLogout = confirm("Are you sure you want to log out?");

        if (confirmLogout) {
            showToast("Logout requires secure authentication integration.");
        }

    });

    // =====================================
    // INITIALISE
    // =====================================

    navigateTo("dashboard");

});
