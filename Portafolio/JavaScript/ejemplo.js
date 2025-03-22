// Este script permite la navegación mediante anclas
document.addEventListener('DOMContentLoaded', function() {
    // Hacer que la navegación sea fija
    const nav = document.querySelector('nav');
    nav.style.position = 'fixed';
    nav.style.top = '0';
    nav.style.left = '0';
    nav.style.width = '100%';
    nav.style.zIndex = '1000';
    
    // Altura de la barra de navegación
    const navHeight = nav.offsetHeight;
    
    // Permitir desplazamiento en la página
    document.body.style.overflow = 'auto';
    document.body.style.height = 'auto';
    
    // Agregar el comportamiento de desplazamiento suave a todos los enlaces con anclas
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            
            // Si el enlace es solo "#", no hacer nada
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Calcular la posición correcta teniendo en cuenta la barra de navegación
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                // Desplazarse a la posición
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Si está en móvil, cerrar el menú desplegable
                const dropdown = document.querySelector('.dropdown');
                if (dropdown) {
                    dropdown.style.transform = 'translateY(-500px)';
                }
            }
        });
    });
});