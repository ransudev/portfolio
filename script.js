// Wait for the DOM to be fully loaded before running the script
document.addEventListener('DOMContentLoaded', () => {

    // Initialize Lucide icons for elements that still use them
    lucide.createIcons();

    // Get references to the menu button, sidebar, and overlay
    const menuButton = document.getElementById('menu-button');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const body = document.body;
    
    // Set initial state on page load
    if (window.innerWidth >= 768) {
        body.classList.add('sidebar-collapsed');
    } else {
        menuButton.classList.remove('active');
    }

    // Function to toggle the sidebar on mobile
    const toggleMobileSidebar = () => {
        sidebar.classList.toggle('mobile-active');
        overlay.classList.toggle('mobile-active');
        menuButton.classList.toggle('active');
    };

    // Function to toggle the sidebar on desktop
    const toggleDesktopSidebar = () => {
        body.classList.toggle('sidebar-collapsed');
        menuButton.classList.toggle('active');
    };

    // Check if all elements exist to avoid errors
    if (menuButton && sidebar && overlay) {
        // Add a click event listener to the menu button
        menuButton.addEventListener('click', (e) => {
            e.stopPropagation();
            if (window.innerWidth < 768) {
                toggleMobileSidebar();
            } else {
                toggleDesktopSidebar();
            }
        });

        // Add a click event listener to the overlay to close the mobile sidebar
        overlay.addEventListener('click', toggleMobileSidebar);
    }

    // Get all the links within the sidebar
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    
    // Add a click event listener to each sidebar link
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Hide the sidebar when a link is clicked (on mobile)
            if (window.innerWidth < 768 && sidebar.classList.contains('mobile-active')) {
                toggleMobileSidebar();
            }
        });
    });

    // Cyberpunk Mouse Follower Effect
    const mouseGlow = document.querySelector('.mouse-glow');
    if (mouseGlow) {
        window.addEventListener('mousemove', (e) => {
            mouseGlow.style.left = e.pageX + 'px';
            mouseGlow.style.top = e.pageY + 'px';
        });
    }

    // Background Particle Effect
    const canvas = document.getElementById('particle-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particles = [];
        const particleCount = 100;

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 1.5 + 0.5;
                this.speedY = Math.random() * 1 + 0.5;
            }
            update() {
                this.y += this.speedY;
                if (this.y > canvas.height) {
                    this.y = 0 - this.size;
                    this.x = Math.random() * canvas.width;
                }
            }
            draw() {
                ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        function initParticles() {
            for (let i = 0; i < particleCount; i++) {
                particles.push(new Particle());
            }
        }
        initParticles();

        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
                particles[i].draw();
            }
            requestAnimationFrame(animateParticles);
        }
        animateParticles();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            particles = [];
            initParticles();
        });
    }

    // 3D Avatar Hover Effect
    const avatarContainer = document.getElementById('avatar-container');
    if (avatarContainer) {
        const avatarImg = avatarContainer.querySelector('img');
        const tiltIntensity = 15;

        avatarContainer.addEventListener('mousemove', (e) => {
            const rect = avatarContainer.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const rotateY = tiltIntensity * ((x - rect.width / 2) / (rect.width / 2));
            const rotateX = -tiltIntensity * ((y - rect.height / 2) / (rect.height / 2));

            avatarImg.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.1)`;
            avatarImg.style.boxShadow = `${-rotateY}px ${rotateX}px 30px rgba(255, 255, 255, 0.2)`;
        });

        avatarContainer.addEventListener('mouseleave', () => {
            avatarImg.style.transform = 'rotateX(0) rotateY(0) scale(1)';
            avatarImg.style.boxShadow = 'none';
        });
    }
});
