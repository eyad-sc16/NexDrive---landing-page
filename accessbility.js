'use strict'

// Accessability class
class Accessability {
  static #body = document.body
  static #inputs = []
  static #allTextElement = [...document.querySelectorAll('a'), ...document.querySelectorAll('li'), ...document.querySelectorAll('span'), ...document.querySelectorAll('p')];

  #bodyHeight = window.getComputedStyle(document.body).lineHeight
  #eventElement
  #HTMLelment = document.documentElement;

  constructor(eventElement) {
    this.#eventElement = eventElement;
  }

  get bodyElement() {
    return Accessability.#body;
  }

  get eventElement() {
    return this.#eventElement
  }

  get inputs() {
    return Accessability.#inputs
  }

  get isChecked() {
    return this.#eventElement.checked ? true : false
  }

  pushInput() {
    Accessability.#inputs.push(this.#eventElement)
  }

  // LocalStorage Methods inside Class
  #setLocalStorage(key, value) {
    localStorage.setItem(key, value);
  }

  #getLocalStorage(key) {
    return localStorage.getItem(key);
  }

  #removeLocalStorage(key) {
    localStorage.removeItem(key);
  }

  #clearLocalStorage() {
    localStorage.clear();
  }

  // Load state method called from class
  loadSavedState(callback) {
    const savedVal = this.#getLocalStorage(this.#eventElement.id);
    if (!savedVal) return;

    if (this.#eventElement.type === 'checkbox') {
      if (savedVal === 'true') {
        this.#eventElement.checked = true;
        if (callback) callback();
      }
    } else if (this.#eventElement.type === 'range') {
      this.#eventElement.value = savedVal;
      if (callback) callback();
    }
  }

  setClass(className, targetingElement = this.#HTMLelment) {
    if (this.isChecked || !targetingElement.classList.contains(className)) {
      targetingElement.classList.add(className)
      this.#setLocalStorage(this.#eventElement.id, true)
    } else {
      targetingElement.classList.remove(className)
      this.#removeLocalStorage(this.#eventElement.id)
    }
  }

  changeStyle(styleName, unChangedClass = null, eleCollection = Accessability.#allTextElement) {
    eleCollection.forEach(ele => {
      if (ele.classList.contains(unChangedClass)) return
      ele.style[styleName] = `${this.#eventElement.value}px`
    })
    this.#setLocalStorage(this.#eventElement.id, this.#eventElement.value)
  }

  accessOpen(className, targetingElement = this.eventElement) {
    targetingElement.classList.toggle(className)
    const isHidden = targetingElement.classList.contains(className)
    this.#setLocalStorage('accessPanel_hidden', isHidden)
  }

  closePanel(className, targetingElement = this.eventElement) {
    targetingElement.classList.add(className)
    this.#setLocalStorage('accessPanel_hidden', true)
  }

  loadPanelState(panelElement, className) {
    const isHidden = this.#getLocalStorage('accessPanel_hidden')
    if (isHidden === 'false') {
      panelElement.classList.remove(className)
    } else {
      panelElement.classList.add(className)
    }
  }

  resetAll(...classes) {
    classes.forEach(cl => this.bodyElement.classList.remove(cl));
    this.inputs.forEach(input => {
      if (input.type === 'checkbox') {
        input.checked = false;
        this.#removeLocalStorage(input.id);
      }
      if (input.type === 'range') {
        input.value = input.getAttribute('min') || 16;
        this.#removeLocalStorage(input.id);
      }
    });

    Accessability.#allTextElement.forEach(ele => {
      ele.style.fontSize = '';
      ele.style.lineHeight = '';
    });
    this.#clearLocalStorage();
    this.#setLocalStorage('accessPanel_hidden', true);
  }
}

// Accessibility Checkboxes Functionality
const checkboxFuncionality = function () {
  const init = function () {
    fontSiseFunctionality()
    lineHeightFunctionality()
    stopAnimationFuncionality()
    invertColorFuncionality()
    grayscaleFunctionality()
    readbleFontFuncionality()
    highlightLinkFunctionality()
    biggerCursorFuncionality()
  }

  // Range inputs
  const fontSiseFunctionality = function () {
    const fontSizeInput = document.getElementById('font-size-range')
    const fontSiseObj = new Accessability(fontSizeInput)
    fontSiseObj.pushInput()

    fontSiseObj.loadSavedState(() => {
      fontSiseObj.changeStyle('fontSize', 'random__numbers')
    })

    fontSiseObj.eventElement.addEventListener('input', function () {
      fontSiseObj.changeStyle('fontSize', 'random__numbers')
    })
  }

  const lineHeightFunctionality = function () {
    const lineHeightInput = document.getElementById('line-height-range')
    const lineHeightObj = new Accessability(lineHeightInput)
    lineHeightObj.pushInput()
    const allP = document.querySelectorAll('P')
    allP.forEach(ele => {
      let eleLineHight = Number.parseFloat(window.getComputedStyle(ele).lineHeight);
      lineHeightInput.setAttribute('min', eleLineHight);
      lineHeightInput.setAttribute('max', eleLineHight * 2);
    })

    lineHeightObj.loadSavedState(() => {
      lineHeightObj.changeStyle('lineHeight', 'accessibility-body', allP)
    })

    lineHeightObj.eventElement.addEventListener('input', function () {
      lineHeightObj.changeStyle('lineHeight', 'accessibility-body', allP)
    })
  }

  // Checkbox inputs
  const stopAnimationFuncionality = function () {
    const stopAnimationInput = document.getElementById('stop-animations-checkbox')
    const stopAnimationObj = new Accessability(stopAnimationInput);
    stopAnimationObj.pushInput()

    stopAnimationObj.loadSavedState(() => {
      stopAnimationObj.setClass('stop-animations', stopAnimationObj.bodyElement)
    })

    stopAnimationObj.eventElement.addEventListener('change', function () {
      stopAnimationObj.setClass('stop-animations', stopAnimationObj.bodyElement)
    })
  }

  const invertColorFuncionality = function () {
    const invertColorInput = document.getElementById('invert-colors-checkbox');
    const invertColorObj = new Accessability(invertColorInput)
    invertColorObj.pushInput()

    invertColorObj.loadSavedState(() => {
      invertColorObj.setClass('light__theme', invertColorObj.bodyElement)
    })

    invertColorObj.eventElement.addEventListener('change', function () {
      invertColorObj.setClass('light__theme', invertColorObj.bodyElement)
    })
  }

  const grayscaleFunctionality = function () {
    const grayScaleInput = document.getElementById('grayscale-checkbox');
    const grayscaleObj = new Accessability(grayScaleInput)
    grayscaleObj.pushInput()

    grayscaleObj.loadSavedState(() => {
      grayscaleObj.setClass('grayscale', grayscaleObj.bodyElement)
    })

    grayscaleObj.eventElement.addEventListener('change', function () {
      grayscaleObj.setClass('grayscale', grayscaleObj.bodyElement)
    })
  }

  const readbleFontFuncionality = function () {
    const readbleFontInput = document.getElementById('dyslexia-font-checkbox')
    const readbleFontObj = new Accessability(readbleFontInput);
    readbleFontObj.pushInput()

    readbleFontObj.loadSavedState(() => {
      readbleFontObj.setClass('readble-font', readbleFontObj.bodyElement)
    })

    readbleFontObj.eventElement.addEventListener('change', function () {
      readbleFontObj.setClass('readble-font', readbleFontObj.bodyElement)
    })
  }

  const highlightLinkFunctionality = function () {
    const highlightLinkInput = document.getElementById('highlight-links-checkbox')
    const highlightLinkObj = new Accessability(highlightLinkInput)
    highlightLinkObj.pushInput()

    highlightLinkObj.loadSavedState(() => {
      highlightLinkObj.setClass('hightlight-links', highlightLinkObj.bodyElement)
    })

    highlightLinkObj.eventElement.addEventListener('change', function () {
      highlightLinkObj.setClass('hightlight-links', highlightLinkObj.bodyElement)
    })
  }

  const biggerCursorFuncionality = function () {
    const cursorInput = document.getElementById('cursor-size-checkbox');
    const cursorObj = new Accessability(cursorInput);

    cursorObj.loadSavedState(() => {
      cursorObj.setClass('bigger-mouse', cursorObj.bodyElement)
    })

    cursorObj.eventElement.addEventListener('change', function () {
      cursorObj.setClass('bigger-mouse', cursorObj.bodyElement)
      cursorObj.pushInput()
    })
  }

  init()
}
checkboxFuncionality()

// Buttons & Panel handling
const btnHandling = function () {
  const init = function () {
    accessabilityBtnFunctionality()
    accessPanelBtnFuncionality()
  }

  const accessPanel = document.querySelector('.accessibility-panel')

  const accessPanelBtnFuncionality = function () {
    const accessPanelObj = new Accessability(accessPanel)

    accessPanelObj.loadPanelState(accessPanel, 'hidden')

    accessPanel.addEventListener('click', function (e) {
      const target = e.target
      if (target.classList.contains('accessibility-close')) {
        accessPanelObj.closePanel('hidden', accessPanel)
      }
      if (target.classList.contains('accessibility-reset')) {
        accessPanelObj.resetAll('light__theme', 'grayscale', 'stop-animations', 'hightlight-links', 'readble-font')
      }
    })
  }

  const accessabilityBtnFunctionality = function () {
    const accessabilityBtn = document.querySelector('.accessibility-toggle');
    const accessabilityBtnObj = new Accessability(accessabilityBtn)

    accessabilityBtnObj.eventElement.addEventListener('click', function () {
      accessabilityBtnObj.accessOpen('hidden', accessPanel)
    })
  }

  init()
}
btnHandling()
