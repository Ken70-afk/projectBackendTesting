document.addEventListener('DOMContentLoaded', () => {
  const images = document.querySelectorAll('.carousel img');
  const captions = document.querySelectorAll('.carousel-caption');
  let currentIndex = 0;

  document.querySelector('.carousel').addEventListener('click', () => {
    images[currentIndex].classList.remove('active');
    captions[currentIndex].classList.remove('active');
    currentIndex = (currentIndex + 1) % images.length;
    images[currentIndex].classList.add('active');
    captions[currentIndex].classList.add('active');
  });

  const tabs = document.querySelectorAll('.tab');
  const contents = document.querySelectorAll('.tab-content');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      contents.forEach(content => content.classList.remove('active'));
      const selected = document.getElementById(tab.getAttribute('data-tab'));
      if (selected) selected.classList.add('active');
    });
  });


 const localVideo = document.getElementById("local-video");
  const playButton = document.getElementById("play-button");

  if (playButton && localVideo) {
    playButton.addEventListener("click", function () {
      // Show native controls
      localVideo.setAttribute("controls", "controls");

      // Start playback
      localVideo.play();

      // Hide custom overlay
      playButton.style.display = "none";
    });

    // Optional: show controls even if user plays via keyboard or programmatically
    localVideo.addEventListener("play", () => {
      localVideo.setAttribute("controls", "controls");
      playButton.style.display = "none";
    });

    // Optional: hide controls again if paused
    localVideo.addEventListener("pause", () => {
      localVideo.removeAttribute("controls");
      playButton.style.display = "flex";
    });
  }
});


function revealOnScroll() {
  const sections = document.querySelectorAll('.engagement-wrapper');
  sections.forEach(section => {
    const top = section.getBoundingClientRect().top;
    const trigger = window.innerHeight * 0.85;

    if (top < trigger) {
      section.classList.add('reveal');
    }
  });
}

window.addEventListener('scroll', revealOnScroll);
window.addEventListener('load', revealOnScroll);