const StudentPortal = {
    init: function() {
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.performSearch(e.target.value);
        });

        document.getElementById('viewRegisteredBtn').addEventListener('click', () => {
            this.viewRegisteredCourses();
        });
    },

    performSearch: function(query) {
        if (query.trim() === '') {
            document.getElementById('searchResults').innerHTML = '';
            return;
        }

        fetch('../auth/search_api.php?query=' + encodeURIComponent(query))
            .then(response => response.json())
            .then(data => this.renderSearchResults(data.courses))
            .catch(err => console.error('Error:', err));
    },

    renderSearchResults: function(courses) {
        const div = document.getElementById('searchResults');
        if (!courses.length) {
            div.innerHTML = '<p>No results found.</p>';
            return;
        }

        let html = `<table border="1"><thead><tr>
            <th>SectionNum</th><th>Course_ID</th><th>Location</th><th>Date</th><th>Professor</th><th>Action</th>
        </tr></thead><tbody>`;

        for (const course of courses) {
            html += `<tr>
                <td>${course.SectionNum}</td>
                <td>${course.Course_ID}</td>
                <td>${course.Location}</td>
                <td>${course.Date}</td>
                <td>${course.F_Name} ${course.L_Name}</td>
                <td><button onclick="StudentPortal.registerCourse(${course.SectionID})">Register</button></td>
            </tr>`;
        }

        html += '</tbody></table>';
        div.innerHTML = html;
    },

    registerCourse: function(sectionID) {
        fetch('../auth/student/student_api.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `action=register&sectionId=${encodeURIComponent(sectionID)}`
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert('Registered Successfully!');
                this.viewRegisteredCourses(); // <-- add this line to refresh courses!
            } else {
                alert('Registration Failed: ' + data.message);
            }
        })
        .catch(err => console.error('Register Error:', err));
    },
    

    viewRegisteredCourses: function() {
        fetch('../auth/student/student_api.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: 'action=viewRegistered'
        })
        .then(res => res.json())
        .then(data => this.renderRegisteredCourses(data.courses))
        .catch(err => console.error('View Registered Error:', err));
    },

    renderRegisteredCourses: function(courses) {
        const div = document.getElementById('searchResults');
        if (!courses.length) {
            div.innerHTML = '<p>No registered courses.</p>';
            return;
        }

        let html = `<h2>My Registered Courses</h2><table border="1"><thead><tr>
            <th>SectionNum</th><th>Course_ID</th><th>Location</th><th>Date</th><th>Professor</th>
        </tr></thead><tbody>`;

        for (const course of courses) {
            html += `<tr>
                <td>${course.SectionNum}</td>
                <td>${course.Course_ID}</td>
                <td>${course.Location}</td>
                <td>${course.Date}</td>
                <td>${course.F_Name} ${course.L_Name}</td>
                <td><button onclick="StudentPortal.dropCourse(${course.SectionID})">Drop</button></td>

            </tr>`;
        }

        html += '</tbody></table>';
        div.innerHTML = html;
    },



    dropCourse: function(sectionID) {
        
        fetch('../auth/student/student_api.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `action=drop&sectionId=${encodeURIComponent(sectionID)}`
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert('Dropped Successfully!');
                this.viewRegisteredCourses(); // Refresh courses after drop
            } else {
                alert('Failed to drop course.');
            }
        })
        .catch(err => console.error('Drop Error:', err));
    }
    
};

document.addEventListener('DOMContentLoaded', () => StudentPortal.init());
