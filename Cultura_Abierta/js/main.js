// MENÚ HAMBURGUESA

document.addEventListener('DOMContentLoaded', () => {
    // Menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', () => {
            const expanded = menuToggle.getAttribute('aria-expanded') === 'true' ? false : true;
            mainNav.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', expanded);
        });
        const navLinks = mainNav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 640) {
                    mainNav.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    
    // VALIDACIÓN NEWSLETTER (index.html)
    
    const newsletterForm = document.getElementById('newsletterForm');
    const emailInput = document.getElementById('newsletter-email');
    const emailError = document.getElementById('email-error');
    if (newsletterForm && emailInput && emailError) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = emailInput.value.trim();
            emailInput.setAttribute('aria-invalid', 'false');
            emailError.textContent = '';
            if (!email) {
                emailError.textContent = 'El correo electrónico es obligatorio.';
                emailInput.setAttribute('aria-invalid', 'true');
                emailInput.focus();
                return;
            }
            if (!isValidEmail(email)) {
                emailError.textContent = 'Ingresá un correo electrónico válido (ejemplo: nombre@dominio.com).';
                emailInput.setAttribute('aria-invalid', 'true');
                emailInput.focus();
                return;
            }
            emailError.textContent = '✓ ¡Suscripción exitosa! Revisá tu correo.';
            emailError.style.color = '#90be6d';
            emailInput.value = '';
            setTimeout(() => {
                emailError.textContent = '';
                emailError.style.color = '';
            }, 3000);
        });
        emailInput.addEventListener('input', () => {
            if (emailInput.getAttribute('aria-invalid') === 'true') {
                emailInput.setAttribute('aria-invalid', 'false');
                emailError.textContent = '';
            }
        });
    }

    
    // VALIDACIÓN FORMULARIO DE INSCRIPCIÓN (inscripcion.html)
    
    const inscriptionForm = document.getElementById('inscriptionForm');
    if (inscriptionForm) {
        inscriptionForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            // Helper para mostrar error
            function setError(elementId, message) {
                const errorSpan = document.getElementById(elementId);
                if (errorSpan) {
                    errorSpan.textContent = message;
                    const input = document.getElementById(elementId.replace('-error', ''));
                    if (input) input.setAttribute('aria-invalid', 'true');
                }
                isValid = false;
            }
            function clearError(elementId) {
                const errorSpan = document.getElementById(elementId);
                if (errorSpan) errorSpan.textContent = '';
                const input = document.getElementById(elementId.replace('-error', ''));
                if (input) input.setAttribute('aria-invalid', 'false');
            }

            // Limpiar errores previos
            ['fullname-error', 'email-error', 'phone-error', 'workshop-error', 'venue-error', 'terms-error'].forEach(clearError);

            // Validar nombre
            const fullname = document.getElementById('fullname').value.trim();
            if (!fullname) setError('fullname-error', 'El nombre completo es obligatorio.');
            else if (fullname.length < 3) setError('fullname-error', 'Ingresá al menos 3 caracteres.');

            // Validar email
            const email = document.getElementById('email').value.trim();
            if (!email) setError('email-error', 'El correo electrónico es obligatorio.');
            else if (!isValidEmail(email)) setError('email-error', 'El correo no es válido.');

            // Validar teléfono (opcional pero si se ingresa, formato simple)
            const phone = document.getElementById('phone').value.trim();
            if (phone && !/^[\d\s\-\(\)\+]+$/.test(phone)) {
                setError('phone-error', 'El teléfono solo puede contener números, espacios, + - ( ).');
            }

            // Validar taller
            const workshop = document.getElementById('workshop').value;
            if (!workshop) setError('workshop-error', 'Seleccioná un taller.');

            // Validar sede
            const venue = document.getElementById('venue').value;
            if (!venue) setError('venue-error', 'Seleccioná una sede.');

            // Validar términos
            const acceptTerms = document.getElementById('acceptTerms').checked;
            if (!acceptTerms) setError('terms-error', 'Debés aceptar los términos y condiciones.');

            if (isValid) {
                const successDiv = document.getElementById('formSuccessMessage');
                if (successDiv) {
                    successDiv.textContent = '✓ ¡Inscripción enviada con éxito! Te contactaremos a la brevedad.';
                    successDiv.style.display = 'block';
                    inscriptionForm.reset();
                    // Scroll al mensaje
                    successDiv.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    // Ocultar después de 5 segundos
                    setTimeout(() => {
                        successDiv.style.display = 'none';
                    }, 5000);
                }
            } else {
                // Enfocar el primer campo con error
                const firstError = document.querySelector('[aria-invalid="true"]');
                if (firstError) firstError.focus();
            }
        });

        // Reset de estilos al resetear el formulario
        inscriptionForm.addEventListener('reset', () => {
            setTimeout(() => {
                ['fullname-error', 'email-error', 'phone-error', 'workshop-error', 'venue-error', 'terms-error'].forEach(clearError);
                const successDiv = document.getElementById('formSuccessMessage');
                if (successDiv) successDiv.style.display = 'none';
            }, 10);
        });
    }

    // Función auxiliar email
    function isValidEmail(email) {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    }

    // Página activa en nav
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks2 = document.querySelectorAll('.main-nav a');
    navLinks2.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage) {
            link.classList.add('active');
            link.setAttribute('aria-current', 'page');
        }
    });
});
