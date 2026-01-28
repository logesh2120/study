/**
 * TPS Corporate - Unified Component Loader
 * Loads navbar.html and footer.html dynamically into pages.
 */

document.addEventListener('DOMContentLoaded', function() {
    const navbarPlaceholder = document.getElementById('navbar-placeholder');
    const footerPlaceholder = document.getElementById('footer-placeholder');

    // 1. Load Navigation
    if (navbarPlaceholder) {
        fetch('navbar.html')
            .then(response => {
                if (!response.ok) throw new Error('Navbar failed to load: ' + response.statusText);
                return response.text();
            })
            .then(data => {
                navbarPlaceholder.innerHTML = data;
                // Initialize menu toggle and active state highlighting
                initNavigationLogic(); 
            })
            .catch(error => {
                console.error('Error loading navigation:', error);
                navbarPlaceholder.innerHTML = '<nav class="p-4 bg-red-100 text-red-700 text-center">Navigation Error</nav>';
            });
    }

    // 2. Load Footer
    if (footerPlaceholder) {
        fetch('footer.html')
            .then(response => {
                if (!response.ok) throw new Error('Footer failed to load');
                return response.text();
            })
            .then(data => {
                footerPlaceholder.innerHTML = data;
            })
            .catch(error => console.error('Error loading footer:', error));
    }
});

/**
 * Combined Logic for Menu Toggle and Active Link Highlighting
 */
function initNavigationLogic() {
    const button = document.getElementById('mobile-menu-button');
    const menu = document.getElementById('mobile-menu');
    
    // Determine the current page path
    let path = window.location.pathname.split('/').pop().replace('.html', '');
    if (path === '' || path === 'home') {
        path = 'index'; 
    }

    // --- 1. Mobile Menu Toggle ---
    if (button && menu) {
        button.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });
    }
    
    // --- 2. Active Link Styling (Desktop) ---
    document.querySelectorAll('.nav-link').forEach(link => {
        const linkPage = link.getAttribute('data-page');

        if (linkPage === path) {
            link.classList.remove('text-gray-600', 'hover:text-green-600');
            
            if (linkPage === 'contact') {
                // Style for the "Contact Us" button
                link.classList.add('bg-green-700', 'text-white');
                link.classList.remove('bg-green-600'); 
            } else {
                // Style for standard navigation links
                link.classList.add('text-green-700', 'font-semibold', 'border-b-2', 'border-green-600', 'pb-1');
            }
        } else if (linkPage === 'contact') {
             // Default state for Contact button if not on contact page
             link.classList.add('bg-green-600', 'hover:bg-green-700', 'text-white');
             link.classList.remove('bg-green-700');
        } else {
            // Default state for standard links
            link.classList.add('text-gray-600', 'hover:text-green-600');
            link.classList.remove('text-green-700', 'font-semibold', 'border-b-2', 'border-green-600', 'pb-1');
        }
    });
    
    // --- 3. Active Link Styling (Mobile) ---
    document.querySelectorAll('.nav-link-mobile').forEach(link => {
        const linkPage = link.getAttribute('data-page');
        
        if (linkPage === path) {
            link.classList.add('text-green-700', 'font-semibold', 'border-l-4', 'border-green-600', 'bg-green-50');
            link.classList.remove('text-gray-600', 'hover:bg-gray-50');
        } else {
            link.classList.add('text-gray-600', 'hover:bg-gray-50');
            link.classList.remove('text-green-700', 'font-semibold', 'border-l-4', 'border-green-600', 'bg-green-50');
        }
    });
}