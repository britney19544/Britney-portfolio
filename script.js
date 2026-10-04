// Lightbox: click or Enter/Space on a frame to view full frame
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const closeBtn = document.getElementById('lightboxClose');

function openLightbox(src, alt){
  lightboxImg.src = src;
  lightboxImg.alt = alt;
  lightbox.classList.add('open');
}
function closeLightbox(){
  lightbox.classList.remove('open');
}

document.querySelectorAll('.frame').forEach(frame => {
  frame.addEventListener('click', () => {
    const full = frame.getAttribute('data-full');
    const alt = frame.querySelector('img').alt;
    openLightbox(full, alt);
  });
  frame.addEventListener('keydown', (e) => {
    if(e.key === 'Enter' || e.key === ' '){
      e.preventDefault();
      frame.click();
    }
  });
});

closeBtn.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if(e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape') closeLightbox();
});


// Typewriter effect
const paragraphs = document.querySelectorAll(".typewriter");

// Store the original text
const typewriterData = [];

paragraphs.forEach((paragraph) => {
  const strong = paragraph.querySelector("strong");

  const text = strong
    ? strong.textContent
    : paragraph.textContent.trim();

  typewriterData.push({
    paragraph,
    strong,
    text
  });
});


// Reserve the final height BEFORE typing
typewriterData.forEach(({ paragraph, strong, text }) => {

  // Temporarily show the complete text
  if (strong) {
    strong.textContent = text;
  } else {
    paragraph.textContent = text;
  }

  // Measure final height
  const finalHeight = paragraph.offsetHeight;

  // Reserve that space
  paragraph.style.minHeight = `${finalHeight}px`;

  // Clear text
  if (strong) {
    strong.textContent = "";
  } else {
    paragraph.textContent = "";
  }
});


// Start typing when About section is reached
const aboutSection = document.querySelector("#about");

const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {

    typewriterData.forEach(({ paragraph, strong, text }, index) => {

      let i = 0;

      function type() {
        if (i < text.length) {

          if (strong) {
            strong.textContent += text[i];
          } else {
            paragraph.textContent += text[i];
          }

          i++;

          setTimeout(type, strong ? 35 : 20);
        }
      }

      setTimeout(type, index * 1000);
    });

    observer.unobserve(aboutSection);
  }
}, {
  threshold: 0.3
});

observer.observe(aboutSection);