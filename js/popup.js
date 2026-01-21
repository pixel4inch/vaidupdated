function openProjectModal(project) {
    document.getElementById('projectModalLabel').textContent = project.title;

    const carouselInner = document.getElementById('carouselImages');
    carouselInner.innerHTML = '';

    project.gallery.forEach((image, index) => {
        const item = document.createElement('div');
        item.className = `carousel-item ${index === 0 ? 'active' : ''}`;
        item.innerHTML = `
                <img src="${image}" class="d-block w-100"
                     alt="${project.title} - Image ${index + 1}" loading="lazy">
            `;
        carouselInner.appendChild(item);
    });

    const projectCarousel = document.getElementById('projectCarousel');

    // Disable looping
    projectCarousel.setAttribute("data-bs-wrap", "false");

    // Destroy existing carousel instance if exists
    const existingInstance = bootstrap.Carousel.getInstance(projectCarousel);
    if (existingInstance) {
        existingInstance.dispose();
    }

    // ⭐ CUSTOM TIME INTERVAL + NO LOOP ⭐
    new bootstrap.Carousel(projectCarousel, {
        interval: 4000,  // ← change this number for custom time (ms)
        wrap: false,
        ride: "carousel"
    });

    // Open modal
    const modal = new bootstrap.Modal(document.getElementById('projectModal'));
    modal.show();
}