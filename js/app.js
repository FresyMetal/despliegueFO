/**
 * ==========================================================================
 * LÓGICA DE LA PRESENTACIÓN PREMIUM - ISR COMUNICACIONES ALBALAT
 * Desarrollado con GSAP, AOS e Intersection Observer.
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

    // === CONSTANTES Y SELECCIÓN DE ELEMENTOS ===
    const slides = document.querySelectorAll('.slide-section');
    const totalSlides = slides.length;
    let currentSlideIndex = 0;
    let isTransitioning = false;
    const transitionDuration = 800; // en milisegundos

    const presentationContainer = document.getElementById('presentationContainer');
    const sideDotsIndicator = document.getElementById('sideDotsIndicator');
    
    // Menú Hamburguesa y Lateral
    const menuToggleBtn = document.getElementById('menuToggleBtn');
    const slideNavMenu = document.getElementById('slideNavMenu');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const menuListItems = document.querySelectorAll('.menu-list li');

    // Botones de acción directa de slide
    const nextButtons = document.querySelectorAll('.btn-next-slide');
    const restartButtons = document.querySelectorAll('.btn-restart');

    // === INICIALIZACIÓN DE COMPONENTES ===
    
    // Inicializar AOS para animaciones de elementos
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: false, // Permitir que se repitan al volver a ver el slide
        mirror: true
    });

    // Generar dots de navegación lateral
    function createDots() {
        sideDotsIndicator.innerHTML = '';
        slides.forEach((slide, index) => {
            const dot = document.createElement('div');
            dot.classList.add('dot-indicator');
            if (index === 0) dot.classList.add('active');
            
            // Obtener etiqueta del título
            let label = `Diapositiva ${index + 1}`;
            const header = slide.querySelector('h2.section-title');
            if (header) {
                label = header.innerText.replace(/[\r\n]+/g, ' ');
            } else if (index === 0) {
                label = "Portada";
            }
            
            dot.setAttribute('data-index', index);
            dot.setAttribute('data-label', label);
            
            dot.addEventListener('click', () => {
                if (index !== currentSlideIndex) {
                    goToSlide(index);
                }
            });
            
            sideDotsIndicator.appendChild(dot);
        });
    }
    createDots();

    const dots = document.querySelectorAll('.dot-indicator');

    // === NAVEGACIÓN Y LOGICA DE SLIDES ===

    function updateActiveState() {
        // Actualizar slides
        slides.forEach((slide, index) => {
            if (index === currentSlideIndex) {
                slide.classList.add('active');
            } else {
                slide.classList.remove('active');
            }
        });

        // Actualizar dots
        dots.forEach((dot, index) => {
            if (index === currentSlideIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });

        // Actualizar ítems del menú lateral
        menuListItems.forEach((item, index) => {
            if (index === currentSlideIndex) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });

        // Re-sincronizar animaciones AOS para la diapositiva activa
        setTimeout(() => {
            AOS.refresh();
        }, 100);

        // Desencadenar animaciones específicas por slide
        handleSlideSpecificAnimations(currentSlideIndex);
    }

    function goToSlide(index) {
        if (isTransitioning) return;
        if (index < 0 || index >= totalSlides) return;
        
        isTransitioning = true;
        currentSlideIndex = index;
        
        updateActiveState();
        
        setTimeout(() => {
            isTransitioning = false;
        }, transitionDuration);
    }

    function nextSlide() {
        if (currentSlideIndex < totalSlides - 1) {
            goToSlide(currentSlideIndex + 1);
        }
    }

    function prevSlide() {
        if (currentSlideIndex > 0) {
            goToSlide(currentSlideIndex - 1);
        }
    }

    // Navegación por rueda del ratón (Wheel)
    let lastWheelTime = 0;
    window.addEventListener('wheel', (e) => {
        // Solo aplicar en modo escritorio (donde body tiene overflow:hidden)
        if (window.innerWidth > 1024) {
            e.preventDefault();
            const now = Date.now();
            if (now - lastWheelTime < transitionDuration + 100) return; // Limitar velocidad
            
            if (e.deltaY > 20) {
                nextSlide();
                lastWheelTime = now;
            } else if (e.deltaY < -20) {
                prevSlide();
                lastWheelTime = now;
            }
        }
    }, { passive: false });

    // Navegación por teclado
    window.addEventListener('keydown', (e) => {
        if (window.innerWidth > 1024) {
            // Evitar conflictos con el formulario
            if (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA') {
                return;
            }

            switch(e.key) {
                case 'ArrowDown':
                case 'ArrowRight':
                case ' ': // Spacebar
                case 'PageDown':
                    e.preventDefault();
                    nextSlide();
                    break;
                case 'ArrowUp':
                case 'ArrowLeft':
                case 'PageUp':
                    e.preventDefault();
                    prevSlide();
                    break;
                case 'Home':
                    e.preventDefault();
                    goToSlide(0);
                    break;
                case 'End':
                    e.preventDefault();
                    goToSlide(totalSlides - 1);
                    break;
            }
        }
    });

    // Soporte táctil (Touch events para tablets)
    let touchStartY = 0;
    let touchStartX = 0;
    window.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
        touchStartX = e.touches[0].clientX;
    }, { passive: true });

    window.addEventListener('touchend', (e) => {
        if (window.innerWidth > 1024) {
            const touchEndY = e.changedTouches[0].clientY;
            const touchEndX = e.changedTouches[0].clientX;
            const deltaY = touchStartY - touchEndY;
            const deltaX = touchStartX - touchEndX;

            // Detectar deslizamiento vertical u horizontal significativo
            if (Math.abs(deltaY) > 50) {
                if (deltaY > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            } else if (Math.abs(deltaX) > 50) {
                if (deltaX > 0) {
                    nextSlide();
                } else {
                    prevSlide();
                }
            }
        }
    }, { passive: true });

    // Botones internos de slides
    nextButtons.forEach(btn => {
        btn.addEventListener('click', nextSlide);
    });

    restartButtons.forEach(btn => {
        btn.addEventListener('click', () => goToSlide(0));
    });


    // === MENÚ DE NAVEGACIÓN LATERAL ===

    function toggleMenu() {
        menuToggleBtn.classList.toggle('open');
        slideNavMenu.classList.toggle('open');
    }

    menuToggleBtn.addEventListener('click', toggleMenu);
    closeMenuBtn.addEventListener('click', toggleMenu);

    // Click en ítems del menú
    menuListItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetIndex = parseInt(item.getAttribute('data-target'));
            toggleMenu();
            setTimeout(() => {
                goToSlide(targetIndex);
            }, 300);
        });
    });


    // === CONTROLADOR DE ANIMACIONES ESPECÍFICAS DE SLIDES ===

    function handleSlideSpecificAnimations(slideIndex) {
        
        // Slide 02: Quién es ISR - Animaciones de iconos
        if (slideIndex === 1) {
            gsap.fromTo('.service-box', 
                { opacity: 0, y: 20 }, 
                { opacity: 1, y: 0, duration: 0.5, stagger: 0.05, ease: 'power2.out', delay: 0.3 }
            );
        }

        // Slide 03: ¿Por qué un operador local? - Relanzar trazado SVG y pulso
        if (slideIndex === 2) {
            const fiberPath = document.getElementById('fiberPath');
            if (fiberPath) {
                // Forzar reinicio de animación
                fiberPath.style.animation = 'none';
                fiberPath.offsetHeight; /* trigger reflow */
                fiberPath.style.animation = 'drawPath 4s infinite linear';
            }
            
            // Animación de aparición de nodos y etiquetas en el mapa
            gsap.fromTo('.map-node', 
                { scale: 0, opacity: 0 }, 
                { scale: 1, opacity: 1, duration: 0.6, stagger: 0.2, ease: 'back.out(1.7)', delay: 0.4 }
            );
            gsap.fromTo('.map-distance-badge',
                { opacity: 0, y: 10 },
                { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out', delay: 1 }
            );
        }

        // Slide 04: Nuestra Red - Animación secuencial de pasos
        if (slideIndex === 3) {
            gsap.fromTo('.network-step',
                { scale: 0.9, opacity: 0, y: 30 },
                { scale: 1, opacity: 1, y: 0, duration: 0.6, stagger: 0.2, ease: 'power3.out', delay: 0.2 }
            );
            gsap.fromTo('.dest-step',
                { opacity: 0, x: 30 },
                { opacity: 1, x: 0, duration: 0.4, stagger: 0.15, ease: 'power2.out', delay: 0.8 }
            );
            gsap.fromTo('.network-highlight-box',
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', delay: 1.2 }
            );
        }

        // Slide 06: Beneficios Vecinos - Medidor de velocidad interactivo
        if (slideIndex === 5) {
            // Inicializar por defecto a 600
            setTimeout(() => {
                triggerSpeedAnimation(600);
            }, 500);
        }

        // Slide 08: Comparativa - Tabla animada por filas
        if (slideIndex === 7) {
            gsap.fromTo('.compare-table tbody tr',
                { opacity: 0, y: 15 },
                { opacity: 1, y: 0, duration: 0.4, stagger: 0.1, ease: 'power2.out', delay: 0.3 }
            );
        }

        // Slide 09: Plan de Despliegue - Animación de línea de tiempo
        if (slideIndex === 8) {
            // Reiniciar línea de tiempo
            const nodes = document.querySelectorAll('.timeline-node');
            const progress = document.getElementById('timelineProgress');
            
            nodes.forEach(n => n.classList.remove('active'));
            progress.style.width = '0%';
            
            // Animar secuencialmente
            let currentStep = 1;
            const animateTimeline = () => {
                if (currentStep > 6 || currentSlideIndex !== 8) return;
                
                const activeNode = document.querySelector(`.timeline-node[data-step="${currentStep}"]`);
                if (activeNode) {
                    activeNode.classList.add('active');
                    
                    // Actualizar barra
                    const targetWidth = ((currentStep - 1) / 5) * 92; // Max width 92% aproximado para la línea interna
                    progress.style.width = `${targetWidth}%`;
                    
                    // Escalar nodo
                    gsap.fromTo(activeNode.querySelector('.node-dot'),
                        { scale: 0.8 },
                        { scale: 1, duration: 0.3, ease: 'back.out(1.5)' }
                    );
                }
                
                currentStep++;
                setTimeout(animateTimeline, 1200); // 1.2 segundos por fase
            };
            
            setTimeout(animateTimeline, 400);
        }
    }


    // === INTERACTIVIDAD DEL MEDIDOR DE VELOCIDAD (SLIDE 06) ===

    const speedButtons = document.querySelectorAll('.btn-speed');
    const speedNeedle = document.getElementById('speedNeedle');
    const speedNumText = document.getElementById('speedNum');
    const speedDescText = document.getElementById('speedDesc');
    let currentSpeedValue = 0;
    let speedCounterInterval = null;

    function triggerSpeedAnimation(targetSpeed) {
        // Rotación de aguja según la velocidad
        let rotationDegrees = -120; // por defecto en 0
        let descText = "";
        
        if (targetSpeed === 600) {
            rotationDegrees = -40;
            descText = "Excelente para visualización de streaming en 4K/8K, teletrabajo intensivo de toda la familia y domótica completa del hogar de manera simultánea.";
        } else if (targetSpeed === 1000) {
            rotationDegrees = 20;
            descText = "Capacidad Gigabit pura. Descarga archivos de 10GB en segundos. Gaming profesional con latencia ultrabaja (ping < 3ms) y backups concurrentes.";
        } else if (targetSpeed === 10000) {
            rotationDegrees = 120;
            descText = "Fibra óptica del futuro de 10 Gbps simétricos. Ideal para creadores de contenido, flujos masivos de datos empresariales e inteligencia artificial local.";
        }

        // Animar aguja
        speedNeedle.style.transform = `rotate(${rotationDegrees}deg)`;

        // Animar número contador
        clearInterval(speedCounterInterval);
        const duration = 1000; // 1 segundo
        const frameRate = 1000 / 60; // 60 fps
        const totalFrames = duration / frameRate;
        let frame = 0;
        const startSpeed = currentSpeedValue;
        
        speedCounterInterval = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            // Ease out quad formula
            const easeProgress = progress * (2 - progress);
            
            currentSpeedValue = Math.round(startSpeed + (targetSpeed - startSpeed) * easeProgress);
            
            if (targetSpeed === 10000 && currentSpeedValue >= 1000) {
                // Mostrar en formato Gbps si es 10Gbps
                if (currentSpeedValue >= 10000) {
                    speedNumText.innerText = "10";
                    document.querySelector('.speed-unit').innerText = "Gbps Simétricos";
                } else {
                    speedNumText.innerText = (currentSpeedValue / 1000).toFixed(1);
                    document.querySelector('.speed-unit').innerText = "Gbps Simétricos";
                }
            } else {
                speedNumText.innerText = currentSpeedValue;
                document.querySelector('.speed-unit').innerText = "Mbps Simétricos";
            }

            if (frame >= totalFrames) {
                clearInterval(speedCounterInterval);
                currentSpeedValue = targetSpeed;
                if (targetSpeed === 10000) {
                    speedNumText.innerText = "10";
                    document.querySelector('.speed-unit').innerText = "Gbps Simétricos";
                } else {
                    speedNumText.innerText = targetSpeed;
                    document.querySelector('.speed-unit').innerText = "Mbps Simétricos";
                }
            }
        }, frameRate);

        speedDescText.innerText = descText;
    }

    speedButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            speedButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const speed = parseInt(btn.getAttribute('data-speed'));
            triggerSpeedAnimation(speed);
        });
    });


    // === GESTIÓN DE LA LÍNEA DE TIEMPO INTERACTIVA (SLIDE 09) ===

    const timelineNodes = document.querySelectorAll('.timeline-node');
    timelineNodes.forEach(node => {
        node.addEventListener('click', () => {
            // Cancelar el auto-play y permitir selección manual
            const clickedStep = parseInt(node.getAttribute('data-step'));
            const progress = document.getElementById('timelineProgress');
            
            timelineNodes.forEach(n => {
                const step = parseInt(n.getAttribute('data-step'));
                if (step <= clickedStep) {
                    n.classList.add('active');
                } else {
                    n.classList.remove('active');
                }
            });
            
            const targetWidth = ((clickedStep - 1) / 5) * 92;
            progress.style.width = `${targetWidth}%`;
        });
    });

});

// === MODAL DE CONTACTO ===

function openContactModal() {
    const modal = document.getElementById('contactModal');
    modal.classList.add('open');
}

function closeContactModal() {
    const modal = document.getElementById('contactModal');
    modal.classList.remove('open');
    // Resetear formulario y mensajes
    document.getElementById('contactForm').reset();
    document.getElementById('contactForm').style.display = 'block';
    document.getElementById('formSuccess').style.display = 'none';
}

function handleFormSubmit(event) {
    event.preventDefault();
    
    // Simular envío e interacción premium
    const form = document.getElementById('contactForm');
    const successMsg = document.getElementById('formSuccess');
    
    form.style.display = 'none';
    successMsg.style.display = 'flex';
    
    // Cerrar el modal automáticamente después de 3 segundos
    setTimeout(() => {
        closeContactModal();
    }, 3500);
}
