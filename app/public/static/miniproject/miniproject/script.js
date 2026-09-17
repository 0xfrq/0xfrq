const nav = document.querySelector('#site-nav');
const announcement = document.querySelector('#announcement');
const announcementClose = document.querySelector('#announcement-close');
const menuToggle = document.querySelector('#menu-toggle');
const navLinks = document.querySelector('#primary-navigation');

let previousScroll = window.scrollY;
window.addEventListener('scroll', () => {
  const currentScroll = window.scrollY;
  if (!nav.classList.contains('is-dismissed')) {
    if (currentScroll > 48 && currentScroll > previousScroll) nav.classList.add('is-compact');
    if (currentScroll < previousScroll || currentScroll <= 48) nav.classList.remove('is-compact');
  }
  previousScroll = currentScroll;
}, { passive: true });

announcementClose.addEventListener('click', () => {
  nav.classList.remove('is-compact');
  nav.classList.add('is-dismissed');
  document.documentElement.style.setProperty('--announcement-h', '0px');
  announcement.setAttribute('aria-hidden', 'true');
});

menuToggle.addEventListener('click', () => {
  const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isOpen));
  navLinks.classList.toggle('is-open', !isOpen);
});

navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    navLinks.classList.remove('is-open');
  });
});

const track = document.querySelector('#carousel-track');
const slides = [...document.querySelectorAll('.activity-card')];
const dots = [...document.querySelectorAll('.carousel-dot')];
const carouselCount = document.querySelector('#carousel-count');
const previousButton = document.querySelector('#carousel-prev');
const nextButton = document.querySelector('#carousel-next');
let activeSlide = 0;

function showSlide(index) {
  activeSlide = (index + slides.length) % slides.length;
  track.style.transform = `translateX(-${activeSlide * 100}%)`;
  slides.forEach((slide, slideIndex) => slide.classList.toggle('is-active', slideIndex === activeSlide));
  dots.forEach((dot, dotIndex) => {
    const isActive = dotIndex === activeSlide;
    dot.classList.toggle('is-active', isActive);
    dot.setAttribute('aria-current', isActive ? 'true' : 'false');
  });
  carouselCount.textContent = `${String(activeSlide + 1).padStart(2, '0')} / ${String(slides.length).padStart(2, '0')}`;
}

previousButton.addEventListener('click', () => showSlide(activeSlide - 1));
nextButton.addEventListener('click', () => showSlide(activeSlide + 1));
dots.forEach((dot, index) => dot.addEventListener('click', () => showSlide(index)));
document.querySelector('#activity-carousel').addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') showSlide(activeSlide - 1);
  if (event.key === 'ArrowRight') showSlide(activeSlide + 1);
});

const filterButtons = [...document.querySelectorAll('.filter-button')];
const blogCards = [...document.querySelectorAll('.blog-card')];
const filterEmpty = document.querySelector('#filter-empty');

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    const filter = button.dataset.filter;
    filterButtons.forEach((item) => {
      const selected = item === button;
      item.classList.toggle('is-active', selected);
      item.setAttribute('aria-pressed', String(selected));
    });
    let visibleCount = 0;
    blogCards.forEach((card) => {
      const visible = filter === 'semua' || card.dataset.category === filter;
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });
    filterEmpty.hidden = visibleCount > 0;
  });
});

const form = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');
const submitButton = document.querySelector('#form-submit');
const fields = [...form.querySelectorAll('input, textarea')];

function setFieldMessage(field, message = '') {
  const wrapper = field.closest('.form-field');
  const messageNode = wrapper.querySelector(`[data-for="${field.name}"]`);
  wrapper.classList.toggle('has-error', Boolean(message));
  messageNode.textContent = message;
}

function validateField(field) {
  const value = field.value.trim();
  if (!value) {
    setFieldMessage(field, `${field.labels[0].textContent} perlu diisi.`);
    return false;
  }
  if (field.type === 'email' && !field.validity.valid) {
    setFieldMessage(field, 'Gunakan alamat email yang masih aktif.');
    return false;
  }
  setFieldMessage(field);
  return true;
}

fields.forEach((field) => field.addEventListener('blur', () => validateField(field)));

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const isValid = fields.map(validateField).every(Boolean);
  formStatus.classList.remove('is-error');
  if (!isValid) {
    formStatus.classList.add('is-error');
    formStatus.textContent = 'Periksa kembali kolom yang ditandai.';
    fields.find((field) => field.closest('.form-field').classList.contains('has-error'))?.focus();
    return;
  }

  submitButton.classList.add('is-loading');
  submitButton.setAttribute('aria-busy', 'true');
  formStatus.textContent = '';

  window.setTimeout(() => {
    submitButton.classList.remove('is-loading');
    submitButton.removeAttribute('aria-busy');
    formStatus.textContent = 'Pesan sudah siap dicatat. Tim sekolah akan menghubungi kamu melalui email.';
    form.reset();
  }, 700);
});
