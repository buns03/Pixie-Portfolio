// ------------------ SINGLE IMAGE ------------------
document.querySelectorAll('.expandable').forEach(img => {
  img.addEventListener('click', () => {
    const popup = document.getElementById('popup');
    const popupImage = document.getElementById('popupImage');
    popupImage.src = img.src;
    popup.style.display = 'flex';
  });
});

document.getElementById('closePopup').addEventListener('click', () => {
  document.getElementById('popup').style.display = 'none';
});

document.getElementById('popup').addEventListener('click', (e) => {
  if (e.target.id === 'popup') e.currentTarget.style.display = 'none';
});

// ------------------ MULTI-IMAGE GALLERY ------------------
document.querySelectorAll('.gallery-group').forEach(group => {
  group.addEventListener('click', (e) => {
    if (e.target.tagName !== 'IMG') return;

    const galleryPopup = document.getElementById('galleryPopup');
    const galleryContent = document.getElementById('galleryContent');
    galleryContent.innerHTML = '';

    const groupName = group.dataset.group || e.target.dataset.group;;

    let imagesToShow = [];
    if (groupName === 'editing') {
      imagesToShow = [
        'css/assets/edited.jpg',
        'css/assets/unedited.jpg'
      ];
    } else if (groupName === 'uiux') {
      imagesToShow = [
        'css/assets/ui/lf1.png',
        'css/assets/ui/lf2.png',
        'css/assets/ui/lf3.png',
        'css/assets/ui/lf4.png',
        'css/assets/ui/lf5.png',
        'css/assets/ui/lf6.png',
        'css/assets/ui/lf7.png',
        'css/assets/ui/lf8.png',
        'css/assets/ui/lf9.png',
        'css/assets/ui/lf10.png',
        'css/assets/ui/lf11.png',
        'css/assets/ui/lf12.png',
      ];
    } else if (groupName == 'uiux2'){
      imagesToShow = [
        'css/assets/ui/f1.png'
      ];
    }


    let currentIndex = 0;

    const img = document.createElement('img');
    img.src = imagesToShow[currentIndex];
    img.alt = "Gallery Image";
    galleryContent.appendChild(img);

    const navContainer = document.createElement('div');
    navContainer.classList.add('nav-container');

    const prevBtn = document.createElement('button');
    prevBtn.innerText = 'Previous';
    prevBtn.classList.add('nav-btn', 'prev-btn');

    const nextBtn = document.createElement('button');
    nextBtn.innerText = 'Next';
    nextBtn.classList.add('nav-btn', 'next-btn');

    navContainer.appendChild(prevBtn);
    navContainer.appendChild(nextBtn);

    const dotsContainer = document.createElement('div');
    dotsContainer.classList.add('dots-container');

    imagesToShow.forEach((_, index) => {
      const dot = document.createElement('span');
      dot.classList.add('dot');
      if (index === currentIndex) dot.classList.add('active');
      dotsContainer.appendChild(dot);
    });

    galleryContent.appendChild(navContainer);
    galleryContent.appendChild(dotsContainer);

    nextBtn.addEventListener('click', () => {
      if (currentIndex < imagesToShow.length - 1) {
        currentIndex++;
        img.src = imagesToShow[currentIndex];
        updateDots(dotsContainer, currentIndex);
      }
    });

    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        img.src = imagesToShow[currentIndex];
        updateDots(dotsContainer, currentIndex);
      }
    });

    galleryPopup.style.display = 'flex';
  });
});

document.getElementById('closeGallery').addEventListener('click', () => {
  document.getElementById('galleryPopup').style.display = 'none';
});

document.getElementById('galleryPopup').addEventListener('click', (e) => {
  if (e.target.id === 'galleryPopup') {
    e.currentTarget.style.display = 'none';
  }
});

// ------------------ SLIDE-OUT ANIMATION FUNCTION ------------------
  document.querySelectorAll('.nav-right a, .nav-left a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    const destination = this.getAttribute('href');
    const mainContent = document.getElementById('mainContent');

    // Add slide-out animation
    mainContent.classList.add('slide-out');

    // Hide main content after animation completes BEFORE redirect
    setTimeout(() => {
      mainContent.style.display = 'none'; // Hide before redirect to stop flicker
      window.location.href = destination;
    }, 500); // Match animation duration
  });
});

// ------------------ NAVIGATION HANDLER ------------------
document.querySelectorAll('.nav-right li a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const targetUrl = this.getAttribute('href');
    triggerSlideOut(targetUrl);
  });
});

// ------------------ DOTS UPDATE FUNCTION ------------------
function updateDots(dotsContainer, currentIndex) {
  const dots = dotsContainer.querySelectorAll('.dot');
  dots.forEach((dot, index) => {
    dot.classList.remove('active');
    if (index === currentIndex) {
      dot.classList.add('active');
    }
  });
}

// ------------------ HAMBURGER MENU TOGGLE ------------------
document.querySelector('.nav-toggle').addEventListener('click', () => {
  document.querySelector('.nav-right').classList.toggle('show');
});


