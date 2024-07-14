// Sample data for demonstration
var courses = [
    { id: 1, name: 'Mathematics', sections: ['Section A', 'Section B'] },
    { id: 2, name: 'Physics', sections: ['Section C', 'Section D'] },
    { id: 3, name: 'Computer Science', sections: ['Section E', 'Section F'] }
];

function displayCoursesAndSections() {
    var courseSectionTableBody = document.getElementById('courseSectionTableBody');
    courseSectionTableBody.innerHTML = '';

    courses.forEach(function(course) {
        var row = document.createElement('tr');
        var courseCell = document.createElement('td');
        courseCell.textContent = course.name;
        row.appendChild(courseCell);

        var sectionsCell = document.createElement('td');
        sectionsCell.textContent = course.sections.join(', ');
        row.appendChild(sectionsCell);

        var uploadMaterialsCell = document.createElement('td');
        uploadMaterialsCell.innerHTML = '<input type="file"><button onclick="uploadFiles()">Upload</button>';
        row.appendChild(uploadMaterialsCell);

        var deleteButtonCell = document.createElement('td');
        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.style.backgroundColor ='red';
        deleteButton.style.borderRadius = '5px';
        deleteButton.addEventListener('click', function() {
            if(confirm("Are you sure you want to delete the course?"))
            deleteCourse(course.id);
        });
        deleteButtonCell.appendChild(deleteButton);
        row.appendChild(deleteButtonCell);

        courseSectionTableBody.appendChild(row);
    });
}

function uploadFiles(){
    alert("Uploaded files successfully");
}
function addCourse() {
    var courseNameInput = document.getElementById('courseNameInput');
    var sectionsInput = document.getElementById('sectionsInput');
    var courseName = courseNameInput.value.trim();
    var sections = sectionsInput.value.split(',').map(section => section.trim());
    
    if (courseName) {
        // Generate a unique ID for the new course (for demonstration)
        var newCourseId = courses.length + 1;
        var newCourse = { id: newCourseId, name: courseName, sections: sections };
        courses.push(newCourse);
        displayCoursesAndSections();
        // Clear input fields after adding the course
        courseNameInput.value = '';
        sectionsInput.value = '';
    } else {
        alert('Please enter a course name.');
    }
}

function deleteCourse(courseId) {
    var index = courses.findIndex(course => course.id === courseId);
    if (index !== -1) {
        courses.splice(index, 1);
        displayCoursesAndSections();
    }
}

// Function to filter courses based on the search input
function filterCourses() {
    var input, filter, table, tr, td, i, txtValue;
    input = document.getElementById("courseSearchInput");
    filter = input.value.toUpperCase();
    table = document.getElementById("courseSectionTable");
    tr = table.getElementsByTagName("tr");
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

// Display courses and sections when the page loads
window.onload = function() {
    displayCoursesAndSections();
};

// Add event listener for search input
document.getElementById('courseSearchInput').addEventListener('keyup', filterCourses);
