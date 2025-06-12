// Mobile menu toggle
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');
mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// Form submission logic
const form = document.getElementById('job-request-form');
const formContainer = document.getElementById('form-container');
const successMessage = document.getElementById('success-message');

form.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // --- IMPORTANT ---
    // In a real-world application, you would send this data to a server.
    // Client-side JavaScript cannot directly send emails for security reasons.
    // You would need a backend service (e.g., using Node.js, PHP, or Python)
    // or a third-party service like EmailJS or Formspree to handle the email sending.
    //
    // The following code simulates a successful submission for demonstration.
    // -----------------

    // 1. Get form data
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    // The form data processing and console logs are removed as per the new requirements from Subtask 1.

    // 2. Hide the form and show the success message
    formContainer.classList.add('hidden');

    // Update success message content (as per Subtask 1)
    successMessage.innerHTML = `
        <h4 class="font-bold text-xl mb-2">Thank You for Your Interest!</h4>
        <p class="mb-1">This form is for demonstration purposes only and does not actively submit your request.</p>
        <p class="mb-3">To request a quote, please contact us directly:</p>
        <p class="mb-1"><a href="mailto:contact@brickdeupmasonrydemo.com" class="text-amber-600 hover:text-amber-700 font-semibold">Email: contact@elitemasonrydemo.com</a></p>
        <p><a href="tel:5551234567" class="text-amber-600 hover:text-amber-700 font-semibold">Call: (555) 123-4567</a></p>
    `;
    successMessage.classList.remove('hidden');

    // Optional: Scroll to the success message
    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // The form reset logic was removed as per Subtask 1 requirements.
});

// --- Email Sending Functionality ---
const API_BASE_URL = 'https://script.google.com/macros/s/AKfycbwE8BSAXZBSwjIn92wZ58OrCQuXhjAF7vDIElHTxf5EdCPhhDmJSvCFaq9xEFRMZbShBA/exec';

document.addEventListener('DOMContentLoaded', function() {
    // Updated to reflect new form fields
    const firstNameInput = document.getElementById('firstNameEmail');
    const lastNameInput = document.getElementById('lastNameEmail');
    const messageInput = document.getElementById('messageEmail');
    const sendEmailButton = document.getElementById('sendEmailButton');
    const messageBox = document.getElementById('messageBox');

    /**
     * Displays a message in the messageBox.
     * @param {string} message - The message to display.
     * @param {'success' | 'error' | 'info'} type - The type of message.
     */
    function showMessage(message, type) {
        // Ensure messageBox is found before trying to use it
        if (!messageBox) {
            console.error('MessageBox element not found. Cannot display message.');
            return;
        }
        messageBox.textContent = message;
        messageBox.classList.remove('hidden', 'bg-green-100', 'text-green-700', 'bg-red-100', 'text-red-700', 'bg-blue-100', 'text-blue-700');
        messageBox.classList.add('p-4', 'rounded-lg', 'text-center'); // Common classes

        if (type === 'success') {
            messageBox.classList.add('bg-green-100', 'text-green-700');
        } else if (type === 'error') {
            messageBox.classList.add('bg-red-100', 'text-red-700');
        } else { // 'info' or default
            messageBox.classList.add('bg-blue-100', 'text-blue-700');
        }
        messageBox.classList.remove('hidden'); // Make it visible
    }

    if (sendEmailButton) {
    sendEmailButton.addEventListener('click', () => {
        const firstName = firstNameInput.value.trim();
        const lastName = lastNameInput.value.trim();
        const message = messageInput.value.trim();

        if (!firstName) {
            showMessage('Please enter your First Name.', 'error');
            firstNameInput.focus(); // Optional: focus the empty field
            return;
        }
        if (!lastName) {
            showMessage('Please enter your Last Name.', 'error');
            lastNameInput.focus(); // Optional: focus the empty field
            return;
        }
        if (!message) {
            showMessage('Please enter a message before sending.', 'error');
            messageInput.focus(); // Optional: focus the empty field
            return;
        }

        // Disable button and show sending state
        sendEmailButton.disabled = true;
        sendEmailButton.textContent = 'Sending...';
        sendEmailButton.classList.add('opacity-50', 'cursor-not-allowed');
        showMessage('Sending your message...', 'info');

        const emailBodyString = `First Name: ${firstName}\nLast Name: ${lastName}\nMessage: ${message}`;
        const encodedBody = encodeURIComponent(emailBodyString);
        const fullUrl = `${API_BASE_URL}?body=${encodedBody}`;

        fetch(fullUrl, {
            method: 'GET', // GET request
            mode: 'cors', // Required for cross-origin requests to Apps Script web apps
            headers: {
                'Content-Type': 'text/plain;charset=utf-8', // Though GET, some best practices include it
            }
        })
        .then(response => response.text()) // Get the response as plain text
        .then(data => {
            if (data.includes("Email sent successfully")) {
                showMessage('Email sent successfully!', 'success');
                firstNameInput.value = ''; // Clear the first name field
                lastNameInput.value = '';  // Clear the last name field
                messageInput.value = '';   // Clear the message field
            } else {
                // If the Apps Script returns an error or unexpected response
                showMessage(`Error: ${data}`, 'error');
            }
        })
        .catch(error => {
            console.error('Fetch Error:', error);
            showMessage(`Network error or server issue: ${error.message}. Please try again.`, 'error');
        })
        .finally(() => {
            // Re-enable button and restore original state
            sendEmailButton.disabled = false;
            sendEmailButton.textContent = 'Send Email';
            sendEmailButton.classList.remove('opacity-50', 'cursor-not-allowed');
        });
    });
} else {
    // This might happen if the script runs before the DOM is fully loaded or if IDs are incorrect.
    // However, since this script is deferred and IDs are assumed correct from previous subtasks,
    // this console log is more for debugging potential future issues.
    console.log("Send Email Button not found. Email functionality will not be active.");
    }
});
