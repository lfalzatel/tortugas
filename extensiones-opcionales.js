// ========================================
// FUNCIONES PARA EXTENSIONES OPCIONALES
// Archivo: extensiones-opcionales.js
// ========================================

// ========================================
// 1. MODO OSCURO
// ========================================

function initDarkMode() {
    // Crear botón de toggle
    const toggleButton = document.createElement('button');
    toggleButton.className = 'theme-toggle';
    toggleButton.innerHTML = '<i class="fas fa-moon"></i>';
    toggleButton.setAttribute('aria-label', 'Toggle dark mode');
    document.body.appendChild(toggleButton);

    // Cargar tema guardado
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    // Toggle al hacer clic
    toggleButton.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('.theme-toggle i');
    if (icon) {
        icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// ========================================
// 2. LOADING SCREEN
// ========================================

function initLoadingScreen() {
    // Crear loading screen
    const loadingScreen = document.createElement('div');
    loadingScreen.className = 'loading-screen';
    loadingScreen.innerHTML = `
        <div class="loading-spinner"></div>
        <div class="loading-text">Cargando...</div>
    `;
    document.body.appendChild(loadingScreen);

    // Ocultar cuando la página cargue
    window.addEventListener('load', function() {
        setTimeout(() => {
            loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                loadingScreen.remove();
            }, 500);
        }, 500);
    });
}

// ========================================
// 3. PROGRESS BAR
// ========================================

function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.innerHTML = '<div class="scroll-progress-bar"></div>';
    document.body.appendChild(progressBar);

    const progressBarFill = progressBar.querySelector('.scroll-progress-bar');

    window.addEventListener('scroll', function() {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBarFill.style.width = scrolled + '%';
    });
}

// ========================================
// 4. LIGHTBOX PARA GALERÍA
// ========================================

function initLightbox() {
    // Crear lightbox
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <button class="lightbox-close">
                <i class="fas fa-times"></i>
            </button>
            <img src="" alt="">
        </div>
    `;
    document.body.appendChild(lightbox);

    const lightboxImg = lightbox.querySelector('img');
    const closeBtn = lightbox.querySelector('.lightbox-close');

    // Abrir lightbox al hacer clic en imágenes
    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', function() {
            const imgSrc = this.querySelector('img').src;
            lightboxImg.src = imgSrc;
            lightbox.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Cerrar lightbox
    closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Cerrar con tecla Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}

// ========================================
// 5. CONTADOR DE ESTADÍSTICAS
// ========================================

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.getAttribute('data-target'));
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target.toLocaleString();
            clearInterval(timer);
        } else {
            element.textContent = Math.ceil(start).toLocaleString();
        }
    }, 16);
}

// ========================================
// 6. SISTEMA DE TABS
// ========================================

function initTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');

            // Remover clase active de todos
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));

            // Agregar clase active al seleccionado
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// ========================================
// 7. ACCORDION
// ========================================

function initAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const accordionItem = this.parentElement;
            const isActive = accordionItem.classList.contains('active');

            // Cerrar todos los items
            document.querySelectorAll('.accordion-item').forEach(item => {
                item.classList.remove('active');
            });

            // Abrir el item clickeado si no estaba activo
            if (!isActive) {
                accordionItem.classList.add('active');
            }
        });
    });
}

// ========================================
// 8. SISTEMA DE NOTIFICACIONES (TOAST)
// ========================================

function showToast(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        info: 'fa-info-circle'
    };

    toast.innerHTML = `
        <i class="fas ${icons[type]} toast-icon"></i>
        <div class="toast-message">${message}</div>
        <button class="toast-close">
            <i class="fas fa-times"></i>
        </button>
    `;

    document.body.appendChild(toast);

    // Mostrar toast
    setTimeout(() => toast.classList.add('show'), 100);

    // Cerrar al hacer clic en X
    toast.querySelector('.toast-close').addEventListener('click', () => {
        removeToast(toast);
    });

    // Auto-cerrar después de duration
    setTimeout(() => {
        removeToast(toast);
    }, duration);
}

function removeToast(toast) {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
}

// Ejemplos de uso:
// showToast('¡Operación exitosa!', 'success');
// showToast('Ha ocurrido un error', 'error');
// showToast('Información importante', 'info');

// ========================================
// 9. FILTRO DE BÚSQUEDA
// ========================================

function initSearchFilter(inputSelector, itemsSelector) {
    const searchInput = document.querySelector(inputSelector);
    const items = document.querySelectorAll(itemsSelector);

    if (searchInput && items.length > 0) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value.toLowerCase();

            items.forEach(item => {
                const text = item.textContent.toLowerCase();
                const matches = text.includes(searchTerm);
                
                item.style.display = matches ? '' : 'none';
                
                // Animación suave
                if (matches) {
                    item.style.animation = 'fadeIn 0.3s ease';
                }
            });
        });
    }
}

// Ejemplo de uso:
// initSearchFilter('.search-input', '.feature-card');

// ========================================
// 10. BOTONES DE COMPARTIR EN REDES SOCIALES
// ========================================

function initSocialShare() {
    const shareButtons = {
        facebook: function(url, title) {
            return `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        },
        twitter: function(url, title) {
            return `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`;
        },
        whatsapp: function(url, title) {
            return `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`;
        },
        email: function(url, title) {
            return `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`;
        }
    };

    document.querySelectorAll('.social-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const platform = this.classList[1]; // facebook, twitter, etc.
            const url = window.location.href;
            const title = document.title;

            if (shareButtons[platform]) {
                const shareUrl = shareButtons[platform](url, title);
                window.open(shareUrl, '_blank', 'width=600,height=400');
            }
        });
    });
}

// ========================================
// 11. LAZY LOADING DE IMÁGENES
// ========================================

function initLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');

    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Para usar: <img data-src="ruta-real.jpg" src="placeholder.jpg" alt="">

// ========================================
// 12. COPIAR AL PORTAPAPELES
// ========================================

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('¡Copiado al portapapeles!', 'success', 2000);
    }).catch(err => {
        console.error('Error al copiar:', err);
        showToast('Error al copiar', 'error', 2000);
    });
}

// Agregar botones de copiar
function initCopyButtons() {
    document.querySelectorAll('[data-copy]').forEach(btn => {
        btn.addEventListener('click', function() {
            const textToCopy = this.getAttribute('data-copy');
            copyToClipboard(textToCopy);
        });
    });
}

// ========================================
// 13. DETECCIÓN DE SCROLL HACIA ARRIBA/ABAJO
// ========================================

function initScrollDirection() {
    let lastScroll = 0;
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;

        if (currentScroll > lastScroll && currentScroll > 100) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }

        lastScroll = currentScroll;
    });
}

// ========================================
// 14. FORMULARIO DE CONTACTO
// ========================================

function initContactForm() {
    const form = document.querySelector('.contact-form');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validación básica
            const name = form.querySelector('[name="name"]').value;
            const email = form.querySelector('[name="email"]').value;
            const message = form.querySelector('[name="message"]').value;

            if (!name || !email || !message) {
                showToast('Por favor completa todos los campos', 'error');
                return;
            }

            if (!validateEmail(email)) {
                showToast('Por favor ingresa un email válido', 'error');
                return;
            }

            // Simular envío (aquí iría tu lógica de backend)
            showToast('¡Mensaje enviado correctamente!', 'success');
            form.reset();
        });
    }
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// ========================================
// 15. ANIMACIÓN DE ENTRADA DE ELEMENTOS
// ========================================

function initRevealOnScroll() {
    const reveals = document.querySelectorAll('[data-reveal]');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    reveals.forEach(reveal => {
        reveal.style.opacity = '0';
        reveal.style.transform = 'translateY(50px)';
        reveal.style.transition = 'all 0.6s ease';
        revealObserver.observe(reveal);
    });

    // CSS para revealed class
    const style = document.createElement('style');
    style.textContent = `
        [data-reveal].revealed {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

// ========================================
// INICIALIZACIÓN GLOBAL
// ========================================

// Función para inicializar todas las extensiones
function initAllExtensions() {
    // Inicializar solo las que necesites:
    
    // initDarkMode();
    // initLoadingScreen();
    // initScrollProgress();
    // initLightbox();
    // animateCounters();
    // initTabs();
    // initAccordion();
    // initSocialShare();
    // initLazyLoading();
    // initCopyButtons();
    // initContactForm();
    // initRevealOnScroll();
    
    console.log('Extensiones inicializadas');
}

// Ejecutar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAllExtensions);
} else {
    initAllExtensions();
}

// ========================================
// EXPORTAR FUNCIONES (opcional)
// ========================================

// Si usas módulos ES6:
// export {
//     initDarkMode,
//     showToast,
//     copyToClipboard,
//     animateCounters,
//     // ... otras funciones
// };

/* ========================================
   GUÍA DE USO RÁPIDO
   ========================================

   1. Incluye este archivo en tu HTML:
      <script src="extensiones-opcionales.js"></script>

   2. Descomenta las funciones que necesites en initAllExtensions()

   3. Para usar las notificaciones:
      showToast('Mensaje', 'success');

   4. Para tabs, accordion, etc., asegúrate de tener el HTML correcto

   5. Para personalizar, modifica las funciones según tus necesidades

   ======================================== */