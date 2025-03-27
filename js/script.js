const carouselSlide = document.querySelector('.carousel-slide');
const carouselImages = document.querySelectorAll('.carousel-slide img');
const fullscreenOverlay = document.getElementById('fullscreen-overlay');
const fullscreenImg = document.getElementById('fullscreen-img');
const closeBtn = document.querySelector('.close-btn');
const colorSwitch = document.querySelector('#color_mode');

let counter = 1; // Start from the first real image
const slideWidth = carouselSlide.clientWidth;

// Duplicate the first and last images for seamless loop
const firstClone = carouselImages[0].cloneNode(true);
const lastClone = carouselImages[carouselImages.length - 1].cloneNode(true);

carouselSlide.appendChild(firstClone);
carouselSlide.insertBefore(lastClone, carouselImages[0]);

// Update carousel images nodelist after adding clones
const updatedCarouselImages = document.querySelectorAll('.carousel-slide img');

// Adjust the initial position to show the first real image
carouselSlide.style.transform = `translateX(${-slideWidth * counter}px)`;

function moveCarousel() {
    carouselSlide.style.transition = 'transform 0.5s ease-in-out';
    counter++;
    carouselSlide.style.transform = `translateX(${-slideWidth * counter}px)`;
}

// Event listener for transition end to reset position for infinite loop
carouselSlide.addEventListener('transitionend', () => {
    if (counter === updatedCarouselImages.length - 1) {
        // Jump back to the second image (first real image) without animation
        carouselSlide.style.transition = 'none';
        counter = 1;
        carouselSlide.style.transform = `translateX(${-slideWidth * counter}px)`;
    }
});

// Start automatic sliding
const slideInterval = setInterval(moveCarousel, 3000);

// Fullscreen functionality (remains the same)
updatedCarouselImages.forEach(image => {
    image.addEventListener('click', () => {
        fullscreenImg.src = image.src;
        fullscreenOverlay.style.display = 'flex';
    });
});

closeBtn.addEventListener('click', () => {
    fullscreenOverlay.style.display = 'none';
});

// Dark mode toggle (remains the same)
colorSwitch.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
});

// Responsive resize handling (remains the same)
window.addEventListener('resize', () => {
    const slideWidth = carouselSlide.clientWidth;
    carouselSlide.style.transform = `translateX(${-slideWidth * counter}px)`;
});