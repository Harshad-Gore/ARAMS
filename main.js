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

    // Intersection Observer for the cards
    const cards = document.querySelectorAll('.our-services-info-cards');
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    cards.forEach(card => {
        observer.observe(card);
    });

    // Counter animation
    const counters = document.querySelectorAll('.count');
    const speed = 600; // The lower the slower

    const animateCounts = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;

                const increment = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + increment);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target;
                }
            };

            updateCount();
        });
    };

    const observerCount = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounts();
                observerCount.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    observerCount.observe(document.querySelector('.industry-experties-count'));
});