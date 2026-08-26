'use strict'

////////////////////// DOM data ///////////////
const logos = document.querySelectorAll('.top-nav__logo')
const nav = document.querySelector('.top-nav');
const burgerLine1 = nav.querySelector('.line-1')
const burgerLine2 = nav.querySelector('.line-2')
const burgerMenueBtn = nav.querySelector('.top-nav__hamburger')
const generalMobileMenuNav = document.querySelector('.mobile-menu')
const innerMobileMenueNav = generalMobileMenuNav.querySelector('.mobile-menu__nav')
const mobileMenuCloseBtn = document.querySelector('.mobile-menu__close')
const section1 = document.querySelector('.stats-bar')
///////////////////// funcionality /////////////////
// Makes all the links on the mobile menue with scroll behavior auto
innerMobileMenueNav.querySelectorAll('a').forEach(link => {
  link.style.scrollBehavior = 'auto'
})
//implementing sticky nav bar
const navObserver = new IntersectionObserver(function (entries) {
  const [entry] = entries
  if (generalMobileMenuNav.classList.contains('is-open')) {
    nav.classList.add('sticky')
  } else {
    if (entry.isIntersecting) {
      nav.classList.remove('sticky')

    } else {
      nav.classList.add('sticky')
    }
  }
}, { root: null, threshold: 0, rootMargin: `-${nav.getBoundingClientRect().height}px` }).observe(section1);


// handling burger munue
const closeFn = function () {
  if (generalMobileMenuNav.classList.contains('is-open') || burgerMenueBtn.classList.contains('lines--rotate')) {
    generalMobileMenuNav.classList.remove('is-open')
    burgerMenueBtn.classList.remove('lines--rotate')
  }
};

burgerMenueBtn.addEventListener('click', function (e) {
  e.preventDefault()
  generalMobileMenuNav.classList.toggle('is-open')
  e.currentTarget.classList.toggle('lines--rotate')

});

mobileMenuCloseBtn.addEventListener('click', closeFn)
// close with escape btn
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && generalMobileMenuNav.classList.contains('is-open')) {
    closeFn()
  };
});

// handling mobeleMenue smooth scroll and close the menue 
innerMobileMenueNav.addEventListener('click', function (e) {
  e.preventDefault()
  const link = e.target

  if (link.classList.contains('__link')) {
    document.querySelector(link.getAttribute('href')).scrollIntoView({ behavior: 'smooth' })
    closeFn()
  };
});

// hanling logo clikevent 
logos.forEach(logo => logo.addEventListener('click', function (e) {
  closeFn()
}))
