const projectList = document.getElementById("projectList");

// Load Projects
async function loadProjects() {
    const response = await fetch("http://localhost:5000/projects");
    const projects = await response.json();

    projectList.innerHTML = "";

    projects.forEach(project => {
        projectList.innerHTML += `
            <div class="card">
                <h3>📌 ${project.title}</h3>
                <p><strong>Technology:</strong> ${project.technology}</p>
                <p>${project.description}</p>
                <p>
                    <strong>GitHub:</strong>
                    <a href="${project.github}" target="_blank">
                        View Repository
                    </a>
                </p>

                <button class="deleteBtn"
                    onclick="deleteProject('${project._id}')">
                    Delete
                </button>
            </div>
        `;
    });
}

// Add Project
document.getElementById("addBtn").addEventListener("click", async () => {

    const project = {
        title: document.getElementById("title").value,
        technology: document.getElementById("technology").value,
        github: document.getElementById("github").value,
        description: document.getElementById("description").value
    };

    if (
        !project.title ||
        !project.technology ||
        !project.github ||
        !project.description
    ) {
        alert("Please fill all fields!");
        return;
    }

    await fetch("http://localhost:5000/projects", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(project)
    });

    document.getElementById("title").value = "";
    document.getElementById("technology").value = "";
    document.getElementById("github").value = "";
    document.getElementById("description").value = "";

    loadProjects();
});

// Delete Project
async function deleteProject(id) {
    await fetch(`http://localhost:5000/projects/${id}`, {
        method: "DELETE"
    });

    loadProjects();
}

window.onload = loadProjects;