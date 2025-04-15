document.addEventListener('DOMContentLoaded', () => {
    const galleryImages = document.querySelectorAll('.img-grid img'); // Target the images inside .img-grid
    const overlay = document.getElementById('overlay');
    const enlargedImg = document.getElementById('enlarged-img');
    const closeBtn = document.querySelector('.close-btn');
    const navbar = document.querySelector('nav'); // Select the navbar

    // Add click event to each image
    galleryImages.forEach((img) => {
        img.addEventListener('click', () => {
            enlargedImg.src = img.src;
            overlay.classList.add('active');
            navbar.classList.add('navbar-sticky'); // Add sticky class
        });
    });

    // Close the overlay when the close button is clicked
    closeBtn.addEventListener('click', () => {
        overlay.classList.remove('active'); // Hide the overlay
        navbar.classList.remove('navbar-sticky'); // Remove sticky class
    });

    // Close the overlay when clicking outside the image
    overlay.addEventListener('click', (noob) => {
        if (noob.target === overlay) {
            overlay.classList.remove('active'); // Hide the overlay
            navbar.classList.remove('navbar-sticky'); // Remove sticky class
        }
    });
});