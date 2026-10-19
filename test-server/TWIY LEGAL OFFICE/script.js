const header = document.querySelector('.site-header');
const menuButton = document.querySelector('.menu-button');
const globalNav = document.getElementById('global-nav');

function setMenuOpen(open) {
  header.classList.toggle('nav-open', open);
  globalNav.hidden = !open;
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.setAttribute('aria-label', open ? 'メニューを閉じる' : 'メニューを開く');
}
setMenuOpen(false);

menuButton.addEventListener('click', () => {
  setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true');
});

document.querySelectorAll('#global-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    setMenuOpen(false);
  });
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && header.classList.contains('nav-open')) {
    setMenuOpen(false);
    menuButton.focus();
  }
});

for (const eventName of ['click', 'focusin']) {
  document.addEventListener(eventName, event => {
    if (!menuButton.contains(event.target) && !globalNav.contains(event.target)) setMenuOpen(false);
  });
}
menuButton.addEventListener('keydown', event => {
  if (event.key !== 'ArrowDown') return;
  event.preventDefault();
  setMenuOpen(true);
  globalNav.querySelector('a')?.focus();
});
matchMedia('(min-width: 840px)').addEventListener('change', () => setMenuOpen(false));

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));
