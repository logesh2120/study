document.addEventListener('DOMContentLoaded', function() {
    const navbarPlaceholder = document.getElementById('navbar-placeholder');

    if (navbarPlaceholder) {
        // Fetch the content of the navbar.html file
        fetch('navbar.html')
            .then(response => {
                if (!response.ok) {
                    // Throw error for bad response (404, 500, etc.)
                    throw new Error('Network response was not ok: ' + response.statusText);
                }
                return response.text();
            })
            .then(data => {
                // 1. Insert the HTML content into the placeholder
                navbarPlaceholder.innerHTML = data;

                // 2. CRITICAL STEP: Call the function to set the active state 
                //    AFTER the HTML elements have been added to the DOM.
                setActiveNavLinks(); 
            })
            .catch(error => {
                console.error('Error loading navigation:', error);
                navbarPlaceholder.innerHTML = '<nav class="p-4 bg-red-100 text-red-700">Error loading navigation. Please ensure "navbar.html" exists and you are running a local server.</nav>';
            });
    }
});

// The Active Link Highlighting Logic (You should include this function 
// in your main HTML file or in a separate script file loaded after this one)
function setActiveNavLinks() {
    const button = document.getElementById('mobile-menu-button');
    const menu = document.getElementById('mobile-menu');
    
    // Determine the current page path
    let path = window.location.pathname.split('/').pop().replace('.html', '');
    if (path === '' || path === 'home') {
        path = 'index'; 
    }

    // 1. Mobile Menu Toggle
    if (button && menu) {
        button.addEventListener('click', () => {
            menu.classList.toggle('hidden');
        });
    }
    
    // 2. Active Link Styling (Desktop)
    document.querySelectorAll('.nav-link').forEach(link => {
        const linkPage = link.getAttribute('data-page');

        if (linkPage === path) {
            link.classList.remove('text-gray-600', 'hover:text-green-600');
            
            if (linkPage === 'contact') {
                // SPECIAL CASE: The Contact Us button
                link.classList.add('bg-green-700', 'hover:bg-green-700');
                link.classList.remove('bg-green-600'); 
            } else {
                // STANDARD LINKS
                link.classList.add('text-green-700', 'font-semibold', 'border-b-2', 'border-green-600', 'pb-1');
            }
        } else if (linkPage === 'contact') {
             // Ensure non-active button has correct default and hover
             link.classList.add('bg-green-600', 'hover:bg-green-700');
             link.classList.remove('bg-green-700');
        } else {
            // Ensure non-active standard links revert to default
            link.classList.add('text-gray-600', 'hover:text-green-600');
            link.classList.remove('text-green-700', 'font-semibold', 'border-b-2', 'border-green-600', 'pb-1');
        }
    });
    
    // 3. Active Link Styling (Mobile)
    document.querySelectorAll('.nav-link-mobile').forEach(link => {
        const linkPage = link.getAttribute('data-page');
        
        if (linkPage === path) {
            // Apply active styling
            link.classList.add('text-green-700', 'font-semibold', 'border-l-4', 'border-green-600', 'bg-green-50');
            link.classList.remove('text-gray-600', 'hover:bg-gray-50');
        } else {
            // Ensure non-active mobile links have correct default style
            link.classList.add('text-gray-600', 'hover:bg-gray-50');
            link.classList.remove('text-green-700', 'font-semibold', 'border-l-4', 'border-green-600', 'bg-green-50');
        }
    });
}