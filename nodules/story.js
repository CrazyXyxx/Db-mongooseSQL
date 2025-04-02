
// JavaScript to animate the image based on scroll
window.addEventListener("scroll", () => {
    const image = document.querySelector('.logo img');
    const scrollPosition = window.scrollY;

    // Apply a transformation to the logo based on the scroll position
    image.style.transform = `rotate(scrollPosition * 0.1deg) scale({1 + scrollPosition * 0.001})`;
});
