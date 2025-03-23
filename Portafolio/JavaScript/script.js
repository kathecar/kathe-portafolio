function hamburg() {
    const navbar = document.querySelector(".dropdown");
    navbar.style.transform = "translateY(0px)";
    navbar.style.backgroundColor = "rgba(0, 0, 0, 0.8)"; // Add a semi-transparent black background
}

function cancel() {
    const navbar = document.querySelector(".dropdown");
    navbar.style.transform = "translateY(-500px)";
    // No need to change background color here as it will be hidden
}
// Typewriter Effect
const texts = [
    "Desarrolladora Full Stack",
    "Katherinne Cardenas", 
]
let speed = 100;
const textElements = document.querySelector(".typewriter-text");
let textIndex = 0;
let charcterIndex = 0;

function typeWriter(){
    if (charcterIndex < texts[textIndex].length){
        textElements.innerHTML += texts[textIndex].charAt(charcterIndex);
        charcterIndex++;
        setTimeout(typeWriter, speed);
    }
    else{
        setTimeout(eraseText, 1000)
    }
}

function eraseText(){
    if(textElements.innerHTML.length > 0){
        textElements.innerHTML = textElements.innerHTML.slice(0,-1);
        setTimeout(eraseText, 50)
    }
    else{
        textIndex = (textIndex + 1) % texts.length;
        charcterIndex = 0;
        setTimeout(typeWriter, 500)
    }
}

window.onload = typeWriter;

//SECCION ABOUT

document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.querySelector('.toggle-text');
    const hiddenText = document.querySelector('.hidden-text');
    
    toggleBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (hiddenText.style.display === 'inline' || hiddenText.style.display === '') {
            hiddenText.style.display = 'none';
            toggleBtn.textContent = 'Ver más';
        } else {
            hiddenText.style.display = 'inline';
            toggleBtn.textContent = 'Ver menos';
        }
    });
});


//SECCION HABILIDADES

document.addEventListener('DOMContentLoaded', function() {
    const toggleBtn = document.querySelector('.skills .toggle-text');
    const hiddenText = document.querySelector('.skills .hidden-text');
    
    // Set initial state
    hiddenText.style.display = 'none';
    
    toggleBtn.addEventListener('click', function(e) {
        e.preventDefault();
        
        if (hiddenText.style.display === 'none') {
            hiddenText.style.display = 'inline';
            toggleBtn.textContent = 'Ver menos';
        } else {
            hiddenText.style.display = 'none';
            toggleBtn.textContent = 'Ver más';
        }
    });
});

// JavaScript para controlar el carrusel
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todos los carruseles
    const carousels = document.querySelectorAll('.carousel');
    
    carousels.forEach(carousel => {
        const items = carousel.querySelectorAll('.carousel-item');
        const dots = carousel.querySelectorAll('.dot');
        const prevBtn = carousel.querySelector('.prev-btn');
        const nextBtn = carousel.querySelector('.next-btn');
        let currentIndex = 0;
        
        // Función para mostrar una imagen específica
        function showSlide(index) {
            // Asegurarse de que el índice esté dentro del rango
            if (index < 0) {
                currentIndex = items.length - 1;
            } else if (index >= items.length) {
                currentIndex = 0;
            } else {
                currentIndex = index;
            }
            
            // Ocultar todas las imágenes y desactivar todos los puntos
            items.forEach(item => item.classList.remove('active'));
            dots.forEach(dot => dot.classList.remove('active'));
            
            // Mostrar la imagen actual y activar el punto correspondiente
            items[currentIndex].classList.add('active');
            dots[currentIndex].classList.add('active');
        }
        
        // Event listeners para los botones anterior y siguiente
        prevBtn.addEventListener('click', () => {
            showSlide(currentIndex - 1);
        });
        
        nextBtn.addEventListener('click', () => {
            showSlide(currentIndex + 1);
        });
        
        // Event listeners para los puntos
        dots.forEach(dot => {
            dot.addEventListener('click', () => {
                const index = parseInt(dot.getAttribute('data-index'));
                showSlide(index);
            });
        });
        
        // Iniciar carrusel automático
        let interval = setInterval(() => {
            showSlide(currentIndex + 1);
        }, 4000);
        
        // Detener el carrusel automático al pasar el mouse sobre él
        carousel.addEventListener('mouseenter', () => {
            clearInterval(interval);
        });
        
        // Reanudar el carrusel automático al quitar el mouse
        carousel.addEventListener('mouseleave', () => {
            interval = setInterval(() => {
                showSlide(currentIndex + 1);
            }, 4000);
        });
        
        // También podemos permitir que el usuario deslice en dispositivos móviles
        let touchStartX = 0;
        let touchEndX = 0;
        
        carousel.addEventListener('touchstart', e => {
            touchStartX = e.changedTouches[0].screenX;
        });
        
        carousel.addEventListener('touchend', e => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });
        
        function handleSwipe() {
            if (touchEndX < touchStartX - 50) {
                // Deslizar a la izquierda
                showSlide(currentIndex + 1);
            } else if (touchEndX > touchStartX + 50) {
                // Deslizar a la derecha
                showSlide(currentIndex - 1);
            }
        }
    });
});

//SECCION CONTACTAME

document.getElementById("contact-form").addEventListener("submit", async function(event) {
    event.preventDefault(); // Evita que la página se recargue

    let form = this;
    let formData = new FormData(form);
// tomamos los datos ingresados

    try {
        let response = await fetch(form.action, { method: "POST", body: formData });
// con el fetch enviariamos los datos y el await espera a esa confirmacion antes de ejecutar el resto del codigo

        let messageBox = document.getElementById("form-message");
        messageBox.textContent = response.ok ? "✅ Formulario enviado correctamente." : "❌ Error al enviar el mensaje.";
        messageBox.style.display = "block";
        messageBox.style.color = response.ok ? "green" : "red";

        //Ahora si se envia correctamente o no se envia me va a mostrar un mensaje 
        if (response.ok) form.reset(); 
        // Reinicia el formulario si el envío fue exitoso
    } catch {
        alert("❌ Error de conexión. Inténtalo de nuevo.");
    }// Alerta si la conexion ha fallado 
});