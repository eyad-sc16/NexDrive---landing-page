'use strict'

class Accessability {
  // #inputValue;
  static allP = document.querySelectorAll('p');

  #inputElement
  #HTMLelment = document.documentElement;
  constructor(inputElement) {
    this.#inputElement = inputElement;
  }

  get #isChecked() {
    if (this.#inputElement.checked)
      return true;
    return false
  }

  get inputElement() {
    return this.#inputElement
  }

  // public interface methods
  setClass(className) {
    if (this.#isChecked) {
      this.#HTMLelment.classList.add(className)
      // console.log('Checkd');

    } else {
      this.#HTMLelment.classList.remove(className)
    }
  }

  changeStyle(styleName) {
    allP.forEach(ele => ele.style[styleName] = `${this.#inputElement.value}px`)
  }

}

// selecting elements
const lineHeightInput = document.getElementById('line-height-range')
const stopAnimationInput = document.getElementById('stop-animations-checkbox')
const invertColorInput = document.getElementById('invert-colors-checkbox');
const grayScaleInput = document.getElementById('grayscale-checkbox');
const dyslexiaFontInput = document.getElementById('dyslexia-font-checkbox')
const highlightLinkInput = document.getElementById('highlight-links-checkbox')
const cursorSizeInput = document.getElementById('cursor-size-checkbox')
const accessabilityResetBtn = document.querySelector('.accessibility-reset')
////////////////////////////////////////////////////////////////////////////

//  object for range inputs 

// fontSiseObj.inputElement.addEventListener('change', function () {
//   console.log('hid');
// })

const fontSiseFunctionality = function () {
  const fontSizeInput = document.getElementById('font-size-range')
  const fontSiseObj = new Accessability(fontSizeInput)

  console.log(fontSiseObj);

}

fontSiseFunctionality()