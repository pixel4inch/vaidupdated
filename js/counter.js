document.addEventListener("DOMContentLoaded", () => {
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower

    const animateCounter = (counterElement) => {
        const valueElement = counterElement.querySelector('.counter-value');
        const circle = counterElement.querySelector('.progress-ring__circle');
        const radius = circle.r.baseVal.value;
        const circumference = radius * 2 * Math.PI;
        const target = +counterElement.querySelector('.progress-circle').getAttribute('data-progress');
        
        // Set up the circle for animation
        circle.style.strokeDasharray = `${circumference} ${circumference}`;
        circle.style.strokeDashoffset = circumference;
        
        let currentCount = 0;
        const increment = target / speed;
        
        const updateCount = () => {
            if (currentCount < target) {
                currentCount += increment;
                const displayValue = Math.ceil(currentCount);
                valueElement.innerText = displayValue;
                
                // Calculate progress for the circle (0 to 1)
                const progress = Math.min(currentCount / target, 1);
                const dashoffset = circumference - (progress * circumference);
                circle.style.strokeDashoffset = dashoffset;
                
                setTimeout(updateCount, 1);
            } else {
                valueElement.innerText = target;
                circle.style.strokeDashoffset = 0; // Complete the circle
            }
        };

        updateCount();
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.5
    });

    counters.forEach(counter => {
        observer.observe(counter);
    });
});
