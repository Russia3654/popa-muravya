document.addEventListener('DOMContentLoaded', function () {
    // Initialize EmailJS with your user ID
    emailjs.init('cSCqitsWXFs832-G_'); // Replace with your EmailJS user ID

    const contactForm = document.getElementById('contact-form');
    const sendButton = document.getElementById('send-button');

    sendButton.addEventListener('click', function (event) {
        event.preventDefault(); // Prevent default form submission

        // Get form values
        const firstName = contactForm.elements['firstName'].value;
        const lastName = contactForm.elements['lastName'].value;
        const userEmail = contactForm.elements['userEmail'].value;
        const message = contactForm.elements['message'].value;

        // Prepare the email parameters
        const templateParams = {
            from_name: `${firstName} ${lastName}`,
            user_email: userEmail,
            message: message,
            to_name: 'pierre'
        };

        // Send the email using EmailJS
        emailjs.send('service_0pvb32c', 'template_sy8j83r', templateParams)
            .then(function (response) {
                alert('Your message has been sent successfully!');
                contactForm.reset(); // Reset the form
            }, function (error) {
                alert('There was a problem sending your message. Please try again.');
                console.error('Error:', error);
            });
    });
});