document.addEventListener('DOMContentLoaded', () => {
    const dropdownIcon = document.getElementById('dropdown-menu');
    const dropdownMenu = document.getElementById('dropdown-content');

    function toggleDropdown() {
        const isExpanded = dropdownIcon.getAttribute('aria-expanded') === 'true';
        dropdownIcon.setAttribute('aria-expanded', !isExpanded);
        dropdownMenu.classList.toggle('show');
        dropdownIcon.querySelector('svg').style.transform = dropdownMenu.classList.contains('show')
            ? 'rotate(0deg)'
            : 'rotate(-90deg)';
    }

    dropdownIcon.addEventListener('click', (event) => {
        event.stopPropagation();
        toggleDropdown();
    });

    dropdownIcon.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggleDropdown();
        }
    });

    document.addEventListener('click', () => {
        if (dropdownMenu.classList.contains('show')) {
            dropdownMenu.classList.remove('show');
            dropdownIcon.setAttribute('aria-expanded', 'false');
            dropdownIcon.querySelector('svg').style.transform = 'rotate(-90deg)';
        }
    });

    dropdownMenu.addEventListener('click', (event) => {
        event.stopPropagation();
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && dropdownMenu.classList.contains('show')) {
            dropdownMenu.classList.remove('show');
            dropdownIcon.setAttribute('aria-expanded', 'false');
            dropdownIcon.querySelector('svg').style.transform = 'rotate(-90deg)';
        }
    });
});
