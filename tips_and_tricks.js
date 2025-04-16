// Anchor Positioning Example
document.addEventListener('DOMContentLoaded', () => {
    // Anchor Positioning Example
    const anchorTL = document.getElementById('anchorTL');
    const anchorBR = document.getElementById('anchorBR');
    const infobox = document.querySelector('.infobox');
    
    // Info display elements
    const tlPointDisplay = document.getElementById('tlPoint');
    const brPointDisplay = document.getElementById('brPoint');
    const widthDisplay = document.getElementById('rectWidth');
    const heightDisplay = document.getElementById('rectHeight');
    
    function updateInfoDisplay() {
        if (!anchorTL || !anchorBR || !infobox) return;
        
        const tlRect = anchorTL.getBoundingClientRect();
        const brRect = anchorBR.getBoundingClientRect();
        const boxRect = infobox.getBoundingClientRect();
        
        // Update point positions
        tlPointDisplay.textContent = `(${Math.round(tlRect.left)}px, ${Math.round(tlRect.top)}px)`;
        brPointDisplay.textContent = `(${Math.round(brRect.left)}px, ${Math.round(brRect.top)}px)`;
        
        // Update dimensions
        widthDisplay.textContent = `${Math.round(boxRect.width)}px`;
        heightDisplay.textContent = `${Math.round(boxRect.height)}px`;
    }
    
    function setupDrag(element) {
        if (!element) return;
        
        let isDragging = false;
        let startX, startY;
        
        element.addEventListener('mousedown', (e) => {
            isDragging = true;
            startX = e.clientX - element.offsetLeft;
            startY = e.clientY - element.offsetTop;
            element.style.cursor = 'grabbing';
        });
        
        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            const newX = e.clientX - startX;
            const newY = e.clientY - startY;
            
            // Keep the element within the demo container
            const container = element.parentElement;
            const maxX = container.offsetWidth - element.offsetWidth;
            const maxY = container.offsetHeight - element.offsetHeight;
            
            element.style.left = `${Math.min(Math.max(0, newX), maxX)}px`;
            element.style.top = `${Math.min(Math.max(0, newY), maxY)}px`;
            
            // Update the info display
            updateInfoDisplay();
        });
        
        document.addEventListener('mouseup', () => {
            isDragging = false;
            element.style.cursor = 'move';
        });
    }
    
    if (anchorTL && anchorBR) {
        setupDrag(anchorTL);
        setupDrag(anchorBR);
        
        // Initial update of the info display
        updateInfoDisplay();
    }

    // Floating Index Active Section Highlight
    const sections = document.querySelectorAll('section');
    const indexLinks = document.querySelectorAll('.floating-index a');
    const floatingIndex = document.querySelector('.floating-index');
    const burgerButton = document.querySelector('.burger-button');

    // Ensure the floating index is properly initialized on page load
    if (floatingIndex) {
        // Force a reflow to ensure proper initial styles
        floatingIndex.classList.remove('open');
        
        // On mobile, start with menu closed
        if (window.innerWidth <= 1200) {
            floatingIndex.classList.remove('open');
        }
    }

    // Burger menu toggle
    if (burgerButton && floatingIndex) {
        burgerButton.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation(); // Prevent document click from immediately closing
            floatingIndex.classList.toggle('open');
        });
    } else {
        console.warn('Burger button or floating index not found');
    }

    // Close menu when clicking on links
    indexLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 1200) {
                floatingIndex.classList.remove('open');
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (floatingIndex && !floatingIndex.contains(e.target) && floatingIndex.classList.contains('open')) {
            floatingIndex.classList.remove('open');
        }
    });

    // Add a check for screen resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 1200 && floatingIndex) {
            floatingIndex.classList.remove('open');
        }
    });

    function updateActiveSection() {
        const scrollPosition = window.scrollY + 100; // Add some offset

        sections.forEach((section, index) => {
            const sectionTop = section.offsetTop;
            const sectionBottom = sectionTop + section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
                indexLinks.forEach(link => link.classList.remove('active'));
                indexLinks[index].classList.add('active');
            }
        });
    }

    // Update on scroll
    window.addEventListener('scroll', updateActiveSection);
    
    // Initial update
    updateActiveSection();
}); 