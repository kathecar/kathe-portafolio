
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