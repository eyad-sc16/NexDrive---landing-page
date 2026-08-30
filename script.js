'use strict'

////////////////////// DOM data ///////////////
const logos = document.querySelectorAll('.top-nav__logo')
const nav = document.querySelector('.top-nav');
const burgerMenueBtn = nav.querySelector('.top-nav__hamburger')
const generalMobileMenuNav = document.querySelector('.mobile-menu')
const innerMobileMenueNav = generalMobileMenuNav.querySelector('.mobile-menu__nav')
const mobileMenuCloseBtn = document.querySelector('.mobile-menu__close')
const section1 = document.querySelector('.stats-bar')
const trustBar = document.querySelector('.trust-bar')

///////////////////// funcionality /////////////////
// Makes all the links on the mobile menue with scroll behavior auto
// funcion generate random number between tow numbers

const randomNum = function (Max, min) {
  return Math.floor(Math.random() * (Max - min + 1) + min)
}

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

// handling theme changig

const bodyThemeFn = function () {
  //////// Selecting elements ////////
  const themeTogle = document.querySelector('.theme-toggle')
  const themelightIcon = document.querySelector('.theme-toggle__icon--light')
  const themeDarkIcon = document.querySelector('.theme-toggle__icon--dark')

  // events Listeners
  themeTogle.addEventListener('click', function () {
    document.body.classList.toggle('light__theme')
    themeDarkIcon.classList.toggle('icon__hidden')
    themelightIcon.classList.toggle('icon__hidden')
  })
}
bodyThemeFn()


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


// handling nav links mouseover 

const hovorringEffects = function () {
  const topNavMunue = nav.querySelector('.top-nav__menu')
  const mobileMenuNav = document.querySelector('.mobile-menu__nav')
  const targetSibilings = nav.querySelectorAll('.top-nav__link')
  const mobileMenueLinks = document.querySelectorAll('.mobile-menu__link')
  console.log(mobileMenueLinks);


  const navEffectFn = function (e, sibilings, className) {
    const hoverd = e.target
    if (hoverd.classList.contains(className))

      sibilings.forEach(link => {
        if (link !== hoverd) {
          link.style.color = 'var(--color-primary)'
        }
      })
  }
  //nav links
  topNavMunue.addEventListener('mouseover', function (e) {
    navEffectFn(e, targetSibilings, 'top-nav__link')
  })

  topNavMunue.addEventListener('mouseout', function () {
    targetSibilings.forEach(link => {
      link.style.color = '#969696'
    })
  })

  // mobile links 
  mobileMenuNav.addEventListener('mouseover', function (e) {
    navEffectFn(e, mobileMenueLinks, 'mobile-menu__link')
  })

  mobileMenuNav.addEventListener('mouseout', function () {
    mobileMenueLinks.forEach(link => {
      link.style.color = 'var(--color-ink)'
    })
  })
}

hovorringEffects()
/// Slider

const slider = function () {
  // Data Selecting
  const sliderSection = document.querySelector('.slider-section  .container')
  const sliders = document.querySelectorAll('.slide')
  const rightBtn = document.querySelector('.slider__arrow--next')
  const leftBtn = document.querySelector('.slider__arrow--prev')
  const dots = document.querySelector('.slider__dots')
  let currentSlide = 0
  const maxSlider = sliders.length

  // Functions
  const creatDots = function () {

    sliders.forEach((_, i) => {
      const html = `<botton class="slider__dot" data-slide="${i}"> </button>`
      dots.insertAdjacentHTML('beforeend', html)
    })
  }

  const activeDot = function (slide) {
    document.querySelectorAll('.slider__dot').forEach(dot => dot.classList.remove('is-active'))
    document.querySelector(`.slider__dot[data-slide="${slide}"]`).classList.add('is-active')
  }

  const goToSlide = function (slide) {
    sliders.forEach((s, i) => s.style.transform = `translatex(${(i - slide) * 100}%)`)
  }



  const toNextSlide = function () {
    if (currentSlide === maxSlider - 1) {
      currentSlide = 0
    } else {
      currentSlide++
    }
    goToSlide(currentSlide)
    activeDot(currentSlide)
  }

  const toPrevSlide = function () {
    if (currentSlide === 0) {
      currentSlide = maxSlider - 1
    } else {
      currentSlide--
    }
    goToSlide(currentSlide)
    activeDot(currentSlide)
  }

  const init = function (slide) {
    creatDots()
    activeDot(slide)
    goToSlide(slide)
  }
  init(currentSlide)

  // event listeners
  dots.addEventListener('click', function (e) {
    e.preventDefault()
    currentSlide = +e.target.dataset.slide
    if (e.target.classList.contains('slider__dot')) {
      goToSlide(currentSlide)
      activeDot(currentSlide)
    }
    // console.log('DOT');

  })
  rightBtn.addEventListener('click', function () {
    toNextSlide()
    goToSlide(currentSlide)
  })

  leftBtn.addEventListener('click', function () {
    toPrevSlide()
  })


  const keyEvents = function (entries, observer) {
    const [entry] = entries

    if (!entry.isIntersecting) return

    document.addEventListener('keydown', function (e) {
      e.key === 'ArrowRight' && toNextSlide()
      e.key === 'ArrowLeft' && toPrevSlide()
    })
    observer.unobserve(entry.target)
  }
  new IntersectionObserver(keyEvents, { root: null, threshold: 0 }).observe(sliderSection)
}


// Taps
const taps = function () {
  const tabsPanel = document.querySelectorAll('.tabs__panel')
  const tapsList = document.querySelector('.tabs__list')
  const allTabsBtns = tapsList.querySelectorAll('.tabs__tab')

  const setBtnActive = function (active) {
    allTabsBtns.forEach(btn => btn.classList.remove('is-active'))
    active.classList.add('is-active')
  }



  tapsList.addEventListener('click', function (e) {
    e.preventDefault()
    const targeDataAttributes = e.target.dataset.tabTarget

    tabsPanel.forEach(tap => {
      if (tap.classList.contains('is-active'))
        tap.classList.remove('is-active')
    })


    if (e.target.classList.contains('tabs__tab')) {
      setBtnActive(e.target)

      document.querySelector(`.tabs__panel[data-tab-panel="${targeDataAttributes}"]`).classList.add('is-active')
    }
  })
}
slider()
taps()

// Scroll events

// functions 

const randomEffect = function () {
  const allRandomElements = document.querySelectorAll('.random__numbers')

  const randomEffectsNumbers = function (num) {
    let counter = num

    const allOriginalContent = []
    allRandomElements.forEach(ele => allOriginalContent.push(ele.textContent))
    const timerInterval = setInterval(() => {
      counter--
      allRandomElements.forEach(ele => {
        ele.style.color = 'var(--color-white-red)'
        if (counter <= 10) {
          ele.style.color = 'var(--color-original-red)'
        }
        ele.textContent = randomNum(50, 0)
      })
      if (counter === 0) {
        allRandomElements.forEach((ele, i) => {
          ele.textContent = allOriginalContent[i]
          ele.style.color = 'var(--color-primary)'
        })
        clearInterval(timerInterval)

      }
      // console.log('hi');
    }, 40)
  }
  // random effects 

  const randomCallBack = function (entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return

      randomEffectsNumbers(30)

      observer.unobserve(entry.target)
    })
  }

  const randomObserver = new IntersectionObserver(randomCallBack, { root: null, threshold: 0.35 })
  allRandomElements.forEach(ele => randomObserver.observe(ele))

}
randomEffect()


// scroll effects 
const scrollEvents = function () {
  const allEffectsElements = document.querySelectorAll('.general__effects--elements')

  // functions

  const fadeInTime = function (classType, ele, className, time) {
    setTimeout(() => {
      ele.classList[classType](className)
    }, time)
  }

  const lazyImages = document.querySelectorAll('.lazy-images')
  const lazyLoadings = function (entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return

      if (entry.target.dataset.originalImage) {
        entry.target.src = entry.target.dataset.originalImage
      }

      entry.target.addEventListener('load', function () {
        entry.target.classList.remove('blur--effects')
      })
      observer.unobserve(entry.target)
    })
  }
  const imgObserver = new IntersectionObserver(lazyLoadings, { root: null, threshold: 0, rootMargin: '250px' })
  lazyImages.forEach(img => imgObserver.observe(img))




  // functionality
  const srollEffects = function (entries, observer) {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return

      const targeted = entry.target
      if (targeted.classList.contains('container--effect--element')) {
        targeted.classList.remove('container--fade-up')
      }

      if (targeted.classList.contains('blur--effects__element')) {
        fadeInTime('remove', targeted, 'blur--effects', 350)
      }


      if (targeted.classList.contains('red--color--effects__elements')) {
        fadeInTime('add', targeted, 'red__color--effect', 500)
      }

      if (targeted.classList.contains('border--lighting__elements')) {
        fadeInTime('remove', targeted, 'border-lighting', 300)
        fadeInTime('add', targeted, 'border-to-red', 600)
      }
      observer.unobserve(targeted)
    })
  }

  const observer = new IntersectionObserver(srollEffects, { root: null, threshold: 0.25 })
  allEffectsElements.forEach(ele => {
    observer.observe(ele)

    // containers effects elements
    if (ele.classList.contains('container--effect--element')) {
      ele.classList.add('container--fade-up')
    }

    // blur effects elements
    if (ele.classList.contains('blur--effects__element')) {
      ele.classList.add('blur--effects')
    }

    if (ele.classList.contains('border--lighting__elements')) {
      ele.classList.add('border-lighting')
    }
  })

}
scrollEvents()

// lazy loading on images
const lazyImages = document.querySelectorAll('.lazy-images')
const lazyLoadings = function (entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return


    entry.target.src = entry.target.dataset.originalImage

    entry.target.addEventListener('load', function () {
      entry.target.classList.remove('blur--effects')
    })
    observer.unobserve(entry.target)
  })
}
const imgObserver = new IntersectionObserver(lazyLoadings, { root: null, threshold: 0, rootMargin: '250px' })
lazyImages.forEach(img => imgObserver.observe(img))