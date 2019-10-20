class Application {
  constructor() {
    this.body = document.body
    this.initKeyboardEvents()

    this.specialKeycodes = ['Backspace', 'Space']
  }

  initKeyboardEvents() {
    const keyRegex = RegExp('^(Digit[0-9]{1})|(Key[A-Z]{1})$')

    this.body.addEventListener('keydown', event => {
      const { code, key } = event

      if (keyRegex.test(code)) {
        return this.applyKey(key)
      }

      if (code === 'Space') {
        return this.applySpace()
      }

      if (code === 'Backspace') {
        return this.applyBackspace()
      }

      console.log(`${key} is invalid`)
    })
  }

  applyBackspace() {
    console.log('Applying Backspace')
  }

  applyKey(key) {
    console.log('Applying Key:', key)
  }

  applySpace() {
    console.log('Applying Space')
  }
}

export default Application
