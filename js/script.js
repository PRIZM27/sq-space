// Selectors
newFeature();

const topNav = document.querySelector('.nav-top');
const stickyNav = document.querySelector('.sticky__nav');
const offer = document.querySelector('.section__offerings');
const footer = document.querySelector('.footer');
// Products pop-up menu selectors
const dropDown = document.querySelector('.drop-down');
// Container for: products, templates, and resources links in top nav
const revealPopupsLinkBox = document.querySelector('.nav-top-link-box');
const popupNavShell = document.querySelector('.popup__nav__shell');
const popupNavContentBox = document.querySelector('.popup__nav__content-box');

// Resources Menu selectors
const resourcesMenu = document.querySelector('.resources__menu');
const resourcesMenuShell = document.querySelector('.resources__menu__shell');

//  Spread nodeList into a proper array
// const [...showPopupNav] = document.querySelectorAll(".show-popup-nav");
const showPopupNav = document.querySelectorAll('.show-popup-nav');

// console.log(showPopupNav);

// Pop-Up Navigation (Showing hidden menus when hovering over links in top nav)

////////////////////
// Functions
////////////////////

// Popup navs
const toggleProductsMenu = function () {
  dropDown.classList.toggle('popup__trim');
  dropDown.classList.toggle('popup__trim__expand');
  popupNavShell.classList.toggle('show__resources');
};

const toggleResourcesMenu = function () {
  dropDown.classList.toggle('popup__trim');
  dropDown.classList.toggle('popup__trim__expand');
  // resourcesMenu.classList.toggle('popup__trim__expand');
  // resourcesMenu.classList.toggle('resources__dropdown');
  resourcesMenuShell.classList.toggle('show__resources');
  // resourcesMenuShell.classList.toggle('popup__nav--hidePop');
};

////////////////////
//  Listeners
////////////////////

revealPopupsLinkBox.addEventListener(
  'mouseenter',
  function (e) {
    e.target.classList.contains('show-popup-nav') ? toggleProductsMenu() : '';

    e.target.classList.contains('show-resources-nav')
      ? toggleResourcesMenu()
      : '';
  },
  true
);

revealPopupsLinkBox.addEventListener(
  'mouseleave',
  function (e) {
    e.target.classList.contains('show-popup-nav') ? toggleProductsMenu() : '';

    e.target.classList.contains('show-resources-nav')
      ? toggleResourcesMenu()
      : '';
  },
  true
);

// Image slider component
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');
  const currentSlideCounterFirstVal = document.getElementById(
    'slider__counter__text--1'
  );
  const currentSlideCounterSecondVal = document.getElementById(
    'slider__counter__text--2'
  );
  // console.log(slides);

  let curSlide = 0;
  const maxSlide = slides.length;
  const slidesLengthText = (currentSlideCounterSecondVal.innerText = `${String(
    maxSlide
  ).padStart(2, '0')}`);

  // Slide positioning logic
  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide logic (right)
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    slideCountText(curSlide);
  };

  // Previous slide logic (left)
  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    slideCountText(curSlide);
  };

  // This function updates the value displayed representing the current slide in slider
  const slideCountText = function (curSlide) {
    currentSlideCounterFirstVal.innerText = `${String(curSlide + 1).padStart(
      2,
      '0'
    )}`;
    // console.log(curSlide);
  };

  // Slider button event listeners
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  const init = function () {
    goToSlide(0);
    slideCountText(curSlide);
    slidesLengthText;
  };

  init();
};

slider();

// Intersection Observer
const heroParent = document.querySelector('.hero__parent');

const stickyNavFunc = function (entries) {
  const [entry] = entries;
  // console.log(entry, 'This is the entry destructured');
  // console.log(entries);

  if (entry.isIntersecting) {
    topNav.classList.add('sticky');
    // console.log('IS INTERSECTING');
  } else {
    topNav.classList.remove('sticky');
    // console.log('NOT INTERSECTING');
  }
};

const stickyNavObserver = new IntersectionObserver(stickyNavFunc, {
  root: topNav,
  rootMargin: '0px',
  threshold: [0, 0.2],
});

stickyNavObserver.observe(heroParent);

// Revealing elements on scroll

const allReveals = document.querySelectorAll('.reveal');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');

  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.1,
});

allReveals.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Full-screen nav menu for small screens

// const smallNavBtn = document.querySelector('.small__nav');
const smallNavBackground = document.querySelector('.navigation__background');
const smallNavList = document.querySelector('.navigation__list');
const navContainer = document.querySelector('.navigation__nav');

// smallNavBtn.addEventListener('click', (e) => {
//   smallNavBackground.classList.toggle('bg-effect');
//   navContainer.classList.toggle('nav-active_ul');
// });

// Listen for click event on the burger menu icon
// toggle bg-effect class on the background area
// Transform the ul up -8rem
// Turn the burger icon into a times icon (rotate effect)

// Re-building mobile nav functionality after correcting html structure

const mobileNavColumnBtn = document.querySelectorAll(
  '.navigation__mobile__column__btn'
);

const mobileNavBackground = document.querySelector(
  '.navigation__mobile__menu__content'
);

// Functions

// Show the hidden columns when user clicks chevron
const showMobileNavColumns = function (e) {
  if (e.target.classList.contains('chev')) {
    const column = e.currentTarget
      .closest('.navigation__mobile__menu')
      .querySelectorAll('.navigation__mobile__menu__children__col');
    const columnParent = e.currentTarget.nextElementSibling;
    console.log(columnParent);
    console.log('SHOW COLUMNS BUTTON');
    column.forEach((col) => {
      col.classList.toggle('show-column');
    });

    columnParent.classList.toggle('is-showing');
  }
};

// Listeners
mobileNavColumnBtn.forEach((btn) => {
  btn.addEventListener('click', showMobileNavColumns);
}, true);

const burger = document.getElementById('burger');
const times = document.getElementById('times');

// Bring in the mobile navigation full-screen menu in
const mobileNavBtn = document.querySelectorAll('.navigation__mobile__toggle');
mobileNavBtn.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    mobileNavBackground.classList.toggle('bg-effect');

    // Hide burger, show x
    if (
      e.target.id === 'burger' &&
      times.classList.contains('not_active_mobile')
    ) {
      e.target.classList.toggle('not_active_mobile');
      times.classList.toggle('not_active_mobile');
    }

    // Hide x, show burger
    if (
      e.target.id === 'times' &&
      burger.classList.contains('not_active_mobile')
    ) {
      e.target.classList.toggle('not_active_mobile');
      burger.classList.toggle('not_active_mobile');
    }
  });
});

// Add black background to topNav when page scrolled

// document.addEventListener('scroll', toggleBlackNav);
// function toggleBlackNav() {
//   if (window.pageYOffset > 10) {
//     topNav.classList.add('sticky');
//   } else {
//     topNav.classList.remove('sticky');
//   }
// }

// Show hidden columns in footer menu at tab-med viewport size
const showFooterMobileNavCol = document.querySelectorAll(
  '.footer__nav__list__heading--light'
);

const footerNavColumns = document.querySelectorAll('.footer__nav__list');
// console.log(footerNavColumns);

footerNavColumns.forEach((col) => col.classList.add('hide-column'));

showFooterMobileNavCol.forEach((heading) => {
  heading.addEventListener('click', showColumns);
});

function showColumns(e) {
  const column = e.target.nextElementSibling;
  console.log(column);
  column.classList.toggle('hide-column');
  // column.closest('.footer__nav__list__box').toggle('show-footer-column');
}

// Show burger icon when full screen mobile nav closed; show x icon when full screen mobile nav open

// Select the icons
function newFeature() {
  console.log('WELCOME TO THE APP!');
}
