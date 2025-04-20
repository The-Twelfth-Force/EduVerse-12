const ProfessorDashboard = {
    init: function() {
        this.loadContent();
    },

    loadContent: function() {
        const urlParams = new URLSearchParams(window.location.search);
        const sectionId = urlParams.get('sectionId');

        fetch(`../auth/professor/fetch_content.php?sectionId=${encodeURIComponent(sectionId)}`)
            .then(res => res.json())
            .then(data => this.renderContent(data.contents))
            .catch(err => console.error('Load Content Error:', err));
    },

    renderContent: function(contents) {
        const assignmentsDiv = document.getElementById('assignmentsList');
        const projectsDiv = document.getElementById('projectsList');
        const quizzesDiv = document.getElementById('quizzesList');

        assignmentsDiv.innerHTML = '';
        projectsDiv.innerHTML = '';
        quizzesDiv.innerHTML = '';

        if (!contents.length) {
            assignmentsDiv.innerHTML = '<p>No assignments uploaded yet.</p>';
            projectsDiv.innerHTML = '<p>No projects uploaded yet.</p>';
            quizzesDiv.innerHTML = '<p>No quizzes uploaded yet.</p>';
            return;
        }

        for (const content of contents) {
            const html = `
                <div>
                    <a href="../uploads/${content.FilePath}" target="_blank">${content.Title}</a> (Uploaded: ${content.UploadDate})
                    <button onclick="ProfessorDashboard.deleteContent(${content.ContentID})">Delete</button>
                </div>
            `;

            if (content.ContentType === 'Assignment') {
                assignmentsDiv.innerHTML += html;
            } else if (content.ContentType === 'Project') {
                projectsDiv.innerHTML += html;
            } else if (content.ContentType === 'Quiz') {
                quizzesDiv.innerHTML += html;
            }
        }
    },

    showCreateForm: function(contentType) {
        document.getElementById('createContentTitle').innerText = `Create ${contentType}`;
        document.getElementById('contentTypeField').value = contentType;
        document.getElementById('createContentModal').style.display = 'block';
    },

    hideCreateForm: function() {
        document.getElementById('createContentModal').style.display = 'none';
    },

    submitContent: function() {
        const form = document.getElementById('createContentForm');
        const formData = new FormData(form);

        fetch('../auth/professor/upload_content.php', {
            method: 'POST',
            body: formData
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert('Content uploaded successfully!');
                this.hideCreateForm();
                this.loadContent();
            } else {
                alert('Failed to upload content: ' + data.message);
            }
        })
        .catch(err => console.error('Upload Content Error:', err));
    },

    deleteContent: function(contentId) {
        if (!confirm('Are you sure you want to delete this content?')) return;

        fetch('../auth/professor/delete_content.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: `contentId=${encodeURIComponent(contentId)}`
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                alert('Content deleted successfully!');
                this.loadContent();
            } else {
                alert('Failed to delete content: ' + data.message);
            }
        })
        .catch(err => console.error('Delete Content Error:', err));
    }
};

document.addEventListener('DOMContentLoaded', () => ProfessorDashboard.init());
