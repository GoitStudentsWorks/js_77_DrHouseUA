const mobileMenu = document.getElementById('mobileMenu');
const menuBtn = document.querySelector('.mobile-menu-btn');
const closeBtn = document.getElementById('menuCloseBtn');

menuBtn.addEventListener('click', () => {
  mobileMenu.classList.add('active');
});

closeBtn.addEventListener('click', () => {
  mobileMenu.classList.remove('active');
});

const links = document.querySelectorAll('.nav-link');

links.forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();

    links.forEach(l => l.classList.remove('active'));

    this.classList.add('active');
  });
});

// Button get friend
document.querySelectorAll('.mobile-nav-btn, .header-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const animalsSection = document.querySelector('#animals');
    if (animalsSection) {
      animalsSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
    mobileMenu.classList.remove('active');
  });
});
