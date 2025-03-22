function hamburg(){
    const navbar = document.querySelector(".dropdown")
    navbar.style.transform = "translateY(0px)"
}

function cancel(){
    const navbar = document.querySelector(".dropdown")
    navbar.style.transform = "translateY(-500px)"
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