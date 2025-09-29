// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all post-it notes and sections
    const animateElements = document.querySelectorAll('.post-it, .section-title, .kata-card, .team-card, .product-card');
    animateElements.forEach(el => observer.observe(el));

    // Add staggered animation delay
    const postItNotes = document.querySelectorAll('.post-it');
    postItNotes.forEach((note, index) => {
        note.style.animationDelay = `${index * 0.1}s`;
    });

    // Smooth scroll for internal links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
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

    // Add floating animation to post-its
    function addFloatingAnimation() {
        const postIts = document.querySelectorAll('.post-it');
        postIts.forEach((postIt, index) => {
            // Random float animation
            const delay = Math.random() * 2;
            const duration = 3 + Math.random() * 2;
            
            postIt.style.setProperty('--float-delay', `${delay}s`);
            postIt.style.setProperty('--float-duration', `${duration}s`);
            postIt.classList.add('floating');
        });
    }

    // Add CSS for floating animation - no rotation
    const floatingStyle = document.createElement('style');
    floatingStyle.textContent = `
        .floating {
            animation: float var(--float-duration, 4s) ease-in-out infinite var(--float-delay, 0s);
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
    `;
    document.head.appendChild(floatingStyle);

    // Apply floating animation
    addFloatingAnimation();

    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }

        // Update stars position
        const stars = document.querySelectorAll('.stars, .stars2, .stars3');
        stars.forEach((star, index) => {
            const speed = 0.1 + (index * 0.05);
            star.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });

    // Add hover sound effect simulation (visual feedback)
    const interactiveElements = document.querySelectorAll('.post-it, .kata-link, .leader-badge, .member');
    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = this.style.transform.replace(/scale\([^)]*\)/, '') + ' scale(1.02)';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.transform = this.style.transform.replace(/scale\([^)]*\)/, '');
        });
    });

    // Add click ripple effect
    function createRipple(event) {
        const button = event.currentTarget;
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${event.clientX - button.offsetLeft - radius}px`;
        circle.style.top = `${event.clientY - button.offsetTop - radius}px`;
        circle.classList.add('ripple');

        const ripple = button.getElementsByClassName('ripple')[0];
        if (ripple) {
            ripple.remove();
        }

        button.appendChild(circle);
    }

    // Add ripple CSS
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .post-it {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: ripple-animation 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);

    // Apply ripple effect to post-its
    const clickablePostIts = document.querySelectorAll('.post-it');
    clickablePostIts.forEach(postIt => {
        postIt.addEventListener('click', createRipple);
    });

    // Add typing effect to hero title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Apply typing effect (commented out to preserve original title)
    // const heroTitle = document.querySelector('.hero-title');
    // if (heroTitle) {
    //     const originalText = heroTitle.textContent;
    //     typeWriter(heroTitle, originalText, 50);
    // }

    // Add dynamic counter animation for teams
    function animateCounters() {
        const teamCards = document.querySelectorAll('.team-card');
        teamCards.forEach((card, index) => {
            const teamNumber = card.querySelector('h3');
            if (teamNumber) {
                teamNumber.style.animationDelay = `${index * 0.2}s`;
                teamNumber.classList.add('counter-animation');
            }
        });
    }

    // Add counter animation CSS
    const counterStyle = document.createElement('style');
    counterStyle.textContent = `
        .counter-animation {
            animation: countUp 1s ease-out forwards;
        }
        
        @keyframes countUp {
            from {
                opacity: 0;
                transform: translateY(20px) scale(0.5);
            }
            to {
                opacity: 1;
                transform: translateY(0) scale(1);
            }
        }
    `;
    document.head.appendChild(counterStyle);

    animateCounters();

    // Remove rotations - keep cards straight
    function removeRotations() {
        const cards = document.querySelectorAll('.post-it, .kata-card, .team-card, .product-card');
        cards.forEach(card => {
            card.style.setProperty('--initial-rotation', '0deg');
            card.style.transform = 'none';
        });
    }

    removeRotations();

    // Add scroll progress indicator
    function createScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 4px;
            background: linear-gradient(90deg, #ffd700, #ff6b6b, #4ecdc4);
            z-index: 1000;
            transition: width 0.3s ease;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
            const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const scrolled = (winScroll / height) * 100;
            progressBar.style.width = scrolled + '%';
        });
    }

    createScrollProgress();

    // Add easter egg: Konami code for special effect
    let konamiCode = [];
    const konamiSequence = [
        'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
        'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
        'KeyB', 'KeyA'
    ];

    document.addEventListener('keydown', function(e) {
        konamiCode.push(e.code);
        if (konamiCode.length > konamiSequence.length) {
            konamiCode.shift();
        }
        
        if (konamiCode.join('') === konamiSequence.join('')) {
            activateEasterEgg();
            konamiCode = [];
        }
    });

    function activateEasterEgg() {
        // Add rainbow effect to all post-its
        const postIts = document.querySelectorAll('.post-it');
        postIts.forEach((postIt, index) => {
            setTimeout(() => {
                postIt.style.animation = 'rainbow 2s infinite';
            }, index * 100);
        });

        // Add rainbow animation CSS
        const rainbowStyle = document.createElement('style');
        rainbowStyle.textContent = `
            @keyframes rainbow {
                0% { background: linear-gradient(135deg, #ff6b6b, #feca57); }
                16% { background: linear-gradient(135deg, #feca57, #ff9ff3); }
                32% { background: linear-gradient(135deg, #ff9ff3, #54a0ff); }
                48% { background: linear-gradient(135deg, #54a0ff, #5f27cd); }
                64% { background: linear-gradient(135deg, #5f27cd, #00d2d3); }
                80% { background: linear-gradient(135deg, #00d2d3, #ff9f43); }
                100% { background: linear-gradient(135deg, #ff9f43, #ff6b6b); }
            }
        `;
        document.head.appendChild(rainbowStyle);

        // Show congratulations message
        const message = document.createElement('div');
        message.innerHTML = '🎉 ¡Has desbloqueado el modo arcoíris! 🌈';
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0,0,0,0.8);
            color: white;
            padding: 2rem;
            border-radius: 10px;
            font-size: 1.5rem;
            z-index: 10000;
            animation: fadeInOut 3s ease-in-out forwards;
        `;
        
        const fadeInOutStyle = document.createElement('style');
        fadeInOutStyle.textContent = `
            @keyframes fadeInOut {
                0% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
                20% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                80% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
                100% { opacity: 0; transform: translate(-50%, -50%) scale(0.5); }
            }
        `;
        document.head.appendChild(fadeInOutStyle);
        
        document.body.appendChild(message);
        
        setTimeout(() => {
            document.body.removeChild(message);
        }, 3000);
    }

    // Add loading animation for external links
    const externalLinks = document.querySelectorAll('a[target="_blank"]');
    externalLinks.forEach(link => {
        link.addEventListener('click', function() {
            this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Cargando...';
            setTimeout(() => {
                this.innerHTML = '<i class="fas fa-external-link-alt"></i> Ver descripción';
            }, 2000);
        });
    });

    console.log('🚀 Bootcamp Cosmos - ¡Sistema iniciado correctamente!');
    console.log('💡 Tip: Prueba el código Konami para una sorpresa especial...');
});