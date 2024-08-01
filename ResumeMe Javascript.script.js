document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('resumeForm');
    
    // Load saved data if available
    loadProgress();

    form.addEventListener('submit', function (e) {
        // Add your form validation logic here
        // e.g., checking if all required fields are filled
        const requiredFields = document.querySelectorAll('[required]');
        let allFieldsFilled = true;
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                allFieldsFilled = false;
                field.style.borderColor = 'red';
            } else {
                field.style.borderColor = '#ccc';
            }
        });

        if (!allFieldsFilled) {
            e.preventDefault();
            alert('Please fill in all required fields.');
        }
    });
});

function saveProgress() {
    const form = document.getElementById('resumeForm');
    const formData = new FormData(form);
    const formObject = {};
    
    formData.forEach((value, key) => {
        formObject[key] = value;
    });

    localStorage.setItem('resumeFormData', JSON.stringify(formObject));
    alert('Progress saved!');
}

function loadProgress() {
    const savedData = localStorage.getItem('resumeFormData');
    
    if (savedData) {
        const formObject = JSON.parse(savedData);
        
        for (const key in formObject) {
            const field = document.querySelector(`[name=${key}]`);
            if (field) {
                field.value = formObject[key];
            }
        }
    }
}
