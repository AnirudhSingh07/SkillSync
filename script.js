document.addEventListener('DOMContentLoaded', function () {
    // Fetch the student data for analysis
    fetch('/demographics')
        .then(response => response.json())
        .then(data => {
            // Log the student data for analysis
            console.log('Student Data:', data);

            // Assuming you want to perform analysis or visualization here
            // You can call the necessary functions based on the received data
        })
        .catch(error => {
            console.error('Error:', error);
        });
});

function submitForm() {
    // Get form values
    const formData = {
        name: document.getElementById('name').value,
        age: document.getElementById('age').value,
        gender: document.getElementById('gender').value,
        physics: document.getElementById('physics').value,
        chemistry: document.getElementById('chemistry').value,
        // ... (other form fields)
        careerPath: document.getElementById('careerPath').value,
    };

    // Send the form data to the backend
    fetch('/submit-form', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
    })
    .then(response => response.json())
    .then(data => {
        // Log the response from the server
        console.log('Form Submission Response:', data);

        // Redirect to demographics page
        window.location.href = '/demographics';
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// script.js

document.addEventListener('DOMContentLoaded', function () {
    // Assuming you have a button with id 'demographicsBtn'
    const demographicsBtn = document.getElementById('demographicsBtn');

    // Add a click event listener to the demographics button
    demographicsBtn.addEventListener('click', function () {
        // Fetch demographics data and display it
        fetch('/demographics')
            .then(response => response.json())
            .then(data => {
                // Log the demographics data for testing
                console.log('Demographics Data:', data);

                // Call a function to display the demographics
                displayDemographics(data);
            })
            .catch(error => {
                console.error('Error:', error);
            });
    });
});

function displayDemographics(data) {
    // Customize this function to display the demographics as needed
    // For example, you can update the HTML of a specific element with the data
    const demographicsContainer = document.getElementById('demographics-container');

    // Assuming you want to display a simple text representation
    demographicsContainer.innerHTML = JSON.stringify(data, null, 2);
}
