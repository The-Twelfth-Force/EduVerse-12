const ProfessorPortal = {
    init: function() {
        document.getElementById('searchInput').addEventListener('input', (e) => {
            this.performSearch(e.target.value);
        });

        document.getElementById('viewSectionsBtn').addEventListener('click', () => {
            this.viewMySections();
        });

        document.getElementById('createCourseBtn').addEventListener('click', () => {
            document.getElementById('createCourseForm').style.display = 'block';  // Show the form when button clicked
        });

        document.getElementById('submitCourseBtn').addEventListener('click', () => {
            this.createCourseOrSection();
        });
    },

    
    // Live search functionality
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

    
    // Render search results
    // This function will be called when the user types in the search box
    renderSearchResults: function(sections) {
        const div = document.getElementById('searchResults');
        if (!sections.length) {
            div.innerHTML = '<p>No sections found.</p>';
            return;
        }

        let html = `<table border="1"><thead><tr>
            <th>SectionNum</th><th>Course_ID</th><th>Location</th><th>Date</th><th>Professor</th><th>Action</th>
        </tr></thead><tbody>`;

        for (const section of sections) {
            html += `<tr>
                <td>${section.SectionNum}</td>
                <td>${section.Course_ID}</td>
                <td>${section.Location}</td>
                <td>${section.Date}</td>
                <td>${section.F_Name} ${section.L_Name}</td>
                <td><button onclick="ProfessorPortal.addSection(${section.SectionID})">Add to Teach</button></td>
            </tr>`;
        }

        html += '</tbody></table>';
        div.innerHTML = html;
    },

    
    
    
    
    addSection: function(sectionID) {
        fetch('../auth/professor/professor_api.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `action=addSection&sectionId=${encodeURIComponent(sectionID)}`
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert('Section Added Successfully!');
                this.viewMySections();
            } else {
                alert('Failed to add section: ' + data.message);
            }
        })
        .catch(err => console.error('Add Section Error:', err));
    },

    
    
    
    viewMySections: function() {
        fetch('../auth/professor/professor_api.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: 'action=viewSections'
        })
        .then(res => res.json())
        .then(data => this.renderViewMySections(data.sections))
        .catch(err => console.error('View Sections Error:', err));
    },

    
    
    
    renderViewMySections: function(sections) {
        const div = document.getElementById('searchResults');
        if (!sections.length) {
            div.innerHTML = '<p>No sections assigned yet.</p>';
            return;
        }

        let html = `<h2>My Sections</h2><table border="1"><thead><tr>
            <th>SectionNum</th><th>Course_ID</th><th>Location</th><th>Date</th>
        </tr></thead><tbody>`;

        for (const section of sections) {
            html += `<tr>
                <td>${section.SectionNum}</td>
                <td>${section.Course_ID}</td>
                <td>${section.Location}</td>
                <td>${section.Date}</td>
            </tr>`;
        }

        html += '</tbody></table>';
        div.innerHTML = html;
    },


    // Function to create a new course or section
    // This function will be called when the user submits the form
    // If the course exists, it will not create a new one and just create a new section
    // If the course does not exist, it will create a new one and add it to the course and section tables
    createCourseOrSection: function() {
        const form = document.getElementById('courseForm');
        const formData = new FormData(form);

        fetch('../auth/professor/professor_api.php', {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert('Course/Section created successfully!');
                window.location.reload();  // Optional: refresh the page to see new section
            } else {
                alert('Error: ' + data.message);
            }
        })
        .catch(err => {
            console.error('Create Course Error:', err);
            alert('Server error. Check console.');
        });
    }
};

document.addEventListener('DOMContentLoaded', () => ProfessorPortal.init());