document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    lucide.createIcons();

    // 1. Mobile Menu Navigation Toggle
    const navToggle = document.getElementById('nav-toggle');
    const navLinksContainer = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links a');

    if (navToggle && navLinksContainer) {
        navToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            // Toggle icon between menu and x
            const icon = navToggle.querySelector('i');
            if (navLinksContainer.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            lucide.createIcons();
        });

        // Close mobile menu when a link is clicked
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinksContainer.classList.remove('active');
                const icon = navToggle.querySelector('i');
                icon.setAttribute('data-lucide', 'menu');
                lucide.createIcons();
            });
        });
    }

    // 2. Active Link Highlighting on Scroll
    const sections = document.querySelectorAll('section');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // 3. Email Copy Functionality
    const btnCopy = document.getElementById('btn-copy');
    const copyTooltip = document.getElementById('copy-tooltip');
    const emailText = '33doduythien@gmail.com';

    if (btnCopy && copyTooltip) {
        btnCopy.addEventListener('click', () => {
            navigator.clipboard.writeText(emailText).then(() => {
                // Change tooltip text and icon
                copyTooltip.textContent = 'Copied!';
                const icon = btnCopy.querySelector('i');
                icon.setAttribute('data-lucide', 'check');
                lucide.createIcons();

                // Reset after 2 seconds
                setTimeout(() => {
                    copyTooltip.textContent = 'Copy';
                    icon.setAttribute('data-lucide', 'copy');
                    lucide.createIcons();
                }, 2000);
            }).catch(err => {
                console.error('Could not copy text: ', err);
            });
        });
    }

    // 4. Interactive Canvas Particles Background
    const canvas = document.getElementById('particles-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        const maxParticles = 60;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = Math.random() * 0.4 - 0.2;
                this.speedY = Math.random() * 0.4 - 0.2;
                this.opacity = Math.random() * 0.5 + 0.1;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                // Wrap around edges
                if (this.x > canvas.width) this.x = 0;
                if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                if (this.y < 0) this.y = canvas.height;
            }

            draw() {
                ctx.fillStyle = `rgba(157, 78, 221, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        const initParticles = () => {
            particles = [];
            for (let i = 0; i < maxParticles; i++) {
                particles.push(new Particle());
            }
        };

        initParticles();

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animate);
        };

        animate();
    }
});
