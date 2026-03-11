// --- IIFE: Evita poluição do escopo global ---
(function() {
    'use strict';

    // --- 1. CONFIGURAÇÕES GERAIS ---
    const CONFIG = {
        scrollThreshold: 50,
        typingSpeed: 150,
        cursorSize: 40,
        cursorHoverSize: 60,
        tiltMaxRotation: 15
    };

    // --- 2. MENU MOBILE ---
    const initMobileMenu = () => {
        const menuToggle = document.querySelector('.menu-toggle');
        const navLinks = document.querySelector('.nav-links');
        
        if (!menuToggle || !navLinks) return;

        const toggleMenu = () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            icon.classList.toggle('fa-bars');
            icon.classList.toggle('fa-times');
        };

        menuToggle.addEventListener('click', toggleMenu);

        // Fecha ao clicar em um link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.querySelector('i').classList.add('fa-bars');
                menuToggle.querySelector('i').classList.remove('fa-times');
            });
        });

        // Fecha ao clicar fora do menu
        document.addEventListener('click', (e) => {
            if (!navLinks.contains(e.target) && !menuToggle.contains(e.target)) {
                navLinks.classList.remove('active');
                menuToggle.querySelector('i').classList.add('fa-bars');
                menuToggle.querySelector('i').classList.remove('fa-times');
            }
        });
    };

    // --- 3. HEADER DINÂMICO (Otimizado com throttle) ---
    const initHeaderScroll = () => {
        const header = document.querySelector('header');
        if (!header) return;

        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    if (window.scrollY > CONFIG.scrollThreshold) {
                        header.classList.add('scrolled');
                    } else {
                        header.classList.remove('scrolled');
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });
    };

    // --- 4. EFEITO DE DIGITAÇÃO (Melhorado) ---
    const initTypingEffect = () => {
        const textElement = document.querySelector('.typing-text');
        if (!textElement) return;

        const textToType = "Desenvolvedor Web";
        let index = 0;
        let isDeleting = false;

        function typeWriter() {
            const currentText = isDeleting 
                ? textToType.substring(0, index - 1)
                : textToType.substring(0, index + 1);
            
            textElement.textContent = currentText;

            if (!isDeleting && index === textToType.length) {
                setTimeout(typeWriter, 2000); // Pausa ao terminar
                isDeleting = true;
            } else if (isDeleting && index === 0) {
                isDeleting = false;
                setTimeout(typeWriter, 500);
            } else {
                const speed = isDeleting ? 50 : CONFIG.typingSpeed;
                index += isDeleting ? -1 : 1;
                setTimeout(typeWriter, speed);
            }
        }

        window.addEventListener('load', () => {
            setTimeout(typeWriter, 1000);
        });
    };

    // --- 5. SCROLL REVEAL (Otimizado) ---
    const initScrollReveal = () => {
        const hiddenElements = document.querySelectorAll('.hidden');
        if (hiddenElements.length === 0) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    observer.unobserve(entry.target); // Para de observar após animar
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        hiddenElements.forEach(el => observer.observe(el));
    };

    // --- 6. CURSOR PERSONALIZADO (Com detecção de touch) ---
    const initCustomCursor = () => {
        // Detecta se é dispositivo touch
        const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) return;

        const cursor = document.createElement('div');
        cursor.classList.add('custom-cursor');
        document.body.appendChild(cursor);

        const cursorDot = document.createElement('div');
        cursorDot.classList.add('custom-cursor-dot');
        document.body.appendChild(cursorDot);

        const moveCursor = (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
        };

        document.addEventListener('mousemove', moveCursor);

        const hoverables = document.querySelectorAll('a, button, .project-card, .skill-tag, .btn-contact, .social-icon, .social-btn');
        hoverables.forEach(el => {
            el.addEventListener('mouseenter', () => cursor.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => cursor.classList.remove('cursor-hover'));
        });
    };

    // --- 7. EFEITO 3D NO CARTÃO DE PERFIL (HERO) ---
    const initTiltEffect = () => {
        const card = document.getElementById('tilt-card');
        const cardContent = document.querySelector('.card-content');
        
        if (!card || !cardContent) return;

        let timeout;

        card.addEventListener('mousemove', (e) => {
            clearTimeout(timeout);
            
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xRotation = -((y - rect.height / 2) / 15);
            const yRotation = (x - rect.width / 2) / 15;
            
            cardContent.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) scale(1.05)`;
        });

        card.addEventListener('mouseleave', () => {
            timeout = setTimeout(() => {
                cardContent.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            }, 100);
        });
    };

    // --- 8. EFEITO 3D NO CARTÃO DA SEÇÃO SOBRE ---
    const initAboutTiltEffect = () => {
        const aboutCard = document.getElementById('about-tilt-card');
        const aboutCardContent = document.querySelector('.card-content');
        
        if (!aboutCard || !aboutCardContent) return;

        let timeout;

        aboutCard.addEventListener('mousemove', (e) => {
            clearTimeout(timeout);
            
            const rect = aboutCard.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xRotation = -((y - rect.height / 2) / 15);
            const yRotation = (x - rect.width / 2) / 15;
            
            aboutCardContent.style.transform = `perspective(1000px) rotateX(${xRotation}deg) rotateY(${yRotation}deg) scale(1.05)`;
        });

        aboutCard.addEventListener('mouseleave', () => {
            timeout = setTimeout(() => {
                aboutCardContent.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            }, 100);
        });
    };

    // --- 9. EFEITO 3D NO NOME (INTERATIVO) ---
    const initName3D = () => {
        const nameContainer = document.querySelector('.name-3d-container');
        const nameLayers = document.querySelectorAll('.name-layer');
        
        if (!nameContainer || nameLayers.length === 0) return;

        let timeout;

        nameContainer.addEventListener('mousemove', (e) => {
            clearTimeout(timeout);
            
            const rect = nameContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xRotation = (y - rect.height / 2) / 20;
            const yRotation = (x - rect.width / 2) / 20;
            
            nameLayers.forEach((layer, index) => {
                const depth = (index + 1) * 2;
                layer.style.transform = `translateX(${xRotation * depth}px) translateY(${yRotation * depth}px)`;
            });
        });

        nameContainer.addEventListener('mouseleave', () => {
            timeout = setTimeout(() => {
                nameLayers.forEach(layer => {
                    layer.style.transform = 'translateX(0) translateY(0)';
                });
            }, 100);
        });
    };

    // --- 10. SMOOTH SCROLL PARA ANCHORS ---
    const initSmoothScroll = () => {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
    };

    // --- 11. INICIALIZAÇÃO ---
    const init = () => {
        initMobileMenu();
        initHeaderScroll();
        initTypingEffect();
        initScrollReveal();
        initCustomCursor();
        initTiltEffect();
        initAboutTiltEffect();
        initSmoothScroll();
        initName3D();
    };

    // Inicia quando o DOM estiver pronto
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

})();