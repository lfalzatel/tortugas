// ========================================
// Variables Globales
// ========================================
const navbar = document.getElementById('navbar');
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

// ========================================
// Mobile Navigation Toggle
// ========================================
if (mobileNavToggle) {
    mobileNavToggle.addEventListener('click', function() {
        navbar.classList.toggle('mobile-nav-active');
        
        // Cambiar icono
        const icon = this.querySelector('i');
        if (navbar.classList.contains('mobile-nav-active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    // Cerrar menú al hacer clic en un enlace (móvil)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 1024) {
                navbar.classList.remove('mobile-nav-active');
                const icon = mobileNavToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Cerrar menú al hacer clic fuera (móvil)
    document.addEventListener('click', (e) => {
        if (window.innerWidth < 1024) {
            if (!navbar.contains(e.target) && !mobileNavToggle.contains(e.target)) {
                navbar.classList.remove('mobile-nav-active');
                const icon = mobileNavToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
}

// ========================================
// Active Navigation on Scroll
// ========================================
function updateActiveNav() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Ejecutar al cargar y al hacer scroll
window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);

// ========================================
// Smooth Scroll
// ========================================
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ========================================
// Scroll Animations
// ========================================
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.feature-card, .habitat-card, .diet-card, .threat-card, .help-card, .timeline-item');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        // Verificar si el elemento está en el viewport
        if (elementTop < window.innerHeight - 100 && elementBottom > 0) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
};

// Inicializar opacidad para animaciones
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.feature-card, .habitat-card, .diet-card, .threat-card, .help-card, .timeline-item');
    
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = `all 0.6s ease ${index * 0.1}s`;
    });
    
    // Ejecutar animación inicial
    animateOnScroll();
});

window.addEventListener('scroll', animateOnScroll);

// ========================================
// Counter Animation (para estadísticas si se agregan)
// ========================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = Math.round(target);
            clearInterval(timer);
        } else {
            element.textContent = Math.round(current);
        }
    }, 16);
}

// ========================================
// Typing Effect (opcional para el hero)
// ========================================
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Activar efecto de escritura en el hero si existe
window.addEventListener('load', () => {
    const typedTextElement = document.querySelector('.typed-text');
    if (typedTextElement) {
        const originalText = typedTextElement.textContent;
        typeWriter(typedTextElement, originalText, 50);
    }
});

// ========================================
// Parallax Effect (opcional)
// ========================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.getElementById('hero');
    
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// ========================================
// Back to Top Button (opcional)
// ========================================
const createBackToTopButton = () => {
    const button = document.createElement('button');
    button.innerHTML = '<i class="fas fa-arrow-up"></i>';
    button.className = 'back-to-top';
    button.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    `;
    
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    document.body.appendChild(button);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            button.style.opacity = '1';
            button.style.visibility = 'visible';
        } else {
            button.style.opacity = '0';
            button.style.visibility = 'hidden';
        }
    });
    
    button.addEventListener('mouseenter', () => {
        button.style.transform = 'scale(1.1)';
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'scale(1)';
    });
};

// Crear botón de volver arriba
createBackToTopButton();

// ========================================
// Loading Animation (opcional)
// ========================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ========================================
// Console Message (opcional)
// ========================================
console.log('%c🐢 Mundo de las Tortugas', 'color: #667eea; font-size: 24px; font-weight: bold;');
console.log('%cProtegiendo la biodiversidad del planeta', 'color: #764ba2; font-size: 14px;');

// ========================================
// Prevent Default on Empty Links
// ========================================
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
    });
});