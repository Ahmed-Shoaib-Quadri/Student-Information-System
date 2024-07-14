document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const windowHeight = window.innerHeight;
            const scrollTop = window.pageYOffset;

            if (scrollTop > sectionTop - windowHeight + sectionHeight / 2) {
                section.style.opacity = 1;
                section.style.transform = 'translateY(0)';
            }
        });
    });
});
