document.addEventListener('DOMContentLoaded', function() {
    // Typewriter function
    function typeWriter() {
        const textElements = document.querySelector(".typewriter-text");
        
        // Check if textElements exists before proceeding
        if (!textElements) {
            console.warn("Typewriter text element not found");
            return;
        }

        if (textIndex < texts.length) {
            const currentText = texts[textIndex];
            if (charcterIndex < currentText.length) {
                textElements.innerHTML += currentText.charAt(charcterIndex);
                charcterIndex++;
                setTimeout(typeWriter, speed);
            } else {
                setTimeout(eraseText, 1000);
            }
        }
    }

    function eraseText() {
        const textElements = document.querySelector(".typewriter-text");
        
        // Check if textElements exists before proceeding
        if (!textElements) {
            console.warn("Typewriter text element not found");
            return;
        }

        if (textElements.innerHTML.length > 0) {
            textElements.innerHTML = textElements.innerHTML.slice(0, -1);
            setTimeout(eraseText, 50);
        } else {
            textIndex = (textIndex + 1) % texts.length;
            charcterIndex = 0;
            setTimeout(typeWriter, 500);
        }
    }

    // Safely add event listeners
    function safeAddEventListener(selector, eventType, handler) {
        const element = document.querySelector(selector);
        if (element) {
            element.addEventListener(eventType, handler);
        } else {
            console.warn(`Element not found: ${selector}`);
        }
    }

    // Hamburger menu toggle
    safeAddEventListener('.hamburg', 'click', function() {
        const dropdown = document.querySelector('.dropdown');
        if (dropdown) {
            dropdown.style.transform = 'translateY(0)';
        }
    });

    safeAddEventListener('.cancel', 'click', function() {
        const dropdown = document.querySelector('.dropdown');
        if (dropdown) {
            dropdown.style.transform = 'translateY(-500px)';
        }
    });

    // Contact form submission
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", async function(event) {
            event.preventDefault();

            let formData = new FormData(this);

            try {
                let response = await fetch(this.action, { method: "POST", body: formData });

                let messageBox = document.getElementById("form-message");
                if (messageBox) {
                    messageBox.textContent = response.ok 
                        ? "✅ Formulario enviado correctamente." 
                        : "❌ Error al enviar el mensaje.";
                    messageBox.style.display = "block";
                    messageBox.style.color = response.ok ? "green" : "red";

                    if (response.ok) this.reset();
                }
            } catch {
                alert("❌ Error de conexión. Inténtalo de nuevo.");
            }
        });
    }

    // Initial typewriter call
    typeWriter();
});

// Typewriter Effect Configuration
const texts = [
    "Desarrolladora Full Stack",
    "Katherinne Cardenas", 
];
let speed = 100;
let textIndex = 0;
let charcterIndex = 0;

// Remaining utility functions
function hamburg() {
    const navbar = document.querySelector(".dropdown");
    if (navbar) {
        navbar.style.transform = "translateY(0px)";
        navbar.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    }
}

function cancel() {
    const navbar = document.querySelector(".dropdown");
    if (navbar) {
        navbar.style.transform = "translateY(-500px)";
    }
}