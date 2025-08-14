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
});
