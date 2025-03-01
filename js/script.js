const populateCustomerSelect = async () => {
    const customerRes = await fetch('https://localhost:7092/api/customer');
    const customers = await customerRes.json();

    const customerSelect = document.getElementById('customer');

    customerSelect.innerHTML = '<option selected disabled hidden value="0">Select a customer from the list</option>';

    for ( let customer of customers) {
        customerSelect.innerHTML += 
        `
            <option value="${customer.id}">${customer.customerName}</option>
        `
    }
}
const populateStatusSelect = async () => {
    const statusRes = await fetch('https://localhost:7092/api/status');
    const statuses = await statusRes.json();

    const statusSelect = document.getElementById('status');

    statusSelect.innerHTML = '<option selected disabled hidden value="0">Select status</option>';

    for ( let status of statuses) {
        statusSelect.innerHTML += 
        `
            <option value="${status.id}">${status.statusName}</option>
        `
    }
}
const populateTaskSelect = async () => {
    const taskRes = await fetch('https://localhost:7092/api/projecttask');
    const tasks = await taskRes.json();

    const taskSelect = document.getElementById('task');

    taskSelect.innerHTML = '<option selected disabled hidden value="0">Select a task</option>';

    for ( let task of tasks) {
        taskSelect.innerHTML += 
        `
            <option value="${task.id}">${task.taskName}</option>
        `
    }
}
const populateCategorySelect = async () => {
    const categoryRes = await fetch('https://localhost:7092/api/projectcategory');
    const categories = await categoryRes.json();

    const categorySelect = document.getElementById('category');

    categorySelect.innerHTML = '<option selected disabled hidden value="0">Select a category</option>';

    for ( let category of categories) {
        categorySelect.innerHTML += 
        `
            <option value="${category.id}">${category.categoryName}</option>
        `
    }
}
const handleProjectDto = async (e) => {
    e.preventDefault();
    const formData = {
        name: e.target['projectName'].value,
        description: e.target['description'].value,
        customerId: parseInt(e.target['customer'].value),
        startDate: new Date(e.target['startDate'].value).toISOString(),
        endDate: new Date(e.target['endDate'].value).toISOString(),
        projectCategoryId: parseInt(e.target['category'].value),
        statusId: parseInt(e.target['status'].value),
        projectTaskId: parseInt(e.target['task'].value),
        
    };

    const res = await fetch('https://localhost:7092/api/project', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    });

    console.log(res);
};
const populateProjectList = async () => {
    const projectRes = await fetch('https://localhost:7092/api/project');
    const projects = await projectRes.json();
    
    const projectElement = document.getElementById('project');
    projectElement.innerHTML = '';

    for ( let project of projects) {
        projectElement.innerHTML += 
        `
            <div class="project">
                <div>ID: ${project.id}</div>
                <div>Project: ${project.name}</div>
                <div>Description: ${project.description}</div>
                <div>Start Date: ${project.startDate}</div>
                <div>End Date: ${project.endDate}</div>
                <div>Customer: ${project.customer.customerName}</div>
                <div>Category: ${project.projectCategory.categoryName}</div>
                <div>Status: ${project.status.statusName}</div>
                <div>Task: ${project.projectTask.taskName}</div>
                <button class="update-btn" onclick="editProject(${project.id})">Edit</button>
                <button class="delete-btn" onclick="deleteProject(${project.id})">Delete</button>
            </div>
        `
    }

}
const deleteProject = async (id) => {
    const confirmed = confirm("Are you sure you want to delete this project?");
    if (!confirmed) return;

    try {
        const response = await fetch(`https://localhost:7092/api/project/${id}`, {
            method: 'DELETE'
        });

        if (response.ok) {
            await populateProjectList();
        } else {
            console.error("Failed to delete project");
        }
    } catch (error) {
        console.error("Error deleting project:", error);
    }
};
async function editProject(projectId) {
   // Den här metoden har jag skapat med hjälp av ChatGPT-4o för att kunna uppdatera ett projekt i databasen.
// Funktionen lyckas med att uppdatera projektet i databasen, men trots det visas ett felmeddelande om att API-anropet misslyckas.
// Jag har inte lyckats lösa problemet med felmeddelandet

    const newName = prompt("Enter new project name:");
    const newDescription = prompt("Enter new description:");
    const newStartDate = prompt("Enter new start date (YYYY-MM-DD):");
    const newEndDate = prompt("Enter new end date (YYYY-MM-DD) or leave blank:");
    const newCustomerId = prompt("Enter new customer ID:");
    const newCategoryId = prompt("Enter new project category ID:");
    const newStatusId = prompt("Enter new status ID:");
    const newTaskId = prompt("Enter new project task ID:");

   
    if (!newName || !newDescription || !newStartDate || !newCustomerId || !newCategoryId || !newStatusId || !newTaskId) {
        alert("Please fill in all required fields.");
        return;
    }

    const updatedProject = {
        id: projectId,
        name: newName,
        description: newDescription,
        startDate: new Date(newStartDate).toISOString(),
        endDate: newEndDate ? new Date(newEndDate).toISOString() : null,
        customerId: parseInt(newCustomerId),
        projectCategoryId: parseInt(newCategoryId),
        statusId: parseInt(newStatusId),
        projectTaskId: parseInt(newTaskId),
    };

    console.log("Sending updated project:", updatedProject);

    try {
        // Skickar den uppdaterade informationen till servern via en PUT-förfrågan
        const res = await fetch('https://localhost:7092/api/project', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedProject)
        });
    
        console.log('Status:', res.status);
        console.log('Response:', res);     
    
        if (!res.ok) throw new Error(`Server responded with ${res.status}`);
    
        alert('Project updated successfully!');
        location.reload();
    } catch (error) {
        console.error('Error updating project:', error.message);
        alert(`An error occurred: ${error.message}`);
    }
    
}







    


